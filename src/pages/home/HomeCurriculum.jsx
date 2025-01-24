import styled from "styled-components";
import { useState } from "react";
import SectionHeader from "../../components/common/SectionHeader";
import { motion } from "motion/react";
import parts from "../../data/common/PartList";
import CurriculumRecommand from "../../components/home/CurriculumRecommand";
import CurriculumWeek from "../../components/home/CurriculumWeek";

const CurriculumContainer = styled.div`
  background: #111412;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 15rem;
  gap: 0.75rem;
`;

const ContentsWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const PartButtonWrapper = styled.div`
  display: flex;
  width: 65.375rem;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
`;

const PartButton = styled.div`
  font-family: "Pretendard Variable";
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 400;
  line-height: 135%; /* 2.025rem */
  letter-spacing: -0.015rem;
  text-align: center;
  width: 7.25rem;
  cursor: pointer;

  &.active {
    border-bottom: 0.063rem solid #fcffff;
    color: #fcffff;
  }

  color: ${(props) => (props.isSelect ? " #fcffff" : "#5c6161")};
  border-bottom: ${(props) => (props.isSelect ? "0.063rem solid #fcffff" : "none")};
`;

const CurriculumWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

const HomeCurriculum = () => {
  const [index, setIndex] = useState(0);
  const [selectPart, setSelectPart] = useState("Plan");

  const partClick = (index) => {
    setIndex(index);
    setSelectPart(parts[index]);
  };

  return (
    <CurriculumContainer>
      <SectionHeader
        title="커리큘럼"
        subtitle="UMC는 6개월동안 다양한 활동을 진행해요"
      />
      <ContentsWrapper
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          ease: "easeInOut",
          duration: 1,
          y: { duration: 1 },
        }}
      >
        <PartButtonWrapper>
          {parts.map((part, id) => (
            <PartButton
              key={id}
              className={id === index ? "active" : null}
              onClick={() => partClick(id)}
            >
              {part}
            </PartButton>
          ))}
        </PartButtonWrapper>

        <CurriculumWrapper>
          <CurriculumRecommand part={selectPart} />
          <CurriculumWeek part={selectPart} />
        </CurriculumWrapper>
      </ContentsWrapper>
    </CurriculumContainer>
  );
};

export default HomeCurriculum;
