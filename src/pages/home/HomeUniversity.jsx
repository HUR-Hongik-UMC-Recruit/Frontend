import styled, { keyframes } from "styled-components";
import SectionHeader from "../../components/common/SectionHeader";
import Hongik from "../../assets/icons/university/hongik.png";
import Yonsei from "../../assets/icons/university/연세대학교.png";
import Ihwa from "../../assets/icons/university/이화여자대학교.png";
import Duksung from "../../assets/icons/university/덕성여자대학교.png";
import Soongsil from "../../assets/icons/university/숭실대학교.png";
import Sangmyung from "../../assets/icons/university/상명대학교.png";
import Sungshin from "../../assets/icons/university/성신여자대학교.png";
import Dongguk from "../../assets/icons/university/동국대학교.png";
import Jungang from "../../assets/icons/university/중앙대학교.png";
import Catholic from "../../assets/icons/university/가톨릭대학교.png";
import Seoulwomen from "../../assets/icons/university/서울여자대학교.png";
import Gachon from "../../assets/icons/university/가천대학교.png";

import Kwangwoon from "../../assets/icons/university/광운대학교.png";
import Dongduk from "../../assets/icons/university/동덕여자대학교.png";
import Seokyeong from "../../assets/icons/university/서경대학교.png";

import Sookmyung from "../../assets/icons/university/숙명여자대학교.png";
import Inha from "../../assets/icons/university/인하대학교.png";
import Jeonbuk from "../../assets/icons/university/전북대학교.png";
import Hufs from "../../assets/icons/university/한국외국어대학교.png";
import Aerospace from "../../assets/icons/university/한국항공대학교.png";
import Hansung from "../../assets/icons/university/한성대학교.png";
import Erica from "../../assets/icons/university/한양대학교에리카.png";


const UniversityContainer = styled.div`
  width: 100%;
  height: 69.4rem;
  background: #111412;
`;

const UniversityWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 15rem;
  gap: 5.75rem;
`;

const CarouselWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const Carousel = styled.div`
  display: flex;
  overflow: hidden;
  flex: 0 0 100%;

  // &:hover .group {
  //   animation-play-state: paused;
  // }
`;

const scrollingLeft = keyframes`
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-100%);
    }
`;

const Top = styled.div`
  display: flex;
  gap: 4rem;
  padding-right: 4rem;
  height: 15rem;
  justify-content: center;
  align-items: center;

  will-change: transform;
  animation: ${scrollingLeft} 60s linear infinite;
`;

const scrollingRight = keyframes`
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(0);
    }
`;

const Down = styled.div`
  display: flex;
  gap: 4rem;
  padding-right: 4rem;
  height: 15rem;
  justify-content: center;
  align-items: center;

  will-change: transform;
  animation: ${scrollingRight} 60s linear infinite;
`;

const CardWrapper = styled.div`
  display: flex;
  width: 10.625rem;
  height: 10.625rem;

  justify-content: center;
  align-items: center;

  border-radius: 9.375rem;
  background: #fff;
  box-shadow: 0rem 0rem 1.25rem 0rem #009bcb;
`;

const Card = styled.img`
  width: 9.75rem;
  height: 9.75rem;
  flex-shrink: 0;
`;

const HomeUniversity = () => {
  const top = [
    Hongik,
    Yonsei,
    Ihwa,
    Duksung,
    Soongsil,
    Sangmyung,
    Catholic,
    Sungshin,
    Dongguk,
    Jungang,
    Seoulwomen,
  ];

  const down = [
    Gachon,
    Kwangwoon,
    Dongduk,
    Seokyeong,
    Sookmyung,
    Inha,
    Jeonbuk,
    Hufs,
    Aerospace,
    Hansung,
    Erica,
  ];

  return (
    <UniversityContainer>
      <UniversityWrapper>
        <SectionHeader
          title="연합 대학"
          subtitle="UMC 8기는 24개의 학교와 함께해요"
        />
        <CarouselWrapper>
          <Carousel>
            <Top className="group">
              {top.map((content) => (
                <CardWrapper>
                  <Card src={content} />
                </CardWrapper>
              ))}
            </Top>
            <Top className="group">
              {top.map((content) => (
                <CardWrapper>
                  <Card src={content} />
                </CardWrapper>
              ))}
            </Top>
          </Carousel>
          <Carousel>
            <Down className="group">
              {down.map((content) => (
                <CardWrapper>
                  <Card src={content} />
                </CardWrapper>
              ))}
            </Down>
            <Down className="group">
              {down.map((content) => (
                <CardWrapper>
                  <Card src={content} />
                </CardWrapper>
              ))}
            </Down>
          </Carousel>
        </CarouselWrapper>
      </UniversityWrapper>
    </UniversityContainer>
  );
};

export default HomeUniversity;
