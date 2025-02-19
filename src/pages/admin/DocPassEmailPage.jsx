import { useState, useEffect } from "react";
import TableLayout from "../../components/admin/TableLayout";
import DocPassTable from "../../components/admin/DocPassTable";
import styled from "styled-components";
import axios from "axios";

const DocPassEmailPage = () => {
  const [activePage, setActivePage] = useState(1);
  const [applicants, setApplicants] = useState([]); // 받아올 서류 합격자 데이터
  const [totalItemsCount, setTotalItemsCount] = useState(0); // 전체 데이터 개수

  const [isSent, setIsSent] = useState(false); // 이메일 전송 여부

  const indexOfLastPost = activePage * 7;
  const indexOfFirstPost = indexOfLastPost - 7;

  const currentApplicants = applicants.slice(indexOfFirstPost, indexOfLastPost);

  const apiUrl = process.env.REACT_APP_API_URL;

  // 합격자 조회 api 호출
  const fetchApplicants = async () => {
    try {
      const response = await axios.get(`${apiUrl}/admin/docPassResult`);
      if (response.data.isSuccess) {
        setApplicants(response.data.result.resultApplicants); // 서류 합격자 데이터
        setTotalItemsCount(response.data.result.resultApplicants.length);

        // 전체 지원자의 이메일 전송 여부가 true인지 확인
        const allEmailSent = response.data.result.resultApplicants.every(
          (applicant) => applicant.docEmailSent
        );
        setIsSent(allEmailSent);
      }
    } catch (error) {
      console.error("지원자 조회 에러", error);
      alert("지원자 조회 중 오류가 발생했습니다. 다시 시도해주세요.");
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
        `${apiUrl}/admin/docPassResult/sendPassEmail`
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
    title: "서류 합격 이메일",
    subtitle: "서류 합격자 확인 및 이메일 전송",
    actionButton: (
      <SendButton onClick={handleSendEmails} disabled={isSent}>
        {isSent ? "전송 완료" : "서류 합격 메일 보내기"}
      </SendButton>
    ),
    headers: ["이름", "이메일", "전화번호", "파트", "서류합/불", "상태"],
    renderRow: (item) => <DocPassTable items={[item]} />, // 개별 아이템 단위로 렌더링

    currentItems: currentApplicants.map((applicant) => ({
      applicantId: applicant.applicantId,
      name: applicant.name,
      email: applicant.email,
      phone: applicant.phone,
      part: applicant.part,
      docPassStatus: applicant.docPassStatus,
      docEmailSent: applicant.docEmailSent,
    })),

    paginationProps: {
      activePage,
      totalItemsCount,
      handlePageChange,
    },
  };

  return <TableLayout {...tableProps} />;
};

export default DocPassEmailPage;

const SendButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10.938rem;
  height: 2.813rem;
  padding: 0.063rem 1.375rem;
  background: ${(props) => (props.disabled ? "#cccccc" : "#60c1c3")};
  border-radius: 0.313rem;
  border: none;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  margin-left: auto;
  margin-bottom: 1.25rem;
  color: #ffffff;

  font-family: "Pretendard Variable";
  font-size: 0.938rem;
  font-style: normal;
  font-weight: 599;
  line-height: 145%;
  letter-spacing: 0.009rem;
`;
