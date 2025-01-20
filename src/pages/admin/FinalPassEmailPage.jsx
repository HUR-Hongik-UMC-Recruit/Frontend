import { useState, useEffect } from "react";
import TableLayout from "../../components/admin/TableLayout";
import FinalPassTable from "../../components/admin/FinalPassTable";
import styled from "styled-components";
import axios from "axios";

const FinalPassEmailPage = () => {
  const [activePage, setActivePage] = useState(1);
  const [applicants, setApplicants] = useState([]); // 받아올 최종종 합격자 데이터
  const [totalItemsCount, setTotalItemsCount] = useState(0); // 전체 데이터 개수

  const indexOfLastPost = activePage * 7;
  const indexOfFirstPost = indexOfLastPost - 7;
  const currentApplicants = applicants.slice(indexOfFirstPost, indexOfLastPost);

  const apiUrl = process.env.REACT_APP_API_URL;

  // 합격자 조회 api 호출
  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await axios.get(`${apiUrl}/finalPassResult`);
        if (response.data.isSuccess) {
          setApplicants(response.data.result.resultApplicants);
          setTotalItemsCount(response.data.result.resultApplicants.length); // 받아온 전체 데이터 개수
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
    title: "최종 합격 이메일",
    subtitle: "최종 합격자 확인 및 이메일 전송",
    actionButton: <SendButton>최종 합격 메일 보내기</SendButton>,
    headers: ["이름", "이메일", "전화번호", "파트", "최종합/불", "상태"],
    renderRow: (item) => <FinalPassTable items={[item]} />, // 개별 아이템 단위로 렌더링

    currentItems: currentApplicants.map((applicant) => ({
      name: applicant.name,
      email: applicant.email,
      phone: applicant.phone,
      part: applicant.phone,
      part: applicant.part,
      docPassStatus: applicant.docPassStatus,
      finalPassStatus: applicant.finalPassStatus,
    })),

    paginationProps: {
      activePage,
      totalItemsCount,
      handlePageChange,
    },
  };

  return <TableLayout {...tableProps} />;
};

export default FinalPassEmailPage;

const SendButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10.938rem;
  height: 2.813rem;
  padding: 0.063rem 1.375rem;
  background: #60c1c3;
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
