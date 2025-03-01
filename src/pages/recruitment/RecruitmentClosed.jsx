import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { ReactComponent as SendIcon } from "../../assets/icons/SendIcon.svg";
import BackgroundSvg from "../../assets/images/recruitment_background/background.svg";

const RecruitmentClosed = () => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const [email, setEmail] = useState("");

  const handleIconClick = async () => {
    if (!email) {
      alert("이메일을 입력해주세요.");
      return;
    }

    // 이메일 유효성 검사
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,7}$/;

    if (!emailRegex.test(email)) {
      alert("유효한 이메일 주소를 입력해주세요.");
      return;
    }

    try {
      const response = await axios.post(
        `${apiUrl}/applicant/notice/register`,
        email,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        alert("모집 알림 신청이 완료 되었습니다.");
        console.log(email);
        setEmail(""); // 입력 필드 초기화하기
      }
    } catch (error) {
      alert("모집 알림 신청 중 오류가 발생했습니다.");
    }
  };

  return (
    <BackgroundContainer>
      <ContentWrapper>
        <Title>지금은 모집 기간이 아닙니다</Title>
        <Description>
          UMC 9기 모집 알림을 신청하고 가장 빠르게 모집 소식을 들어보세요.
        </Description>
        <InputField
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="모집 알림을 받을 메일 주소를 입력해주세요"
        />
        <StyledSendIcon onClick={handleIconClick} />
        <SeparatorLine />
      </ContentWrapper>
    </BackgroundContainer>
  );
};

export default RecruitmentClosed;

const BackgroundContainer = styled.div`
  width: 100%;
  min-height: 37rem;
  background-image: url(${BackgroundSvg});
  background-size: cover;
  background-position: center top;
  top: 0rem;
  left: 0rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentWrapper = styled.div`
  padding: 12.438rem 11.875rem 8.719rem;
  margin-right: 20%;
`;

const Title = styled.h1`
  font-size: 2.25rem;
  font-weight: 700;
  line-height: 3.038rem;
  color: rgba(255, 255, 255, 1);
  margin-bottom: 0.438rem;
`;

const Description = styled.p`
  font-size: 1.375rem;
  line-height: 1.856rem;
  font-weight: 400;
  margin-bottom: 7.063rem;
  color: rgba(188, 198, 198, 1);
`;

const InputField = styled.input`
  height: 2.75rem;
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 1.75rem;
  outline: none;
  border: none;
  background-color: transparent;
  width: 46.688rem;
  color: rgba(129, 137, 137, 1);
  caret-color: rgba(129, 137, 137, 1);
`;

const StyledSendIcon = styled(SendIcon)`
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  margin-bottom: -0.5rem;
`;

const SeparatorLine = styled.div`
  width: 49.875rem;
  border: 0.10625rem solid #5c6161;
  flex-grow: 0;
`;
