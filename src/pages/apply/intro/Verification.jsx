import React, { useState } from "react";
import styled from "styled-components";
import {
  Section,
  ContentWrapper,
  SectionTitle,
  Divider,
  Label,
  RequiredDot,
  Input,
  Button,
  DisabledButton,
  InputGroup,
  InfoText,
} from "../../../components/apply/intro/SectionStyles";
import axios from "axios";

import { useEmail } from "../../../contexts/EmailContext";

const Verification = ({ emailRefs }) => {
  const { setAuthenticatedEmail, setEmailAuthStatus } = useEmail();

  const [email, setEmail] = useState(""); // 이메일 입력값
  const [emailSentSuccess, setEmailSentSuccess] = useState(""); // 이메일 인증 요청이 성공했는지 여부
  const [verificationCode, setVerificationCode] = useState(""); // 사용자가 입력한 인증 코드
  const [verificationSent, setVerificationSent] = useState(false); // 확인 버튼 클릭 상태
  const [isVerified, setIsVerified] = useState(false); // 이메일 인증이 완료되었는지 여부
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleEmailVerification = async () => {
    // 이메일 인증 요청 로직

    // 유효성 검사
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,7}$/;

    if (!emailRegex.test(email)) {
      setEmailSentSuccess(null); // 유효하지 않은 이메일
      return;
    }

    try {
      const response = await axios.post(
        `${apiUrl}/applicant/email/send?email=${email}`
      );
      console.log("인증 요청 응답: ", response);

      if (response.status === 200) {
        setEmailSentSuccess(true); // 인증 요청 성공
      }
    } catch (error) {
      setEmailSentSuccess(false); // 인증 요청 실패
      console.log(error.response.data.message);
    }
  };

  const handleCodeVerification = async () => {
    // 인증 코드 검증 로직

    setVerificationSent(true); // 확인 버튼 비활성화

    try {
      const response = await axios.post(`${apiUrl}/applicant/email/verify`, {
        email,
        verificationCode: verificationCode,
      });

      console.log("인증 완료 응답: ", response);

      if (response.status === 200) {
        setIsVerified(true); // 인증 완료
        setAuthenticatedEmail(email); // 검증된 이메일 저장
        setEmailAuthStatus(true); // 이메일 인증 완료 상태로 변경
      }
    } catch (error) {
      alert("이메일 인증에 실패했습니다.");
      setVerificationSent(false); // 확인 버튼 활성화
    }
  };

  return (
    <Section>
      <ContentWrapper>
        <SectionTitle>본인 인증</SectionTitle>
        <Divider />

        <StyledFormGroup>
          <Label>
            이메일 <RequiredDot />
          </Label>

          <InputGroup>
            <Input
              ref={emailRefs}
              type="email"
              placeholder="본인 이메일 주소를 입력해주세요."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailSentSuccess ? (
              isVerified ? (
                <DisabledButton>재발송</DisabledButton> // 인증 완료 시 "재발송" 버튼 비활성화
              ) : (
                <Button onClick={handleEmailVerification}>재발송</Button>
              )
            ) : isVerified ? (
              <DisabledButton>인증 요청</DisabledButton> // 인증 완료 시 "인증 요청" 버튼 비활성화
            ) : (
              <Button onClick={handleEmailVerification}>인증 요청</Button>
            )}
          </InputGroup>

          {emailSentSuccess === null ? (
            <InfoText>유효한 이메일 주소를 입력해주세요.</InfoText>
          ) : emailSentSuccess === true && !isVerified ? (
            <InfoText>확인 코드가 전송되었습니다.</InfoText>
          ) : emailSentSuccess === false ? (
            <InfoText>이메일 인증 요청 중 오류가 발생했습니다.</InfoText>
          ) : null}

          <InputGroup>
            <Input
              type="text"
              placeholder="확인 코드를 입력해주세요."
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />

            {!verificationCode ? ( // 인증 코드 입력 안 됨
              <DisabledButton>확인</DisabledButton>
            ) : verificationSent ? ( // 확인 버튼 이미 클릭
              <DisabledButton>확인</DisabledButton>
            ) : isVerified ? ( // 인증 완료 시 비활성화
              <DisabledButton>확인</DisabledButton>
            ) : (
              <Button onClick={handleCodeVerification}>확인</Button> // 인증 가능
            )}
          </InputGroup>

          {isVerified && <InfoText>인증이 완료되었습니다.</InfoText>}
        </StyledFormGroup>
      </ContentWrapper>
    </Section>
  );
};

export default Verification;

const StyledFormGroup = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 44.313rem;
  gap: 0.938rem;
`;
