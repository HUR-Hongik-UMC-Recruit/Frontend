import Pagination from "react-js-pagination";
import styled from "styled-components";

import ChevronLeft from "../../assets/icons/arrow/ChevronLeft.svg";
import ChevronRight from "../../assets/icons/arrow/ChevronRight.svg";

export default function CustomPagination({
  activePage,
  totalItemsCount,
  handlePageChange,
}) {
  if (totalItemsCount < 7) {
    return null; // totalItemsCount가 7보다 작으면 페이지네이션을 숨김
  }

  return (
    <PaginationWrapper>
      <Pagination
        activePage={activePage}
        itemsCountPerPage={7}
        totalItemsCount={totalItemsCount}
        pageRangeDisplayed={5}
        onChange={handlePageChange}
        prevPageText={
          <PageText>
            <img
              src={ChevronLeft}
              alt="이전"
              style={{
                cursor: activePage === 1 ? "default" : "pointer",
                opacity: activePage === 1 ? 0.5 : 1,
              }}
            />
          </PageText>
        }
        nextPageText={
          <PageText>
            <img
              src={ChevronRight}
              alt="다음"
              style={{
                cursor:
                  activePage === Math.ceil(totalItemsCount / 7)
                    ? "default"
                    : "pointer",
                opacity:
                  activePage === Math.ceil(totalItemsCount / 7) ? 0.5 : 1,
              }}
            />
          </PageText>
        }
        hideFirstLastPages
      />
    </PaginationWrapper>
  );
}

const PaginationWrapper = styled.div`
  margin: 3rem 0;
  font-family: Pretendard-Regular;
  font-size: 1.5rem;

  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  ul.pagination li a {
    text-decoration: none;
    background-color: none;
    padding: 0.55rem 1.1rem;
    border-radius: 0.75rem;
    color: #a2abab;
    font-family: "Pretendard Variable";
    font-size: 1.203rem;
    font-style: normal;
    font-weight: 600;
    line-height: 145%; /* 27.913px */
    letter-spacing: 0.012rem;
  }

  ul.pagination li.active a {
    font-family: "Pretendard Variable";
    font-size: 1.203rem;
    font-style: normal;
    font-weight: 600;
    line-height: 145%; /* 27.913px */
    letter-spacing: 0.012rem;
    color: #1d201e;
    background-color: #90e6c9;
  }
`;

const PageText = styled.div`
  width: 4rem;
  display: flex;
  justify-content: center;
  padding: 0;
  font-size: 1.188rem;
`;
