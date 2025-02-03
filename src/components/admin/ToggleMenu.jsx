import React, { useState } from 'react';
import styled from 'styled-components';
import ChevronDown from "../../assets/icons/arrow/ChevronDown.svg";
            

const ToggleMenu = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const options = ['합격', '불합격'];

  return (
    <SelectContainer>
      <SelectButton onClick={() => setIsOpen(!isOpen)} $status={value}>
        <span>{value}</span>
        <img src={ChevronDown} alt="down" />
      </SelectButton>

      {isOpen && (
        <OptionList>
          {options.map((option) => (
            <Option
              key={option}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
            >
              {option}
            </Option>
          ))}
        </OptionList>
      )}
    </SelectContainer>
  );
};

export default ToggleMenu;

const SelectContainer = styled.div`
  position: relative;
`;

const SelectButton = styled.button`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.375rem 1rem;
  gap: 0.5rem;
  width: 6rem;
  height: 2.25rem;
  background: rgba(144, 224, 230, 0.4);
  border: 1px solid #60C1C3;
  border-radius: 0.313rem;
  cursor: pointer;

  span {
    font-family: 'Pretendard Variable';
    font-weight: 600;
    font-size: 0.875rem;
    line-height: 145%;
    color: #60C1C3;
`;

const OptionList = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  width: 6rem;
  background: white;
  border: 1px solid #E1E9EA;
  border-radius: 0.313rem;
  box-shadow: 0rem 0.125rem 0.5rem rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const Option = styled.div`
  padding: 0.5rem 1rem;
  font-family: 'Pretendard Variable';
  font-size: 0.875rem;
  color: #5C6161;
  cursor: pointer;

  &:hover {
    background: #EDF4F5;
  }
`;