import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import SectionHeader from "../../components/common/SectionHeader";
import scheduleData from "../../data/recruitment/ScheduleData";

const RecruitmentSchedule = () => {
  const [isVisible, setIsVisible] = useState(false);
  const timelineRef = useRef(null);

  useEffect(() => {
    const currentRef = timelineRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // 애니메이션이 실행되면 옵저버 해제
        }
      },
      { threshold: 0.1 } // 10%가 보일 때 트리거
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <BackgroundContainer ref={timelineRef}>
      <ContentWrapper>
        <ScheduleContent>
          <SectionHeader title="모집 일정" subtitle="Recruitment Schedule" />
          <TimelineContainer>
            <TimelineBar>
              <TimelineLine isVisible={isVisible} />
              <TimelinePoints>
                {Array(4)
                  .fill(null)
                  .map((_, index) => (
                    <TimelinePoint
                      key={index}
                      index={index}
                      isVisible={isVisible}
                    />
                  ))}
              </TimelinePoints>
            </TimelineBar>
            <ScheduleItems>
              {scheduleData.map((item, index) => (
                <ScheduleItem key={index} index={index} isVisible={isVisible}>
                  <ScheduleTitle>{item.title}</ScheduleTitle>
                  <ScheduleDate>{item.date}</ScheduleDate>
                </ScheduleItem>
              ))}
            </ScheduleItems>
          </TimelineContainer>
          <Note>※ 서류 및 최종 합격 발표 일정은 지연될 수 있습니다.</Note>
        </ScheduleContent>
      </ContentWrapper>
    </BackgroundContainer>
  );
};

const BackgroundContainer = styled.div`
  width: 100%;
  min-height: 44.188rem;
  background-color: #111412;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0rem 13.438rem 15rem;
  width: 90rem;
`;

const ScheduleContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 68.75rem;
`;

const TimelineContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: -0.25rem;
`;

const TimelineBar = styled.div`
  position: relative;
  width: 100%;
  height: 1rem;
`;

// 타임라인 라인 애니메이션
const drawLine = keyframes`
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
`;

const TimelineLine = styled.div`
  position: absolute;
  width: 100%;
  height: 0.5rem;
  top: 0.25rem;
  background: #353838;
  border-radius: 0.781rem;

  animation: ${(props) => (props.isVisible ? drawLine : "none")} 2s ease
    forwards; /* 선이 그려지는 시간 설정 */
`;

const TimelinePoints = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  width: 51.063rem;
  left: 9.281rem;
  top: 0;
`;

// 타임라인 포인트 애니메이션
const scaleUp = keyframes`
  0% {
    transform: scale(0);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const TimelinePoint = styled.div`
  width: 1rem;
  height: 1rem;
  background: #90e6c9;
  border-radius: 50%;

  opacity: 0;
  animation: ${(props) => (props.isVisible ? scaleUp : "none")} 0.5s ease
    forwards;
  animation-delay: ${(props) =>
    props.index * 0.5}s; /* 포인트에 따라 지연 시간 설정 */
`;

const ScheduleItems = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2.5rem;
  width: 64.25rem;
`;

// 스케줄 아이템 애니메이션
const fadeInUp = keyframes`
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ScheduleItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem;
  width: 14.188rem;

  opacity: 0;
  transform: translateY(1.25rem);
  animation: ${(props) => (props.isVisible ? fadeInUp : "none")} 0.5s ease
    forwards;
  animation-delay: ${(props) =>
    (props.index + 0.5) * 0.5}s; /* 포인트와 동일한 지연 설정 */
`;

const ScheduleTitle = styled.h3`
  font-weight: 590;
  font-size: 1.563rem;
  line-height: 135%;
  text-align: center;
  letter-spacing: -0.01em;
  color: #edf4f5;
  width: 13.188rem;
`;

const ScheduleDate = styled.p`
  font-weight: 300;
  font-size: 1.125rem;
  line-height: 145%;
  text-align: center;
  color: #e1e9ea;
  width: 13.188rem;
  margin-top: 0.5rem;
`;

const Note = styled.p`
  font-weight: 400;
  font-size: 0.938rem;
  line-height: 140%;
  text-align: right;
  color: #bcc6c6;
  width: 100%;
  margin-top: 6.75rem;
`;

export default RecruitmentSchedule;
