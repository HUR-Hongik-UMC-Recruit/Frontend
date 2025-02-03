import styled from "styled-components";

const FinalPassEmail = ({ items }) => {
  return (
    <>
      {items.map((item) => (
        <TableRow key={item.applicantId}>
          <TableCell>{item.name}</TableCell> {/* 이름름 (1번 헤더 아래) */}
          <TableCell>{item.email?.replace(/['"]/g, "")}</TableCell>{" "}
          {/* 이메일 (2번 헤더 아래) */}
          <TableCell>{item.phone}</TableCell>
          <TableCell>{item.part}</TableCell>
          <TableCell $isPassed={item.finalPassStatus}>합격</TableCell>
          <TableCell $finalEmailSent={item.finalEmailSent}>
            {item.finalEmailSent ? "전송 완료" : "전송 대기"}
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
  grid-template-columns: 1fr 4fr 2.5fr 1.5fr 3fr 1.5fr;
`;

const TableCell = styled.div`
  font-family: "Pretendard Variable";
  font-size: 1rem;
  font-style: normal;
  font-weight: ${(props) =>
    props.$isPassed ? 599 : 400}; /* finalPassStatus가 true일 경우 600 */
  line-height: 1.5rem;
  color: ${(props) =>
    props.$isPassed
      ? "#60C1C3"
      : props.$finalEmailSent
      ? "#2B9176"
      : "#5C6161"}; /* finalPassStatus가 true일 경우 #60C1C3 (합격) */
  padding: 0.313rem;

`;
