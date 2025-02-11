import styled from "styled-components";
import NotFound from "../../src/assets/icons/NotFoundSVG.svg";
import ToHome from "../../src/assets/icons/arrow/ArrowToHome.svg";
import ToHomeHover from "../../src/assets/icons/arrow/ArrowToHomeHover.svg";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  background: #111412;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  height: 33.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 11.25rem;
`;

const NotFoundWrapper = styled.div`
  height: 18.8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4.38rem;
`;

const SVG = styled.img`
  width: 31.3rem;
  height: 10.9rem;
`;

const TextWrapper = styled.div``;

const Text1 = styled.div`
  color: #a2abab;
  text-align: center;
  font-family: "Pretendard Variable";
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 1.6rem */
`;

const Text2 = styled.div`
  color: #e1e9ea;
  font-family: "Pretendard Variable";
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 500;
  line-height: 145%; /* 1.63125rem */
`;

const ToHomeButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 11.3rem;
  height: 3.5rem;
  gap: 0.75rem;

  border-radius: 4.1875rem;
  border: 0.063rem solid #bcc6c6;
  background: transparent;
  cursor: pointer;

  color: #e1e9ea;
  font-family: "Pretendard Variable";
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: 145%; /* 1.26875rem */
  letter-spacing: 0.00875rem;

  &:hover {
    border: #bcc6c6;
    background: #edf4f5;
    color: #5c6161;
  }

  &:hover img {
    content: url(${ToHomeHover}); /* 호버 시 이미지 변경 */
  }
`;

const NotFoundPage = () => {
  const navigate = useNavigate();

  const toRecruit = () => {
    // 새로고침 느낌
    // window.location.href = "/recruitment";

    // 스무스하게 넘어감
    navigate("/");
  };

  return (
    <Container>
      <Wrapper>
        <NotFoundWrapper>
          <SVG src={NotFound} alt="Not Found" />
          <TextWrapper>
            <Text1>Break the error!</Text1>
            <Text2>요청하신 페이지를 찾을 수 없습니다</Text2>
          </TextWrapper>
        </NotFoundWrapper>
        <ToHomeButton onClick={toRecruit}>
          홈으로 이동
          <img src={ToHome} alt='tohome' style={{ width: "1.5rem", height: "1.5rem" }} />
        </ToHomeButton>
      </Wrapper>
    </Container>
  );
};

export default NotFoundPage;
