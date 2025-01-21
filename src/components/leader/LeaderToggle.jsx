import { useState } from "react";
import styled from "styled-components";
import DownIcon from "../../assets/icons/DownIcon.svg";
import LeaderCard from "./LeaderCard";

const ToggleContainer = styled.div`
  width: 100%;
`;

const ToggleHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.125rem solid #353838;
  padding-bottom: 1rem;
  cursor: pointer;
`;

const ToggleTitle = styled.div`
  color: #a2abab;
  font-family: "Pretendard Variable";
  font-size: 1.75rem;
  font-style: normal;
  font-weight: 575;
  line-height: 135%; /* 2.3625rem */
  letter-spacing: -0.0175rem;
`;

const ToggleIcon = styled.div`
  display: flex;
  flex-direction: column;
  width: 1.5rem;
  height: 1.5rem;
  img {
    transform: ${({ $isOpen }) => ($isOpen ? "rotate(180deg)" : "rotate(0)")};
    transition: transform 0.3s ease;
  }
`;

const LeaderListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7rem;

  margin: 3rem 0rem 13rem 0rem;
`;

const LeaderListWrapper = styled.div`
  // display: flex;
  // justify-content: space-between;
`;

const LedaerTitle = styled.div`
  color: #a2abab;
  font-family: "Pretendard Variable";
  font-size: 1.75rem;
  font-style: normal;
  font-weight: 599;
  line-height: 135%; /* 2.3625rem */
  letter-spacing: -0.0175rem;
`;

const LeaderList = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-bottom: 3rem;
`;

const LeaderToggle = ({ leaders }) => {
  const [isOpen, setIsOpen] = useState(false);

  //   <LeaderCard
  //     img={defaultImg}
  //     role="회장"
  //     name="이름"
  //     nickname="별명"
  //     major="컴퓨터공학과"
  //   />;

  return (
    <ToggleContainer>
      <ToggleHeader onClick={() => setIsOpen(!isOpen)}>
        <ToggleTitle>{leaders.generation}</ToggleTitle>
        <ToggleIcon $isOpen={isOpen}>
          <img src={DownIcon} alt="toggle" />
        </ToggleIcon>
      </ToggleHeader>
      {isOpen && (
        <LeaderListContainer>
          <LeaderListWrapper>
            <LedaerTitle>회장단</LedaerTitle>
            <LeaderList>
              {leaders.presidents.map((leader, i) => (
                <LeaderCard key={i} {...leader} />
              ))}
            </LeaderList>
          </LeaderListWrapper>
          <LeaderListWrapper>
            <LedaerTitle>파트장</LedaerTitle>
            <LeaderList>
              {leaders.parts.server.map((leader, i) => (
                <LeaderCard key={i} {...leader} />
              ))}
            </LeaderList>
            <LeaderList>
              {leaders.parts.web.map((leader, i) => (
                <LeaderCard key={i} {...leader} />
              ))}
            </LeaderList>
            <LeaderList>
              {leaders.parts.mobile.map((leader, i) => (
                <LeaderCard key={i} {...leader} />
              ))}
            </LeaderList>
            <LeaderList>
              {leaders.parts.plans.map((leader, i) => (
                <LeaderCard key={i} {...leader} />
              ))}
            </LeaderList>
          </LeaderListWrapper>
        </LeaderListContainer>
      )}
    </ToggleContainer>
  );
};

export default LeaderToggle;
