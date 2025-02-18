import React from "react";
import styled from "styled-components";
import UmcIcon from "../assets/icons/UmcIcon.svg";

const DeviceDetect = () => {
  return (
    <DeviceDetectWrapper>
      <ContentContainer>
        <TextContainer>
          <Title>모바일에서는 이 페이지에 접근할 수 없습니다.</Title>
          <Content>PC 환경에서 다시 시도해주세요</Content>
        </TextContainer>
        <ButtonContainer></ButtonContainer>
      </ContentContainer>
      <IconWrapper>
        <img src={UmcIcon} alt="UMC Icon" />
      </IconWrapper>
    </DeviceDetectWrapper>
  );
};

export default DeviceDetect;

const DeviceDetectWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  overflow: hidden;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 3rem 0 0;
  position: absolute;
  width: 23.4375rem;
  height: 21.375rem;
  left: 0;
  top: 2.75rem;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 1rem;
`;

const Title = styled.div`
  font-family: "Pretendard Variable";
  font-style: normal;
  font-weight: 700;
  font-size: 1.75rem;
  line-height: 135%;
  letter-spacing: -0.01em;
  color: #f49799;
  margin-bottom: 1.25rem;
`;

const Content = styled.div`
  font-family: "Pretendard Variable";
  font-style: normal;
  font-weight: 600;
  font-size: 1.125rem;
  line-height: 145%;
  color: #edf4f5;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 1rem;
  width: 23.4375rem;
  height: 2.25rem;
`;

const IconWrapper = styled.div`
  position: absolute;
  bottom: 4.375rem;
  left: 50%;
  transform: translateX(-50%);
`;