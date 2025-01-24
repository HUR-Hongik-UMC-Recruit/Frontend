import styled from "styled-components";
import defaultImg from "../../assets/icons/LeaderWOW.svg";
import LeaderCard from "../../components/leader/LeaderCard";
import leaders from "../../data/leader/LeaderData";
import LeaderToggle from "../../components/leader/LeaderToggle";

const LeaderContainer = styled.div`
  background: black;
  padding: 5rem 8rem 10rem 8rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 4rem;
  margin-bottom: 8.13rem;
`;

const SectionTitle = styled.div`
  color: #90e6c9;
  text-align: center;
  font-family: "Pretendard Variable";
  font-size: 2.5rem;
  font-style: normal;
  font-weight: 600;
  line-height: 170%; /* 4.25rem */
  letter-spacing: -0.025rem;
`;

const SectionDetail = styled.div`
  color: #818989;
  text-align: center;
  font-family: "Pretendard Variable";
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 400;
  line-height: 170%; /* 2.125rem */
  letter-spacing: -0.0125rem;
`;

const LeaderPage = () => {
  return (
    <LeaderContainer>
      <Section>
        <SectionTitle>운영진</SectionTitle>
        <SectionDetail>UMC를 이끌어갈 운영진을 소개합니다</SectionDetail>
      </Section>
      {leaders.map((leader, index) => (
        <LeaderToggle key={index} leaders={leader} />
      ))}
    </LeaderContainer>
  );
};

export default LeaderPage;
