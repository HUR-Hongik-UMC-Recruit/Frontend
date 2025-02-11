import React from "react";
import styled from "styled-components";
import SectionHeader from "../../components/common/SectionHeader";
import FAQItem from "../../components/recruitment/FAQItem";
import faqData from "../../data/recruitment/FAQData";
import { motion } from "motion/react";

const FAQ = () => {
  return (
    <BackgroundContainer>
      <ContentWrapper>
        <SectionHeader title="자주 묻는 질문" subtitle="FAQ" />
        <FAQListContainer>
          {faqData.map((faq, index) => (
            <FAQItemWrapper
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                ease: "easeInOut",
                duration: 1,
                delay: index * 0.5,
                y: { duration: 1 },
              }}
            >
              <FAQItem key={index} {...faq} />
            </FAQItemWrapper>
          ))}
        </FAQListContainer>
      </ContentWrapper>
    </BackgroundContainer>
  );
};

export default FAQ;

const BackgroundContainer = styled.div`
  width: 100%;
  min-height: 48.438rem;
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
  height: auto;
`;

const FAQListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  gap: 1rem;
`;

const FAQItemWrapper = styled(motion.div)``;
