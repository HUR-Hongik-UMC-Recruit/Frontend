import styled from "styled-components";
import CustomPagination from "../../components/common/CustomPagination";
import Filter from "./Filter";

const TableLayoutForApplicants = ({
  title,
  subtitle,
  headers,
  renderRow,
  currentItems,
  paginationProps,
  filterSearchOne // AllApplicantsPage에서 받은 prop 함수
}) => {
  return (
    <Container>
      <ContentWrapper>
        <HeaderSection>
          <Title>{title}</Title>
          <Subtitle>{subtitle}</Subtitle>
        </HeaderSection>

        <FilterContainer>
          <Filter filterSearchTwo={filterSearchOne} /> {/* Filter 컴포넌트에 전달하기 */}
        </FilterContainer>

        <TableHeader>
          {headers.map((header, index) => (
            <span key={index}>{header}</span>
          ))}
        </TableHeader>

        {/* 각 항목을 renderRow로 렌더링 */}
        {currentItems.map((item, index) => renderRow(item, index))}

        {/* 페이지네이션에 props 전달 */}
        <CustomPagination {...paginationProps} />
      </ContentWrapper>
    </Container>
  );
};
export default TableLayoutForApplicants;

const Container = styled.div`
  padding: 0 2.25rem; // 좌우 패딩딩
  margin-left: 19.5rem; // 왼쪽 배너 width만큼 margin
  display: flex;
  align-items: center; // 수직 중앙 정렬
  min-height: 100vh;
`;

const FilterContainer = styled.div`
  margin-bottom: 0.75rem; // 테이블 헤더와의 간격
`;

const ContentWrapper = styled.div`
  width: 100%; // Container 내부에서 꽉 차게
`;

const HeaderSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 3.75rem;
`;

const Title = styled.h1`
  font-family: "Pretendard Variable";
  font-size: 1.75rem;
  font-style: normal;
  font-weight: 700;
  line-height: 2.363rem;
  color: #1d201e;
  margin-top: 3rem;
`;

const Subtitle = styled.h2`
  font-family: "Pretendard Variable";
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 400;
  line-height: 2.025rem;
  color: #5c6161;
  margin: 0;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 2.5fr 1.7fr 1fr 1fr 1fr 0.7fr;
  background: #edf4f5;
  border-radius: 0.625rem;
  margin-bottom: 0.375rem;
  padding: 0.875rem 1.688rem 0.875rem 2.7rem;

  span {
    font-family: "Pretendard Variable";
    font-weight: 600;
    font-size: 1.063rem;
    color: #5c6161;
    line-height: 1.541rem;
  }
`;
