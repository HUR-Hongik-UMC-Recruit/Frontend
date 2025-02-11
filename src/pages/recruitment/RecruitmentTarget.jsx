import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import SectionHeader from "../../components/common/SectionHeader";
import targetDetails from "../../data/recruitment/TargetData";
import { motion } from "framer-motion";

const RecruitmentTarget = () => {
  const [visibleCards, setVisibleCards] = useState(
    Array(targetDetails.length).fill(false)
  );
  const cardRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = entry.target.dataset.index;
          setVisibleCards((prev) => {
            const newVisibleCards = [...prev];
            newVisibleCards[index] = true;
            return newVisibleCards;
          });
          observer.unobserve(entry.target); // 요소가 보이면 관찰 중지
        }
      });
    });

    cardRefs.current.forEach((card) => {
      if (card) {
        observer.observe(card);
      }
    });

    return () => {
      observer.disconnect(); // 컴포넌트 언마운트 시 관찰 해제
    };
  }, [targetDetails]);

  return (
    <BackgroundContainer>
      <ContentWrapper>
        <SectionHeader title="모집 대상" subtitle="Recruitment Target" />
        <CardContainer>
          {targetDetails.map((detail, index) => (
            <Card
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              data-index={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: visibleCards[index] ? 1 : 0,
                y: visibleCards[index] ? 0 : 20,
              }}
              transition={{
                type: "spring",
                stiffness: 100,
                delay: index * 0.3,
              }}
            >
              <CardText>
                {detail.split("\n").map((line, i) => (
                  <React.Fragment key={i}>
                    {line === "(졸업생 제외)" ? (
                      <GraduationException>{line}</GraduationException>
                    ) : (
                      line
                    )}
                    <br />
                  </React.Fragment>
                ))}
              </CardText>
            </Card>
          ))}
        </CardContainer>
      </ContentWrapper>
    </BackgroundContainer>
  );
};

export default RecruitmentTarget;

const BackgroundContainer = styled.div`
  width: 100%;
  min-height: 58.313rem;
  background-color: #111412;
  background-size: cover;
  background-position: center;
  left: 0rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 8.5rem 13.438rem 15rem;
  max-width: 63rem;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  justify-content: center;
`;

const Card = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 2.5rem 1.5rem;
  gap: 0.625rem;
  width: 20rem;
  height: 11.813rem;
  background: #1d201e;
  border: 0.063rem solid #353838;
  border-radius: 0.625rem;
`;

const CardText = styled.p`
  font-weight: 400;
  font-size: 1.25rem;
  line-height: 140%;
  text-align: center;
  color: #e1e9ea;
  width: 100%;
`;

const GraduationException = styled.span`
  color: rgba(129, 137, 137, 1);
`;
