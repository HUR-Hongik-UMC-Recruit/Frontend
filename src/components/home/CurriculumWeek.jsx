import styled from "styled-components";
import contents from "../../data/home/CurriculumWeekData";
import { motion } from "framer-motion";

const WeekWrapper = styled(motion.div)`
  width: 65.375rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-left: 0.75rem;
`;

const WeekList = styled.div`
  display: flex;
  align-items: center;
  align-self: stretch;
`;

const Week = styled.div`
  display: flex;
  width: 5.75rem;
  justify-content: center;

  color: #818989;
  font-feature-settings: "ss10" on;
  font-family: "Pretendard Variable";
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 575;
  line-height: 135%; /* 1.6875rem */
  letter-spacing: -0.0125rem;
`;

const WeekContent = styled.div`
  display: flex;
  height: 1.875rem;
  justify-content: center;
  align-items: center;
  padding: 0 3rem;
  border-right: ${(props) => (props.isLast ? "none" : "0.063rem solid #5C6161")};

  color: #edf4f5;
  font-family: "Pretendard Variable";
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 400;
  line-height: 170%; /* 1.9125rem */
`;

const CurriculumWeek = ({ part }) => {
  const curriculums = contents[part];

  return (
    <WeekWrapper
      key={part}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {curriculums.map((curriculum) => (
        <WeekList key={curriculum}>
          <Week>Week {curriculum.week}</Week>
          {curriculum.content.map((detail, index) => (
            <WeekContent
              key={index}
              isLast={index === curriculum.content.length - 1}
            >
              {detail}
            </WeekContent>
          ))}
        </WeekList>
      ))}
    </WeekWrapper>
  );
};

export default CurriculumWeek;
