import { useState, useEffect } from "react";
import TableLayoutForApplicants from "../../components/admin/TableLayoutForApplicants";
import AllApplicantsTable from "../../components/admin/AllApplicantsTable";
import axios from "axios";

const AllApplicantsPage = () => {
  const [activePage, setActivePage] = useState(1);
  const [applicants, setApplicants] = useState([]);
  const [totalItemsCount, setTotalItemsCount] = useState(0);

  const indexOfLastPost = activePage * 7;
  const indexOfFirstPost = indexOfLastPost - 7;
  const currentApplicants = applicants.slice(indexOfFirstPost, indexOfLastPost);

  const apiUrl = process.env.REACT_APP_API_URL;

  const fetchApplicants = async (filters = {}) => {
    try {
      const response = await axios.get(`${apiUrl}/admin/applicant`, {
        params: {
          part: filters.part !== "파트별" ? filters.part : undefined,
          docPassStatus:
            filters.docPassStatus === "합격"
              ? true
              : filters.docPassStatus === "불합격"
              ? false
              : undefined,
          finalPassStatus:
            filters.finalPassStatus === "합격"
              ? true
              : filters.finalPassStatus === "불합격"
              ? false
              : undefined,
          keyword: filters.keyword || undefined,
        },
      });

      if (response.data.isSuccess) {
        console.log(response.data.result);
        setApplicants(response.data.result);
        setTotalItemsCount(response.data.result.length);
      }
    } catch (error) {
      console.error("지원자 조회 에러", error);
      alert(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

  const handleFilterChange = (filterValues) => {
    // 필터 검색을 처리할 함수
    fetchApplicants(filterValues);
  };

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const tableProps = {
    title: "지원현황",
    subtitle: "UMC 전체 지원현황",
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
    filterSearchOne: handleFilterChange, // handleFilterChange 함수를 전달
  };

  return (
    <>
      <TableLayoutForApplicants {...tableProps} />
    </>
  );
};

export default AllApplicantsPage;
