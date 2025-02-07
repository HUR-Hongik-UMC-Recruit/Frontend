import { useState } from "react";
import styled from "styled-components";
import parts from "../../data/common/PartList";
import APIConverter from "../../data/application/APIConverter";
import partContent from "../../data/application/PartQuestionData";

const PartContainer = styled.div`
  width: 100%;
  margin-top: 3rem;
`;

const PartTitle = styled.div`
  color: #2b9176;
  font-family: "Pretendard Variable";
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 575;
  line-height: 1.875rem; /* 125% */
`;

const PartBorder = styled.div`
  height: 0.1875rem;
  background: #e1e9ea;
  margin: 1rem 0rem 1.5rem 0rem;
`;

const QuestionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-bottom: 4rem;
`;

const Question = styled.label`
  color: #1d201e;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.875rem; /* 150% */
`;

const RadioPartWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.62rem;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 8.75rem;
  height: 3.75rem;
  gap: 1.9rem;
`;

const RadioWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  border-radius: 0.75rem;
  border: 0.094rem solid #d1dadb;
  background: #fcffff;

  position: relative;
  cursor: pointer;

  font-family: "Pretendard Variable";
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.875rem; /* 187.5% */

  &:hover {
    border: 0.094rem solid #2b9176;
    background: #b1e9d6;
  }
`;

const Radio = styled.input`
  position: absolute;
  width: 0.063rem;
  height: 0.063rem;
  padding: 0;
  border: 0;
  overflow: hidden;
  margin: -0.063rem;
  clip-path: inset(50%);

  /* 체크된 상태일 때 스타일 변경 */
  &: checked + ${RadioWrapper} {
    font-weight: 599;
    background: #dffaf1;
    border-color: #2b9176;
    color: #353838;
  }
`;

const AnswerBig = styled.textarea`
  font-family: "Pretendard Variable";
  height: 15.063rem;
  padding: 0.938rem 1.125rem;
  background: #fcffff;
  border: 0.094rem solid #d1dadb;
  border-radius: 0.75rem;
  resize: none;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.875rem; /* 187.5% */
  color: #353838;

  &::placeholder {
    color: #818989;
  }
`;

const Guide = styled.div`
  color: #2b9176;
  font-family: "Pretendard Variable";
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
`;

const AnswerSmall = styled.textarea`
  height: 1.88rem;
  padding: 0.9375rem 1.4375rem;
  background: #fcffff;
  border: 0.094rem solid #d1dadb;
  border-radius: 0.75rem;
  resize: none;
  font-family: "Pretendard Variable";
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.875rem; /* 187.5% */
  color: #353838;

  &::placeholder {
    color: #818989;
  }
`;

const ApplicationPart = ({ updateApplicantDTO, handleAnswerChange, refs }) => {
  // 파트 선택 여부
  const [selectPart, setSelectPart] = useState("Plan");
  const handlePartChange = (e) => {
    setSelectPart(e.target.value);
    updateApplicantDTO("part", APIConverter[e.target.value]);
    handleAnswerChange(5, e);
  };

  return (
    <PartContainer>
      <PartTitle>파트별 질문</PartTitle>

      <PartBorder />

      <QuestionWrapper>
        <Question>1. 지원하고 싶은 트랙을 선택해주세요.</Question>
        <RadioPartWrapper>
          {parts.map((part, idx) => (
            <RadioLabel key={idx}>
              <Radio
                type="radio"
                name="part"
                value={part}
                onChange={handlePartChange}
                ref={refs[5]}
              />
              <RadioWrapper checked={idx === selectPart} key={part}>
                {part}
              </RadioWrapper>
            </RadioLabel>
          ))}
        </RadioPartWrapper>
      </QuestionWrapper>

      <QuestionWrapper>
        <Question>2. {selectPart} 트랙에 지원하는 이유는 무엇인가요?</Question>
        <AnswerBig
          type="text"
          placeholder="500자 이하로 얘기해주세요"
          onChange={(e) => handleAnswerChange(6, e)}
          ref={refs[6]}
        />
      </QuestionWrapper>

      <QuestionWrapper>
        <Question>3. {partContent[selectPart].question}</Question>
        <Guide>{partContent[selectPart].guide}</Guide>
        <AnswerSmall
          type="text"
          placeholder={partContent[selectPart].example}
          onChange={(e) => {
            handleAnswerChange(7, e);
          }}
          ref={refs[7]}
        />
      </QuestionWrapper>
    </PartContainer>
  );
};

export default ApplicationPart;
