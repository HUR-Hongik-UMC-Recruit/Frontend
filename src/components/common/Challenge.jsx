import styled, { keyframes } from "styled-components";
import arrowNext from "../../assets/icons/arrow/ArrowNextMint.svg";
import background from "../../assets/icons/BgChallenge.png";
import { useNavigate } from "react-router-dom";

const ChallengeContainer = styled.div`
  width: 100%;
  height: 28.87rem;

  background: #111412;
  background-image: url(${background});
  background-size: cover;
  background-position: center top;
`;

const ChallengeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 17.87rem;
  gap: 2.5rem;
`;

const ChallengeText = styled.h1`
  margin: 0;
  color: #fff;
  text-align: center;
  font-size: 3.25rem;
  font-style: normal;
  font-weight: 650;
  line-height: 128%; /* 4.48rem */
  letter-spacing: -0.035rem;
`;

const TextDo = styled.span`
  color: #90e6c9;
`;

const TextSung = styled.span`
  color: #90e0e6;
`;

const shake = keyframes`
  0% {
        transform: rotate(0deg)
    }
    25% {
        transform: rotate(-8deg);
    }
    50% {
        transform: rotate(8deg);
    }
    75% {
        transform: rotate(-8deg);
    }
    100% {
        transform: rotate(0deg);
    }
`;

const ChallengeButton = styled.button`
  display: flex;
  height: 4rem;
  padding: 1rem 1.5rem;
  justify-content: center;
  align-items: center;

  border-radius: 5rem;
  border: #b1f4dd;
  background: #b1f4dd;
  cursor: pointer;

  color: #353838;
  font-size: 1.375rem;
  font-style: normal;
  font-weight: 600;
  line-height: 135%; /* 1.85625rem */
  letter-spacing: -0.01375rem;

  &:hover {
    transform: scale(1.1);
    transition: transform 0.5s ease;
    animation: ${shake} 0.7s;
  }
`;

const Challenge = () => {
  const navigate = useNavigate();

  const toRecruit = () => {
    // 새로고침 느낌
    // window.location.href = "/recruitment";

    // 스무스하게 넘어감
    // navigate("/apply");
    // window.scrollTo(0, 0); // 페이지 최상단으로 스크롤

    window.location.href = "/recruitment";
  };

  return (
    <ChallengeContainer>
      <ChallengeWrapper>
        <ChallengeText>
          지금, UMC와 함께 <TextDo>도전</TextDo>하고 <TextSung>성장</TextSung>
          하세요!
        </ChallengeText>
        <ChallengeButton onClick={toRecruit}>
          모집 알림 신청하기 <img src={arrowNext} alt="arrownext" />
        </ChallengeButton>
      </ChallengeWrapper>
    </ChallengeContainer>
  );
};

export default Challenge;
