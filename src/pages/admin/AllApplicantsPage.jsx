import { useState, useEffect } from "react";
import TableLayoutForApplicants from "../../components/admin/TableLayoutForApplicants";
import AllApplicantsTable from "../../components/admin/AllApplicantsTable";
import styled from "styled-components";
import axios from "axios";

const AllApplicantsPage = () => {
  const [activePage, setActivePage] = useState(1);
  const [applicants, setApplicants] = useState([]);
  const [totalItemsCount, setTotalItemsCount] = useState(0);

  const indexOfLastPost = activePage * 7;
  const indexOfFirstPost = indexOfLastPost - 7;
  const currentApplicants = applicants.slice(indexOfFirstPost, indexOfLastPost);

  const apiUrl = process.env.REACT_APP_API_URL;

  const fetchApplicants = async () => {
    try {
      const response = await axios.get(`${apiUrl}/applicant`);
      if (response.data.isSuccess) {
        console.log(response.data.result);
        setApplicants(response.data.result);
        setTotalItemsCount(response.data.result.length);
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
    setActivePage(pageNumber);
  };

  const tableProps = {
    title: "지원현황",
    subtitle: "UMC 전체 지원현황",
    actionButton: <SearchButton>검색</SearchButton>,
    headers: [
      "이름",
      "이메일",
      "전화번호",
      "파트",
      "서류합불",
      "최종합불",
      "지원서",
    ],
    renderRow: (item) => <AllApplicantsTable items={[item]} />,
    currentItems: currentApplicants.map((applicant) => ({
      applicantId: applicant.applicantId,
      name: applicant.name,
      email: applicant.email,
      phone: applicant.phone,
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

  return <TableLayoutForApplicants {...tableProps} />;
};

const SearchButton = styled.button`
  padding: 0.5rem 1rem;
  background: #B1F4DD;
  color: #2B9176;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 0.75rem;

  width: 6.8125rem;
  height: 2.5rem;

  font-family: "Pretendard Variable";
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.269rem;

  &:hover {
    background: #4ca890;
  }
`;

export default AllApplicantsPage;
