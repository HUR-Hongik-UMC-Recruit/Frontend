import styled from "styled-components";
import SectionHeader from "../../components/common/SectionHeader";
import { motion } from "motion/react";

const PartContainer = styled.div`
  background: #111412;
  width: 100%;
  height: 59.4rem;
`;

const PartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20rem;
`;

const ContentsWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const TeamSection = styled.div`
  margin-top: 2rem;
`;

const Part = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  flex-wrap: wrap;
`;

const MemberList = styled.div`
  font-family: Pretendard Variable;
  font-weight: 600;
  font-size: 1.25rem;
  line-height: 1.75rem;
  letter-spacing: -1%;
  color: #5c6161;
  display: flex;
  align-items: center;
`;

const TeamMember = styled.div`
  color: #d1dadb;
`;

const TeamTitle = styled.h2`
  color: #a2abab;
  font-family: Pretendard Variable;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  letter-spacing: -1%;
  margin-bottom: 2.125rem;
`;

const PartTitle = styled.div`
  font-family: Pretendard Variable;
  font-weight: 600;
  font-size: 1.25rem;
  line-height: 1.75rem;
  letter-spacing: -1%;
  color: #5c6161;
  margin-right: 3.75rem;
  width: 5.625rem;
`;

const VerticalBar = styled.div`
  width: 0.125rem;
  height: 0.875rem;
  background-color: #5c6161;
  margin: 0.625rem;
`;

const HomeMadeBy = () => {
  const ProjectData = {
    team: {
      pm: [
        { nickname: "토리", name: "정기민" },
        { nickname: "오슬로", name: "이승용" },
      ],
      design: [
        { nickname: "우주", name: "손서우" },
        { nickname: "솔솔", name: "이다솔" },
      ],
      backend: [
        { nickname: "라이틔얼", name: "윤현일" },
        { nickname: "제리", name: "안제웅" },
        { nickname: "도도", name: "박도연" },
      ],
      frontend: [
        { nickname: "감자", name: "곽은채" },
        { nickname: "채이", name: "이채은" },
      ],
    },
  };

  return (
    <PartContainer>
      <PartWrapper>
        <SectionHeader />
        <ContentsWrapper>
          <TeamSection>
            <TeamTitle>MADE BY</TeamTitle>
            <TeamMember>
              {Object.keys(ProjectData.team).map(
                (
                  part // 객체를 배열로 바꾸자
                ) => (
                  <Part key={part}>
                    <PartTitle>{part.toUpperCase()}</PartTitle>
                    {ProjectData.team[part].map((member, index) => (
                      <MemberList key={index}>
                        {member.nickname}
                        <VerticalBar /> {member.name}
                      </MemberList>
                    ))}
                  </Part>
                )
              )}
            </TeamMember>
          </TeamSection>
        </ContentsWrapper>
      </PartWrapper>
    </PartContainer>
  );
};

export default HomeMadeBy;
