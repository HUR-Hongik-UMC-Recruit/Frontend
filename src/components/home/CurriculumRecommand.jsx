import styled from "styled-components";
import contents from "../../data/home/CurriculumRecommandData";
import { motion } from "framer-motion";

const RecommandWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 65.375rem;
  height: 1.875rem;
  padding: 1.5rem;
  align-items: center;

  border-radius: 0.4375rem;
  background: rgba(53, 56, 56, 0.4);
`;

const RecommandTitile = styled(motion.div)`
  display: flex;
  width: 5.75rem;
  justify-content: center;

  color: #e1e9ea;
  font-family: "Pretendard Variable";
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 575;
  line-height: 135%; /* 1.6875rem */
  letter-spacing: -0.0125rem;
`;

const RecommandText = styled(motion.div)`
  display: flex;
  height: 1.875rem;
  justify-content: center;
  align-items: center;
  padding: 0 3rem;
  border-right: ${(props) => (props.isLast ? "none" : "0.063rem solid #5C6161")};

  color: #a2abab;
  font-family: "Pretendard Variable";
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 400;
  line-height: 170%; /* 1.9125rem */
`;

const CurriculumRecommand = ({ part }) => {
  const recommnads = contents[part];

  return (
    <RecommandWrapper>
      <RecommandTitile
        key={part}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        권장
      </RecommandTitile>
      {recommnads.map((recommand, index) => (
        <RecommandText
          key={recommand}
          isLast={index === recommnads.length - 1}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {recommand}
        </RecommandText>
      ))}
    </RecommandWrapper>
  );
};

export default CurriculumRecommand;
