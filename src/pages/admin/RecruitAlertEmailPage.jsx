import { useState, useEffect } from "react";
import TableLayout from "../../components/admin/TableLayout";
import EmailTable from "../../components/admin/EmailTable";
import styled from "styled-components";
import axios from "axios";

const RecruitAlertEmailPage = () => {
  const [activePage, setActivePage] = useState(1);
  const [applicants, setApplicants] = useState([]); // 받아올 서류 합격자 데이터
  const [totalItemsCount, setTotalItemsCount] = useState(0); // 전체 데이터 개수
  const [isSent, setIsSent] = useState(false); // 이메일 발송 상태

  const indexOfLastPost = activePage * 7;
  const indexOfFirstPost = indexOfLastPost - 7;
  const currentApplicants = applicants.slice(indexOfFirstPost, indexOfLastPost);

  const apiUrl = process.env.REACT_APP_API_URL;

  // 모집알림 이메일 등록한 지원자 조회 api 호출

  const fetchApplicants = async () => {
    try {
      const response = await axios.get(`${apiUrl}/admin/notice`, {
        withCredentials: true,
      });
      if (response.data.isSuccess) {
        setApplicants(response.data.result);
        setTotalItemsCount(response.data.result.length); // 받아온 전체 데이터 개수

        // 모든 applicant가 completed true인 경우 isSent를 true로 설정
        const allCompleted = response.data.result.every(
          (applicant) => applicant.completed
        );
        setIsSent(allCompleted);
      }
    } catch (error) {
      console.error("지원자 조회 에러", error);

      if (error.response.data.code === "LOGIN4000") {
        window.location.replace("/404");
        return;
      }
    }
  };
  
  // 모집알림 이메일 등록한 지원자 조회 api 호출
  useEffect(() => {
    fetchApplicants();
  }, []);

  const handlePageChange = (pageNumber) => {
    // 페이지 변경
    setActivePage(pageNumber);
  };

  const handleSendEmails = async () => {
    try {
      const response = await axios.post(
        `${apiUrl}/admin/notice/send`,
        {}, // 빈 객체를 body로 전송
        {
          withCredentials: true,
        }
      );

      if (response.data.isSuccess) {
        alert("메일이 성공적으로 전송되었습니다.");
        setIsSent(true);
        setApplicants(
          applicants.map((applicant) => ({ ...applicant, completed: true }))
        ); // 전체 발송 성공하면 다 전송완료로 바뀜.. 개별은 X
        fetchApplicants(); // 새로고침
      }
    } catch (error) {
      console.error("메일 전송 에러", error);
      alert("메일 발송 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const tableProps = {
    title: "모집 알림 이메일",
    subtitle: "모집 알림 이메일 확인 및 전송",

    actionButton: (
      <SendButton onClick={handleSendEmails} disabled={isSent}>
        {isSent ? "전송 완료" : "메일 보내기"}
      </SendButton>
    ),

    headers: ["", "이메일", "", "", "", "상태"],
    renderRow: (item) => <EmailTable items={[item]} />, // 개별 아이템 단위로 렌더링

    currentItems: currentApplicants.map((applicant) => ({
      emailAddress: applicant.emailAddress,
      completed: applicant.completed || isSent, // isSent가 true면 completed도 true
    })),

    paginationProps: {
      activePage,
      totalItemsCount,
      handlePageChange,
    },
  };

  return <TableLayout {...tableProps} />;
};

export default RecruitAlertEmailPage;

const SendButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 7.5rem;
  height: 2.813rem;
  padding: 0.75rem 1.375rem;
  background: ${(props) => (props.disabled ? "#cccccc" : "#5fbda1")};
  border-radius: 0.313rem;
  border: none;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  margin-left: auto;
  margin-bottom: 1.25rem;
  color: #ffffff;

  font-family: "Pretendard Variable";
  font-size: 0.938rem;
  font-style: normal;
  font-weight: 600;
  line-height: 145%;
  letter-spacing: 0.009rem;
`;
