import { useState, useEffect } from "react";
import TableLayout from "../../components/admin/TableLayout";
import FinalFailTable from "../../components/admin/FinalFailTable";
import styled from "styled-components";
import axios from "axios";

const FinalFailEmailPage = () => {
  const [activePage, setActivePage] = useState(1);
  const [applicants, setApplicants] = useState([]); // 받아올 최종 불합격자자 데이터
  const [totalItemsCount, setTotalItemsCount] = useState(0); // 전체 데이터 개수

  const [isSent, setIsSent] = useState(false); // 이메일 전송 여부

  const indexOfLastPost = activePage * 7;
  const indexOfFirstPost = indexOfLastPost - 7;
  const currentApplicants = applicants.slice(indexOfFirstPost, indexOfLastPost);

  const apiUrl = process.env.REACT_APP_API_URL;

  // 합격자 조회 api 호출

  const fetchApplicants = async () => {
    try {
      const response = await axios.get(`${apiUrl}/finalFailResult`);
      if (response.data.isSuccess) {
        setApplicants(response.data.result.resultApplicants);
        setTotalItemsCount(response.data.result.resultApplicants.length); // 받아온 전체 데이터 개수

        // 전체 지원자의 이메일 전송 여부가 true인지 확인
        const allEmailSent = response.data.result.resultApplicants.every(
          (applicant) => applicant.finalEmailSent
        );
        setIsSent(allEmailSent);
      }
    } catch (error) {
      console.error("지원자 조회 에러", error);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

  const handlePageChange = (pageNumber) => {
    // 페이지 변경
    setActivePage(pageNumber);
  };

  // 이메일 전송 함수
  const handleSendEmails = async () => {
    try {
      const response = await axios.post(
        `${apiUrl}/finalFailResult/sendFailEmail`
      );

      if (response.data.isSuccess) {
        alert("메일이 성공적으로 전송되었습니다.");
        setIsSent(true);
        // setApplicants(
        //  applicants.map((applicant) => ({ ...applicant, docEmailSent: true }))
        // );
        fetchApplicants(); // 업데이트된 전송 완료 상태 가져오기
      }
    } catch (error) {
      console.error("메일 전송 에러", error);
      alert("메일 전송 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const tableProps = {
    title: "최종 불합격 이메일",
    subtitle: "최종 불합격자 확인 및 이메일 전송",
    actionButton: (
      <SendButton onClick={handleSendEmails} disabled={isSent}>
        {isSent ? "전송 완료" : "최종 불합격 메일 보내기"}
      </SendButton>
    ),
    headers: ["이름", "이메일", "전화번호", "파트", "최종합/불", "상태"],
    renderRow: (item) => <FinalFailTable items={[item]} />, // 개별 아이템 단위로 렌더링

    currentItems: currentApplicants.map((applicant) => ({
      applicantId: applicant.applicantId,
      name: applicant.name,
      email: applicant.email,
      phone: applicant.phone,
      part: applicant.part,
      finalPassStatus: applicant.finalPassStatus,
      finalEmailSent: applicant.finalEmailSent,
    })),

    paginationProps: {
      activePage,
      totalItemsCount,
      handlePageChange,
    },
  };

  return <TableLayout {...tableProps} />;
};

export default FinalFailEmailPage;

const SendButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10.938rem;
  height: 2.813rem;
  padding: 0.063rem 1rem;
  background: ${(props) => (props.disabled ? "#cccccc" : "#ff948a")};
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
