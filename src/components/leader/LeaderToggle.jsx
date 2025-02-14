import { useEffect, useState } from "react";
import styled from "styled-components";
import DownIcon from "../../assets/icons/DownIcon.svg";
import LeaderCard from "./LeaderCard";
import axios from "axios";

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
  gap: 7.5rem;

  margin: 3rem 0rem 8rem 0rem;
`;

const LeaderListWrapper = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
`;

const LeaderTitle = styled.div`
  text-align: end;

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
  flex-wrap: wrap;
`;

const LeaderToggle = ({ generation }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [leaders, setLeaders] = useState({ presidents: [], partLeaders: [] });

  // API 연결
  const apiUrl = process.env.REACT_APP_API_URL;
  const getLeaders = async () => {
    // get 요청
    try {
      const response = await axios.get(
        `${apiUrl}/leaders?generation=${generation}`
      );
      setLeaders(response.data.result);
      console.log("운영진 get 서버 응답: ", response.data);
    } catch (e) {
      console.log("운영진 get 에러 발생: ", e);
    }
  };

  return (
    <ToggleContainer>
      <ToggleHeader
        onClick={() => {
          setIsOpen(!isOpen);
          getLeaders();
        }}
      >
        <ToggleTitle>{generation}</ToggleTitle>
        <ToggleIcon $isOpen={isOpen}>
          <img src={DownIcon} alt="toggle" />
        </ToggleIcon>
      </ToggleHeader>
      {isOpen && (
        <LeaderListContainer>
          <LeaderListWrapper>
            <LeaderTitle>회장단</LeaderTitle>
            <LeaderList>
              {leaders.presidents.map((leader, i) => (
                <LeaderCard key={i} {...leader} />
              ))}
            </LeaderList>
          </LeaderListWrapper>

          <LeaderListWrapper>
            <LeaderTitle>파트장</LeaderTitle>
            <LeaderList>
              {leaders.partLeaders.map((leader, i) => (
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
