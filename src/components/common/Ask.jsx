import styled from "styled-components";
import SectionHeader from "./SectionHeader";

const AskContainer = styled.div`
  width: 100%;
  height: 51.1rem;
  background: #111412;
  background-size: cover;
  background-position: center top;
`;

const AskWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 15rem;
  gap: 10rem;
`;

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 45rem;
  height: 18.5rem;
  gap: 20rem;
`;

const KakaoWrapper = styled.div`
  display: flex;
  width: 12.5rem;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

const KakaoImg = styled.img`
  width: 12.51513rem;
  height: 12.51513rem;
`;

const KakaoText = styled.a`
  text-decoration-line: none;

  color: #a2abab;
  text-align: center;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 500;
  line-height: 140%; /* 1.75rem */
  letter-spacing: -0.0125rem;
`;

const InstaWrapper = styled.div`
  display: flex;
  width: 12.5rem;
  flex-direction: column;
  gap: 1.5rem;
`;

const InstaImg = styled.img`
  width: 12.51513rem
  height: 12.51513rem;
`;

const InstaText = styled.a`
  text-decoration-line: none;

  color: #a2abab;
  text-align: center;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 500;
  line-height: 140%; /* 1.75rem */
  letter-spacing: -0.0125rem;
`;

const Ask = () => {
  return (
    <AskContainer>
      <AskWrapper>
        <SectionHeader
          title="무엇이든 물어보세요"
          subtitle="챌린저가 될 여러분을 위해"
        />
        <LogoWrapper>
          <KakaoWrapper>
            <KakaoImg />
            <KakaoText>
              UMC 홍익대
              <br />
              카카오톡 채널
            </KakaoText>
          </KakaoWrapper>
          <InstaWrapper>
            <InstaImg />
            <InstaText>
              UMC 홍익대
              <br />
              공식 인스타그램
            </InstaText>
          </InstaWrapper>
        </LogoWrapper>
      </AskWrapper>
    </AskContainer>
  );
};

export default Ask;
