import styled from "styled-components";

export const Section = styled.section`
  width: 100%;
`;

export const ContentWrapper = styled.div`
`;

export const SectionTitle = styled.h2`
  color: #2b9176;
  font-family: "Pretendard Variable";
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 575;
  line-height: 1.875rem; /* 125% */
  margin-top: 7rem;
`;

export const Divider = styled.div`
  height: 0.1875rem;
  background: #e1e9ea;
  margin: 1rem 0rem 1.5rem 0rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-bottom: 3rem;
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;
  font-weight: 500;
  color: #1d201e;
`;

export const RequiredDot = styled.span`
  width: 0.688rem;
  height: 0.688rem;
  background: #90e6c9;
  border-radius: 50%;
`;

export const Input = styled.input`
  box-sizing: border-box; // padding이 height에 포함되도록
  width: 100%;
  height: 3.75rem;
  padding: 0.938rem 1.125rem;
  background: #fcffff;
  border: 0.094rem solid #d1dadb;
  border-radius: 0.75rem;
  font-size: 1rem;
  color: #353838;
  font-family: "Pretendard Variable";

  &::placeholder {
    color: #818989;
  }

  &:hover {
    border: 0.094rem solid #2b9176;
  }

  &:focus {
    border: 0.094rem solid #2b9176;
    outline: none;
    caret-color: #2b9176;
  }
`;

export const InputGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  width: 100%;
`;

export const Button = styled.button`
  width: 10rem;
  height: 3.75rem;
  background: #5fbda1;
  border: 0.063rem solid #2b9176;
  border-radius: 0.75rem;
  color: white;
  font-weight: 500;
  font-size: 1.25rem;
  cursor: pointer;

  &:hover {
    background: #4e977f;
  }
`;

export const DisabledButton = styled(Button)`
  background: #d1dadb;
  border-color: #a2abab;
  cursor: not-allowed; // 커서 막음

  &:hover {
    background: #d1dadb;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
`;

export const RadioGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const RadioButton = styled.button`
  cursor: pointer;
  color: #353838;
  font-family: "Pretendard Variable";
  font-size: 1rem;
  font-style: normal;
  line-height: 1.875rem;
  flex: 1;
  height: 3.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background: ${(props) => (props.$active ? "#DFFAF1" : "#FCFFFF")};
  border: 0.125rem solid ${(props) => (props.$active ? "#2B9176" : "#D1DADB")};
  border-radius: 0.75rem;
  font-weight: ${(props) => (props.$active ? "599" : "400")};
  color: #353838;
`;

export const TextArea = styled.textarea`
  font-family: "Pretendard Variable";
  height: 15.063rem;
  padding: 0.938rem 1.125rem;
  background: #fcffff;
  border: 0.094rem solid #d1dadb;
  border-radius: 0.75rem;
  resize: none;
  font-size: 1rem;
  color: #353838;

  &::placeholder {
    color: #818989;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
`;

export const InfoText = styled.p`
  color: #2b9176;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.875rem;
  letter-spacing: 0.009rem;
  margin: 0;
  margin-left: 0.3rem;
  white-space: pre-line; // 줄바꿈
`;

export const FormItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.313rem; // InfoText와의 간격만을 위한 gap
`;

export const StyledRadioGroup = styled(RadioGroup)`
  ${RadioButton} {
    width: 13.125rem;
    flex: 13.125rem;
  }
`;
