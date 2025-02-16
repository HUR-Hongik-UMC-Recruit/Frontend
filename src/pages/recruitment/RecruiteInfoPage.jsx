import RecruitmentPart from "./RecruitmentPart";
import RecruitmentTarget from "./RecruitmentTarget";
import RecruitmentSchedule from "./RecruitmentSchedule";
import Notice from "./Notice";
import FAQ from "./FAQ";
import Challenge from "../../components/common/Challenge";
import styled from "styled-components";

const RecruiteInfoPage = () => {
  // 페이지 상단으로 스크롤하는 함수
  const scrollToTop = (e) => {
    // 기존 클릭 이벤트 막기
    e.stopPropagation();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div style={{ background: "black", marginTop: "5rem" }}>
      <RecruitmentTarget />
      <RecruitmentPart />
      <RecruitmentSchedule />
      <Notice />
      <FAQ />
      <ChallengeWrapper onClick={(e) => scrollToTop(e)}>
        <Challenge />
      </ChallengeWrapper>
    </div>
  );
};

const ChallengeWrapper = styled.div`
  // Challenge 컴포넌트의 버튼을 감싸서 클릭 이벤트를 가로챔
  button {
    cursor: pointer;
  }
`;

export default RecruiteInfoPage;
