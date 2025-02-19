import styled from "styled-components";
import FileClose from "../../assets/icons/FileClose.svg";

const AdminModal = ({ isOpen, closeModal, application }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    // e.target이 ModalContainer일 때만 닫히도록
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <ModalContainer onClick={handleOverlayClick}>
      <ModalContent>
        <CloseBtn onClick={closeModal}>
          <img src={FileClose} alt="fileclose" />
        </CloseBtn>
        {application && (
          <ApplicationContent>
            <SectionTitle>인적 사항</SectionTitle>
            <PersonalInfoSection>
              <Section>
                <InfoGrid>
                  <InfoItem>
                    <Label>이름 :</Label>
                    <Value>{application.name}</Value>
                  </InfoItem>
                  <InfoItem>
                    <Label>생년월일 :</Label>
                    <Value>{application.birth}</Value>
                  </InfoItem>
                  <InfoItem>
                    <Label>성별 :</Label>
                    <Value>{application.gender === "MALE" ? "남" : "여"}</Value>
                  </InfoItem>
                  <InfoItem>
                    <Label>닉네임 :</Label>
                    <Value>{application.nickName}</Value>
                  </InfoItem>
                  <InfoItem>
                    <Label>이메일 :</Label>
                    <Value>{application.email}</Value>
                  </InfoItem>
                </InfoGrid>
              </Section>

              <Section>
                <InfoGrid>
                  <InfoItem>
                    <Label>학번 :</Label>
                    <Value>{application.studentId}</Value>
                  </InfoItem>
                  <InfoItem>
                    <Label>학과 :</Label>
                    <Value>{application.major}</Value>
                  </InfoItem>
                  <InfoItem>
                    <Label>재학 여부 :</Label>
                    <Value>
                      {application.gradeStatus === "IN_SCHOOL"
                        ? "재학"
                        : application.gradeStatus === "STOP_SCHOOL"
                        ? "휴학"
                        : application.gradeStatus === "GRADUATE"
                        ? "졸업"
                        : application.gradeStatus}
                    </Value>
                  </InfoItem>
                  <InfoItem>
                    <Label>학년 :</Label>
                    <Value>
                      {application.grade === "FIRST"
                        ? "1학년"
                        : application.grade === "SECOND"
                        ? "2학년"
                        : application.grade === "THIRD"
                        ? "3학년"
                        : application.grade === "FOURTH"
                        ? "4학년"
                        : application.grade}
                    </Value>
                  </InfoItem>
                  <InfoItem>
                    <Label>UMC 활동 경험 :</Label>
                    <Value>
                      {application.experience === "OB" ? "있음" : "없음"}
                    </Value>
                  </InfoItem>
                </InfoGrid>
              </Section>
            </PersonalInfoSection>

            <Divider />

            <Section>
              <InfoGrid>
                <InfoItem>
                  <Label>연락처 :</Label>
                  <Value>{application.phone}</Value>
                </InfoItem>
                <InfoItem>
                  <Label>디스코드 이메일 :</Label>
                  <Value>{application.discordEmail}</Value>
                </InfoItem>
                <InfoItem>
                  <Label>노션 이메일 :</Label>
                  <Value>{application.notionEmail}</Value>
                </InfoItem>
                <InfoItem>
                  <Label>UMC를 알게된 경로 :</Label>
                  <Value>{application.umcRoute}</Value>
                </InfoItem>
                <InfoItem>
                  <Label>활동 예정인 동아리 :</Label>
                  <Value>{application.currentClub}</Value>
                </InfoItem>
                <InfoItem>
                  <Label>스터디 리더를 희망하시나요?</Label>
                  <Value>
                    {application.leaderPreference === "YES" ? "예" : "아니요"}
                  </Value>
                </InfoItem>
                <InfoItem>
                  <Label>
                    서류 합격 시, 가능한 면접 일정을 모두 선택해주세요.
                  </Label>
                  <Value>
                    {[
                      application.firstInterviewDate &&
                        "3월 5일 (수) 18:00 ~ 22:00",
                      application.secondInterviewDate &&
                        "3월 6일 (목) 18:00 ~ 22:00",
                      application.thirdInterviewDate &&
                        "3월 7일 (금) 18:00 ~ 22:00",
                    ]
                      .filter(Boolean) // false인 값 제외
                      .join(", ")}
                  </Value>
                </InfoItem>
              </InfoGrid>
            </Section>

            <Divider />

            <Section>
              <SectionTitle>공통 질문</SectionTitle>
              {application.answers
                .filter((answer) => [0, 1, 2, 3].includes(answer.questionId)) // 0번부터 4번까지 공통 질문
                .map((answer) => (
                  <AnswerItem key={answer.answerId}>
                    <Question>{answer.questionText}</Question>
                    <Answer>{answer.answerText}</Answer>
                  </AnswerItem>
                ))}

              <AnswerItem>
                <Question>첨부파일</Question>
                <Answer>
                  <a
                    href={application.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "#2B9176",
                      textDecoration: "underline",
                    }}
                  >
                    {application.fileUrl}
                  </a>
                </Answer>
              </AnswerItem>
            </Section>

            <Divider />

            <Section>
              <SectionTitle>파트별 질문</SectionTitle>
              {application.answers
                .filter((answer) => [4, 5, 6, 7].includes(answer.questionId))
                .map((answer) => (
                  <AnswerItem key={answer.answerId}>
                    <Question>
                      {answer.questionId === 6 ? (
                        <>
                          3.{" "}
                          {application.part === "PM" &&
                            "UMC에서는 방학에 팀을 구성해 앱 런칭을 진행합니다. 개발하고 싶은 서비스를 구체적으로 서술해주세요."}
                          {application.part === "DESIGN" &&
                            "디자인 경험 유무와 '다룰 수 있는 툴 - 해당 툴에 대한 숙련도'를 쉼표로 구분하여 나열해 주세요."}
                          {(application.part === "SPRING" ||
                            application.part === "NODE" ||
                            application.part === "IOS" ||
                            application.part === "ANDROID" ||
                            application.part === "WEB") &&
                            "개발 경험 유무와 '개발 경험이 있는 언어 - 해당 언어에 대한 숙련도'를 쉼표로 구분하여 나열해 주세요."}
                        </>
                      ) : answer.questionId === 7 ? (
                        <>
                          4.{" "}
                          {application.part === "PM" &&
                            "희망 기획 플랫폼을 선택해주세요."}
                          {application.part === "DESIGN" &&
                            "사용하면서 불편함을 느꼈던 웹 또는 앱 서비스를 하나 선택해 문제점을 분석하고, 본인이 개선한다면 어떻게 디자인할지 구체적으로 서술해 주세요."}
                          {(application.part === "SPRING" ||
                            application.part === "NODE" ||
                            application.part === "IOS" ||
                            application.part === "ANDROID" ||
                            application.part === "WEB") &&
                            "시니어/주니어를 선택해주세요."}
                        </>
                      ) : (
                        answer.questionText
                      )}
                    </Question>
                    <Answer>{answer.answerText}</Answer>
                  </AnswerItem>
                ))}
            </Section>
          </ApplicationContent>
        )}
      </ModalContent>
    </ModalContainer>
  );
};

export default AdminModal;

const PersonalInfoSection = styled.div`
  display: flex;
  gap: 12.188rem;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3.688rem 7.375rem auto 7.375rem;
  z-index: 1;
`;

const ModalContent = styled.div`
  position: relative;
  background-color: white;
  border-radius: 1.25rem;
  max-width: 80rem;
  height: 70vh;
  overflow-y: auto;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 3.188rem;
  right: 3.781rem;
  background: none;
  border: none;
  cursor: pointer;
`;

const ApplicationContent = styled.div`
  padding: 3.688rem 6.375rem;
`;

const Section = styled.div`
  margin-bottom: 1.25rem;
`;

const SectionTitle = styled.h2`
  font-family: "Pretendard Variable";
  font-weight: 600;
  font-size: 1.063rem;
  line-height: 1.594rem;
  color: #2b9176;
  margin-bottom: 1.25rem;
`;

const InfoGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.938rem;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Label = styled.span`
  font-family: "Pretendard Variable";
  font-weight: 600;
  font-size: 1.063rem;
  line-height: 1.594rem;
  color: #000000;
`;

const Value = styled.span`
  font-family: "Pretendard Variable";
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.875rem;
  color: #000000;
`;

const Divider = styled.div`
  width: 54.813rem;
  height: 0;
  border: 0.094rem solid #e1e9ea;
  margin: 2.188rem 0;
`;

const AnswerItem = styled.div`
  margin-bottom: 2.188rem;
`;

const Question = styled.div`
  font-family: "Pretendard Variable";
  font-weight: 600;
  font-size: 1.063rem;
  line-height: 150%;
  color: #000000;
  margin-bottom: 0.875rem;
`;

const Answer = styled.div`
  font-family: "Pretendard Variable";
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.875rem;
  color: #000000;
  white-space: pre-wrap;
  word-break: break-all;
  word-wrap: break-word;
`;
