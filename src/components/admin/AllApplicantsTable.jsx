import styled from "styled-components";

const AllApplicantsTable = ({ items}) => {

  return (
    <>
      {items.map((item) => (
        <TableRow key={item.applicantId}>
          <TableCell>{item.name}</TableCell>
          <TableCell>{item.email?.replace(/['"]/g, "")}</TableCell>
          <TableCell>{item.phone}</TableCell>
          <TableCell>{item.part}</TableCell>

          <TableCell>합불</TableCell>
          <TableCell>합불</TableCell>

          <TableCell>보기</TableCell>
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
  grid-template-columns: 0.9fr 3fr 2fr 2fr 2fr 2fr 0.8fr;
`;

const TableCell = styled.div`
  font-family: "Pretendard Variable";
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5rem;
  color: ${(props) => (props.completed ? "#2B9176" : "#5C6161")};
  padding: 0.313rem;

  span:last-child {
    // 마지막 요소만 중앙 정렬
    justify-self: center;
  }
`;

const StatusButton = styled.button`
  padding: 6px 16px;
  background: ${(props) =>
    props.$status ? "rgba(144, 224, 230, 0.4)" : "white"};
  border: 1px solid ${(props) => (props.$status ? "#60C1C3" : "#A2ABAB")};
  border-radius: 5px;
  color: ${(props) => (props.$status ? "#60C1C3" : "#A2ABAB")};
  font-weight: 600;
  position: relative;
  cursor: pointer;
`;

const ToggleMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border: 1px solid #e1e9ea;
  border-radius: 5px;
  width: 100%;
  z-index: 1;
`;

const ToggleItem = styled.div`
  padding: 8px 16px;
  cursor: pointer;
  &:hover {
    background: #edf4f5;
  }
`;
