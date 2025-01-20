import { useState, useEffect } from "react";
import TableLayout from "../../components/admin/TableLayout";
import EmailTable from "../../components/admin/EmailTable";
import styled from "styled-components";
import axios from "axios";

const RecruitAlertEmailPage = () => {
  const [activePage, setActivePage] = useState(1);
  const [applicants, setApplicants] = useState([]); // 받아올 서류 합격자 데이터
  const [totalItemsCount, setTotalItemsCount] = useState(0); // 전체 데이터 개수

  const indexOfLastPost = activePage * 7;
  const indexOfFirstPost = indexOfLastPost - 7;
  const currentApplicants = applicants.slice(indexOfFirstPost, indexOfLastPost);

  const apiUrl = process.env.REACT_APP_API_URL;

  // 모집알림 이메일 등록한 지원자자 조회 api 호출
  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await axios.get(`${apiUrl}/notice`);
        if (response.data.isSuccess) {
          setApplicants(response.data.result);
          setTotalItemsCount(response.data.result.length); // 받아온 전체 데이터 개수
        }
      } catch (error) {
        console.error("지원자 조회 에러", error);
      }
    };

    fetchApplicants();
  }, []);

  const handlePageChange = (pageNumber) => {
    // 페이지 변경
    setActivePage(pageNumber);
  };

  const tableProps = {
    title: "모집 알림 이메일",
    subtitle: "모집 알림 이메일 확인 및 전송",
    actionButton: <SendButton>메일 보내기</SendButton>,
    headers: ["", "이메일", "", "", "", "상태"],
    renderRow: (item) => <EmailTable items={[item]} />, // 개별 아이템 단위로 렌더링

    currentItems: currentApplicants.map((applicant) => ({
      emailAddress: applicant.emailAddress,
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
  background: #5fbda1;
  border-radius: 0.313rem;
  border: none;
  cursor: pointer;
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
