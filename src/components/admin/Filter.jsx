import React, { useState } from "react";
import styled from "styled-components";
import ChevronDown from "../../assets/icons/arrow/ChevronDown.svg";

// FilterSearchTwo는 AllApplicantsPage의 handleFilterChange 함수이자, TableLayoutForApplicants에서 받은 prop
const Filter = ({filterSearchTwo}) => { 
  const [part, setPart] = useState("파트별");
  const [keyword, setKeyword] = useState("");
  const [docPassStatus, setDocPassStatus] = useState("서류 합격 여부");
  const [finalPassStatus, setFinalPassStatus] = useState("최종 합격 여부");

  const [isPartOpen, setIsPartOpen] = useState(false);
  const [isDocOpen, setIsDocOpen] = useState(false);
  const [isFinalOpen, setIsFinalOpen] = useState(false);

  const partOptions = [
    "파트별",
    "PM",
    "DESIGN",
    "IOS",
    "ANDROID",
    "WEB",
    "SPRING",
    "NODE",
  ];
  const docStatusOptions = ["서류 합격 여부", "합격", "불합격"];
  const finalStatusOptions = ["최종 합격 여부", "합격", "불합격"];

  const handleSearch = () => {
    const filterValues = {
      part: part, // 선택된 파트
      docPassStatus: docPassStatus, // 서류 합격 여부
      finalPassStatus: finalPassStatus, // 최종 합격 여부
      keyword: keyword // 이름 검색어
    };

    filterSearchTwo(filterValues); // 검색 버튼 클릭시 이 함수 실행
  };

  return (
    <Container>
      <FilterWrapper>
        {/* 파트 필터 */}
        <FilterSection>
          <SelectContainer>
            <SelectButton onClick={() => setIsPartOpen(!isPartOpen)}>
              <span>{part}</span>
              <img src={ChevronDown} alt="down" />
            </SelectButton>
            {isPartOpen && (
              <OptionList>
                {partOptions.map((option) => (
                  <Option
                    key={option}
                    onClick={() => {
                      setPart(option); // 선택한 옵션으로 업데이트
                      setIsPartOpen(false); // 드롭다운 닫기
                    }}
                  >
                    {option}
                  </Option>
                ))}
              </OptionList>
            )}
          </SelectContainer>
        </FilterSection>

        {/* 서류 합격 여부 필터 */}
        <FilterSection>
          <SelectContainer>
            <SelectButton onClick={() => setIsDocOpen(!isDocOpen)}>
              <span>{docPassStatus}</span>
              <img src={ChevronDown} alt="down" />
            </SelectButton>
            {isDocOpen && (
              <OptionList>
                {docStatusOptions.map((option) => (
                  <Option
                    key={option}
                    onClick={() => {
                      setDocPassStatus(option);
                      setIsDocOpen(false);
                    }}
                  >
                    {option}
                  </Option>
                ))}
              </OptionList>
            )}
          </SelectContainer>
        </FilterSection>

        {/* 최종 합격 여부 필터 */}
        <FilterSection>
          <SelectContainer>
            <SelectButton onClick={() => setIsFinalOpen(!isFinalOpen)}>
              <span>{finalPassStatus}</span>
              <img src={ChevronDown} alt="down" />
            </SelectButton>
            {isFinalOpen && (
              <OptionList>
                {finalStatusOptions.map((option) => (
                  <Option
                    key={option}
                    onClick={() => {
                      setFinalPassStatus(option);
                      setIsFinalOpen(false);
                    }}
                  >
                    {option}
                  </Option>
                ))}
              </OptionList>
            )}
          </SelectContainer>
        </FilterSection>

        {/* 이름 검색 */}
        <FilterSection>
          <SearchInput
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="지원자 이름"
          />
        </FilterSection>
      </FilterWrapper>
      {/* 검색 버튼 */}
      <ActionButton onClick={handleSearch}>검색</ActionButton>
    </Container>
  );
};

export default Filter;

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%; // Container 내부에서 꽉 차게
  position: relative;
`;

const FilterWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 3.5rem; // 필터들 사이의 간격
`;

const FilterSection = styled.div`
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  box-sizing: border-box; // 패딩 값을 height에 포함
  width: 8.063rem;
  height: 2.5rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid #a2abab;
  border-radius: 0.313rem;
  font-family: "Pretendard Variable";
  font-size: 0.875rem;
  background: #fcffff;

  &::placeholder {
    font-family: "Pretendard Variable";
    font-weight: 600;
    font-size: 0.875rem;
    color: #a2abab;
    line-height: 1.269rem;
  }
`;

const ActionButton = styled.button`
  padding: 0.5rem 1rem;
  background: #b1f4dd;
  color: #2b9176;
  border: none;
  border-radius: 0.313rem;
  cursor: pointer;
  font-family: "Pretendard Variable";
  font-size: 0.875rem;
  font-weight: 600;
  height: 2.5rem;
  width: 6.8125rem;
  position: absolute;
  right: 0;
  margin-left: 12.438rem;

  &:hover {
    background: #4ca890;
    color: white;
  }
`;

const SelectContainer = styled.div`
  position: relative;
  width: 6.3125rem;
`;

const SelectButton = styled.button`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0.75rem;
  width: 9.063rem;
  height: 2.5rem;
  background: #fcffff;
  border: 1px solid #a2abab;
  border-radius: 0.313rem;
  cursor: pointer;

  span {
    font-family: "Pretendard Variable";
    font-weight: 600;
    font-size: 0.875rem;
    color: #a2abab;
    line-height: 1.269rem;
  }
`;

const OptionList = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  width: 9.063rem;
  background: white;
  border: 1px solid #e1e9ea;
  border-radius: 0.313rem;
  box-shadow: 0rem 0.125rem 0.5rem rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const Option = styled.div`
  padding: 0.5rem 0.75rem;
  font-family: "Pretendard Variable";
  font-size: 0.875rem;
  color: #5c6161;
  cursor: pointer;

  &:hover {
    background: #edf4f5;
  }
`;
