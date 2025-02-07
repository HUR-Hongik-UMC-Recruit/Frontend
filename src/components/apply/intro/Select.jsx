import React, { useState } from "react";
import styled from "styled-components";
import ArrowDown from "../../../assets/icons/arrow/ArrowDownSelect.svg";

const Select = ({ options, defaultValue, value, onChange, type }) => {
  const [isOpen, setIsOpen] = useState(false);

  // type에 따른 높이 설정
  const getListHeight = () => {
    switch (type) {
      case "status": // 재학여부
        return "8.313rem";
      case "experience": // 활동경험
        return "6.313rem";
      default: // 학년
        return "10.563";
    }
  };

  return (
    <SelectContainer>
      <SelectButton onClick={() => setIsOpen(!isOpen)} $isOpen={isOpen}>
        <span>{value || defaultValue}</span>
        <ArrowIcon src={ArrowDown} alt="arrow" />
      </SelectButton>

      {isOpen && (
        <OptionList height={getListHeight()}>
          <OptionsContainer $type={type}>
            {options.map(
              (
                option // options 배열의 각 항목 순회
              ) => (
                <Option
                  key={option}
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                  isSelected={value === option} // 현재 선택된 옵션인지 여부
                >
                  {option} {/* 옵션 텍스트 */}
                </Option>
              )
            )}
          </OptionsContainer>
        </OptionList>
      )}
    </SelectContainer>
  );
};

const SelectContainer = styled.div`
  position: relative;
  width: 100%;
`;

const SelectButton = styled.button`
  font-family: "Pretendard Variable";
  box-sizing: border-box;
  width: 100%;
  height: 3.75rem;
  padding: 0.938rem 1.125rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fcffff;
  border: 0.094rem solid ${(props) => (props.isOpen ? "#BCC6C6" : "#D1DADB")};
  border-radius: 0.75rem;
  cursor: pointer;

  span {
    font-style: normal;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.875rem;
    color: #353838;
  }
`;

const ArrowIcon = styled.img`
  width: 0.75rem;
  color: #818989;
`;

const OptionList = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  height: height: ${(props) => props.height};  // 동적 높이 설정
  margin-top: 0.25rem;
  background: #FCFFFF;
  border: 0.094rem solid #BCC6C6;
  border-radius: 0.75rem;
  padding: 1.125rem;
  box-sizing: border-box;
  z-index: 10;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.188rem;
  width: 100%;
  height: 100%;
`;

const Option = styled.button`
  font-family: "Pretendard Variable";
  width: 100%;
  height: 1.875rem;
  font-style: normal;
  font-weight: "400";
  font-size: 1rem;
  line-height: 1.875rem;
  color: ${(props) => (props.isSelected ? "#FFF" : "#353838")};
  background: ${(props) => (props.isSelected ? "#75D7B6" : "transparent")};
  border: none;
  text-align: left;
  padding: 0;
  cursor: pointer;

  &:hover {
    font-weight: 599;
    background: ${(props) => (props.isSelected ? "#2B9176" : "#DFFAF1")};
    color: ${(props) => (props.isSelected ? "#FFF" : "#353838")};
  }
`;

export default Select;
