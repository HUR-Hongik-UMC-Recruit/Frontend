import { useState } from "react";
import styled from "styled-components";

const AgreeContainer = styled.div`
  width: 100%;
`;

const AgreeBorder = styled.div`
  height: 0.1875rem;
  background: #e1e9ea;
  margin-bottom: 4rem;
`;

const AgreeListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-bottom: 4rem;
`;

const AgreeTitle = styled.label`
  color: #1d201e;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.875rem; /* 150% */
`;

const AgreeDeatilWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AgreeText = styled.div`
  width: 75%;
  color: #2b9176;
  font-family: "Pretendard Variable";
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
`;

const Link = styled.a`
  color: #2b9176;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const CheckBoxWrapper = styled.div`
  display: flex;
  // width: 10rem;
  height: 3.75rem;
  align-items: center;
  justify-content: center;
  gap: 1.5625rem;
  border-radius: 0.75rem;
  // border: 0.094rem solid;
  border-color: ${(props) => (props.checked ? "#2B9176" : "#d1dadb")};
  // background: ${(props) => (props.checked ? "#dffaf1" : "#fcffff")};
  transition: background-color 0.3s;
`;

const ScreenReaderCheckbox = styled.input`
  position: absolute;
  width: 0.063rem;
  height: 0.063rem;
  padding: 0;
  border: 0;
  overflow: hidden;
  margin: -0.063rem;
  clip-path: inset(50%);
`;

const LabelWrapper = styled.div`
  position: relative;
`;

const CheckIcon = styled.span`
  width: 1.1875rem;
  height: 1.1875rem;
  border-radius: 50%;
  background-color: #fff;
  border: 0.094rem solid #bcc6c6;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);

  &::before {
    content: "";
    position: absolute;
    box-sizing: border-box;
    width: 30%;
    height: 55%;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-70%) rotateZ(40deg);
    border-right: 0.106rem solid #bcc6c6;
    border-bottom: 0.106rem solid #bcc6c6;
  }
`;

const Label = styled.label`
  padding-left: 2em;
  position: relative;
  cursor: pointer;

  color: #1d201e;
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.875rem; /* 150% */
`;

const Checkbox = styled(ScreenReaderCheckbox)`
  &:checked + ${LabelWrapper} ${CheckIcon} {
    border-color: #5fbda1;
    background-color: #5fbda1;
  }

  &:checked + ${LabelWrapper} ${CheckIcon}::before {
    border-color: #fff;
  }
`;

const ApplicationAgree = ({ updateAgreeChange, refs }) => {
  // 약관 동의 여부 상태 관리
  const [infoAgree, setInfoAgree] = useState(false);
  const [passion, setPassion] = useState(false);

  return (
    <AgreeContainer>
      <AgreeBorder />
      <AgreeListWrapper ref={refs.infoRef}>
        <AgreeTitle>1. 개인정보 수집 및 이용 동의</AgreeTitle>
        <AgreeDeatilWrapper>
          <AgreeText>
            개인 정보 수집 및 이용 동의를 하지 않으시면 UMC 지원이 불가능합니다.
            <br />
            <Link
              href="https://softsquared.notion.site"
              target="_blank"
              rel="noopener noreferrer"
            >
              개인 정보 처리 방침 전문
            </Link>
          </AgreeText>
          <CheckBoxWrapper checked={infoAgree}>
            <Checkbox
              type="checkbox"
              id="1"
              checked={infoAgree}
              onChange={() => {
                setInfoAgree(!infoAgree);
                updateAgreeChange(!infoAgree, passion);
              }}
            />
            <LabelWrapper>
              <CheckIcon aria-hidden="true" />
              <Label htmlFor="1">동의합니다</Label>
            </LabelWrapper>
          </CheckBoxWrapper>
        </AgreeDeatilWrapper>
      </AgreeListWrapper>
      <AgreeListWrapper ref={refs.passionRef}>
        <AgreeTitle>
          2. UMC의 모든 활동에 열정적으로 참여하실 수 있습니까?
        </AgreeTitle>
        <AgreeDeatilWrapper>
          <AgreeText>
            UMC 활동은 3월부터 8월 말까지 약 6개월 간 진행됩니다. 실력이
            부족하더라도 UMC에서 제공하는 커리큘럼 및 다양한 행사에 참여하며
            끝까지 완주할 수 있는, 끈기 있는 여러분을 만나고 싶습니다.
            <br />
            끝까지 수료할 수 있으십니까?
          </AgreeText>
          <CheckBoxWrapper checked={passion}>
            <Checkbox
              type="checkbox"
              id="2"
              checked={passion}
              onChange={() => {
                setPassion(!passion);
                updateAgreeChange(infoAgree, !passion);
              }}
            />
            <LabelWrapper>
              <CheckIcon aria-hidden="true" />
              <Label htmlFor="2">동의합니다</Label>
            </LabelWrapper>
          </CheckBoxWrapper>
        </AgreeDeatilWrapper>
      </AgreeListWrapper>
    </AgreeContainer>
  );
};

export default ApplicationAgree;
