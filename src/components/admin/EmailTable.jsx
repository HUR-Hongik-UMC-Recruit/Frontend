import styled from "styled-components";

const EmailTable = ({ items }) => {
  return (
    <>
      {items.map((item, index) => (
        <TableRow key={item.id || index}>
          <TableCell>{index + 1}</TableCell>{" "}
          {/* 번호 (1번 헤더 아래), 자동 증가 */}
          <TableCell>{item.emailAddress?.replace(/['"]/g, "")}</TableCell>{" "}
          {/* 이메일 (2번 헤더 아래), 따옴표 제거 */}
          <TableCell /> {/* 3번 빈 칸 */}
          <TableCell /> {/* 4번 빈 칸 */}
          <TableCell /> {/* 5번 빈 칸 */}
          <TableCell completed={item.completed}>
            {item.completed ? "전송 완료" : "전송 대기"}
          </TableCell>{" "}
          {/* 상태 (6번 헤더 아래) */}
        </TableRow>
      ))}
    </>
  );
};

export default EmailTable;

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
  font-weight: 400;
  line-height: 1.5rem;
  color: ${(props) => (props.completed ? "#2B9176" : "#5C6161")};
  padding: 0.313rem;

`;
