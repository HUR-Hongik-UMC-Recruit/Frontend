import styled from "styled-components";
import axios from "axios";
import { useState } from "react";
import ToggleMenu from "./ToggleMenu";

const AllApplicantsTable = ({ items }) => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const [docPassStatus, setDocPassStatus] = useState({});
  const [finalPassStatus, setFinalPassStatus] = useState({});

  // 특정 지원자의 지원서 조회
  const handleViewApplication = async (applicantId) => {
    try {
      const response = await axios.get(`${apiUrl}/applicant/${applicantId}`);
      if (response.data.isSuccess) {
        console.log("지원서: ", response.data.result);
        alert("지원서 조회 성공: 임시로 콘솔에서 확인");
      }
    } catch (error) {
      console.error("지원서 조회 에러", error);
      console.log("applicantId", applicantId);
      alert("지원서 조회 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  // 특정 지원자의 합불 상태 변경
  const updateDocPassStatus = async (applicantId, value) => {
    try {
      const response = await axios.patch(
        `${apiUrl}/applicant/${applicantId}/docPassStatus?docPassStatus=${
          value === "합격"
        }`
      );
      if (response.data.isSuccess) {
        window.location.reload(); // 성공 시 페이지 새로고침
      }
    } catch (error) {
      console.error("서류 합불 상태 업데이트 에러", error);
      console.log("applicantId ", applicantId);
      alert(
        "서류 합불 상태 업데이트 중 오류가 발생했습니다. 다시 시도해주세요."
      );
    }
  };

  const updateFinalPassStatus = async (applicantId, value) => {
    try {
      const response = await axios.patch(
        `${apiUrl}/applicant/${applicantId}/finalPassStatus?finalPassStatus=${
          value === "합격"
        }`
      );
      if (response.data.isSuccess) {
        window.location.reload(); // 성공 시 페이지 새로고침
      }
    } catch (error) {
      console.error("최종 합불 상태 업데이트 에러", error);
      console.log("applicantId ", applicantId);
      alert(
        "서류 합불 상태 업데이트 중 오류가 발생했습니다. 다시 시도해주세요."
      );
    }
  };

  return (
    <>
      {items.map((item) => (
        <TableRow key={item.applicantId}>
          <TableCell>{item.name}</TableCell>
          <TableCell>{item.email?.replace(/['"]/g, "")}</TableCell>
          <TableCell>{item.phone}</TableCell>
          <TableCell>{item.part}</TableCell>

          <TableCell>
            <ToggleMenu
              value={item.docPassStatus ? "합격" : "불합격"}
              onChange={(value) => {
                setDocPassStatus({
                  ...docPassStatus,
                  [item.applicantId]: value,
                });
                updateDocPassStatus(item.applicantId, value); // 상태 업데이트
              }}
            />
          </TableCell>
          <TableCell>
            <ToggleMenu
              value={item.finalPassStatus ? "합격" : "불합격"}
              onChange={(value) => {
                setFinalPassStatus({
                  ...finalPassStatus,
                  [item.applicantId]: value,
                });
                updateFinalPassStatus(item.applicantId, value); // 상태 업데이트
              }}
            />
          </TableCell>

          <TableCell>
            <ViewButton onClick={() => handleViewApplication(item.applicantId)}>
              보기
            </ViewButton>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default AllApplicantsTable;

const TableRow = styled.div`
  display: flex;
  padding: 0.625rem 1.688rem 0.625rem 2.188rem;
  border-bottom: 0.063rem solid #e1e9ea;

  display: grid;
  grid-template-columns: 1fr 2.5fr 1.7fr 1fr 1fr 1fr 0.7fr;

`;

const TableCell = styled.div`
  font-family: "Pretendard Variable";
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5rem;
  color: ${(props) => (props.completed ? "#2B9176" : "#5C6161")};
  padding: 0.313rem;
`;

const ViewButton = styled.button`
  padding: 0.375rem 0.75rem;
  background: white;
  border: 1px solid #2b9176;
  border-radius: 0.313rem;
  color: #2b9176;
  font-family: "Pretendard Variable";
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: #90e6c9;
    color: white;
  }
`;
