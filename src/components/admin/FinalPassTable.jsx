import styled from "styled-components";

const FinalPassEmail = ({ items }) => {
  return (
    <>
      {items.map((item) => (
        <TableRow key={item.id}>
          <TableCell>{item.name}</TableCell> {/* 이름름 (1번 헤더 아래) */}
          <TableCell>{item.email?.replace(/['"]/g, "")}</TableCell>{" "}
          {/* 이메일 (2번 헤더 아래) */}
          <TableCell>{item.phone}</TableCell>
          <TableCell>{item.part}</TableCell>
          <TableCell $isPassed={item.finalPassStatus}>
            {item.finalPassStatus ? "합격" : ""}
          </TableCell>
          <TableCell $completed={item.completed}>
            {item.$completed ? "전송 완료" : "전송 대기"}
          </TableCell>{" "}
          {/* 상태 (6번 헤더 아래) */}
        </TableRow>
      ))}
    </>
  );
};

export default FinalPassEmail;

const TableRow = styled.div`
  display: flex;
  padding: 0.625rem 1.688rem 0.625rem 2.188rem;
  border-bottom: 0.063rem solid #e1e9ea;

  display: grid;
  grid-template-columns: 0.9fr 3fr 2fr 1.2fr 4fr 0.8fr;
`;

const TableCell = styled.div`
  font-family: "Pretendard Variable";
  font-size: 1rem;
  font-style: normal;
  font-weight: ${(props) =>
    props.$isPassed ? 600 : 400}; /* docPassStatus가 true일 경우 600 */
  line-height: 1.5rem;
  color: ${(props) =>
    props.$isPassed
      ? "#60C1C3"
      : props.$completed
      ? "#2B9176"
      : "#5C6161"}; /* docPassStatus가 true일 경우 #60C1C3 (합격) */
  padding: 0.313rem;

  span:last-child {
    // 마지막 요소만 중앙 정렬
    justify-self: center;
  }
`;
