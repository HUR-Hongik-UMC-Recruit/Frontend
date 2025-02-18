import React, { useState } from "react";
import Select from "../../../components/apply/intro/Select";
import styled from "styled-components";

import {
  Section,
  ContentWrapper,
  SectionTitle,
  Divider,
  FormGroup,
  Label,
  RequiredDot,
  Input,
  Grid,
  RadioGroup,
  RadioButton,
  InfoText,
  FormItem,
} from "../../../components/apply/intro/SectionStyles";
import { Radio } from "lucide-react";

const PersonalInfo = ({ applicantDTO, updateApplicantDTO, refs }) => {
  // 재학 상태
  const [status, setStatus] = useState("");
  const [grade, setGrade] = useState("");
  const [experience, setExperience] = useState("");

  // 성별 라디오 버튼 상태 관리
  const [selectedGender, setSelectedGender] = useState("");

  // 스터디 리더
  const [selectedLeader, setSelectedLeader] = useState("");

  // 면접 일정
  const [selectedInterview, setSelectedInterview] = useState({
    firstInterviewDate: false,
    secondInterviewDate: false,
    thirdInterviewDate: false,
  });

  // 라디오 버튼 클릭 핸들러
  const handleGenderClick = (option) => {
    const genderMap = {
      남: "MALE",
      여: "FEMALE",
    };
    setSelectedGender(option);
    updateApplicantDTO("gender", genderMap[option]);
  };

  // 스터디리더 희망 라디오 버튼 핸들러
  const handleLeaderClick = (option) => {
    const leaderMap = {
      예: "YES",
      아니요: "NO",
    };
    setSelectedLeader(option);
    updateApplicantDTO("leaderPreference", leaderMap[option]);
  };

  // 면접 일정 라디오 버튼 핸들러
  const handleInterviewClick = (option) => {
    console.log("option: ", option);
    const updatedOptions = {
      ...selectedInterview,
      [option]: !selectedInterview[option], // 선택된 날짜의 불리언 값 반대로 업뎃
    };

    setSelectedInterview(updatedOptions);

    // updateApplicantDTO("firstInterviewDate", updatedOptions.firstInterviewDate);
    // updateApplicantDTO("secondInterviewDate", updatedOptions.secondInterviewDate);
    // updateApplicantDTO("thirdInterviewDate", updatedOptions.thirdInterviewDate);
    console.log("선택된 값: ", updatedOptions);
    Object.entries(updatedOptions).map(([key, value]) => {
      console.log(`전송되는 데이터 - key: ${key}, value: ${value}`);
      updateApplicantDTO(key, value);
    });

    console.log("선택된 값: ", updatedOptions);
    console.log("서버로 전송 ", updateApplicantDTO);
  };

  return (
    <Section>
      <ContentWrapper>
        <SectionTitle>기본 인적사항</SectionTitle>
        <Divider />

        {/* 이름, 생년월일, 성별 */}
        <Grid>
          <FormGroup>
            <Label>
              이름 <RequiredDot />
            </Label>
            <Input
              type="text"
              placeholder="유엠씨"
              value={applicantDTO.name}
              onChange={(e) => updateApplicantDTO("name", e.target.value)}
              ref={refs.name}
            />
          </FormGroup>

          <FormGroup>
            <Label>
              생년월일 <RequiredDot />
            </Label>
            <Input
              type="text"
              placeholder="YYYY-MM-DD"
              value={applicantDTO.birth}
              onChange={(e) => updateApplicantDTO("birth", e.target.value)}
              ref={refs.birth}
            />
          </FormGroup>

          <FormGroup>
            <Label>
              성별 <RequiredDot />
            </Label>
            <RadioGroup ref={refs.gender}>
              <RadioButton
                $active={selectedGender === "남"}
                onClick={() => handleGenderClick("남")}
              >
                남
              </RadioButton>

              <RadioButton
                $active={selectedGender === "여"}
                onClick={() => handleGenderClick("여")}
              >
                여
              </RadioButton>
            </RadioGroup>
          </FormGroup>
        </Grid>

        {/* 닉네임, 학번, 재학 여부 */}
        <Grid>
          <FormGroup>
            <Label>
              닉네임 <RequiredDot />
            </Label>
            <FormItem>
              <Input
                type="text"
                placeholder="예) 밍밍"
                value={applicantDTO.nickName}
                onChange={(e) => updateApplicantDTO("nickName", e.target.value)}
                ref={refs.nickName}
              />
              <InfoText>사용할 닉네임을 적어주세요!</InfoText>
            </FormItem>
          </FormGroup>

          <FormGroup>
            <Label>
              학번 <RequiredDot />
            </Label>
            <Input
              type="text"
              placeholder="C123456"
              value={applicantDTO.studentId}
              onChange={(e) => updateApplicantDTO("studentId", e.target.value)}
              ref={refs.studentId}
            />
          </FormGroup>

          <FormGroup>
            <Label>
              재학 여부 <RequiredDot />
            </Label>
            <Select
              options={["재학", "휴학", "졸업"]}
              defaultValue="재학 여부 선택"
              value={status}
              onChange={(e) => {
                const statusMap = {
                  재학: "IN_SCHOOL",
                  휴학: "STOP_SCHOOL",
                  졸업: "GRADUATE",
                };
                setStatus(e);
                updateApplicantDTO("gradeStatus", statusMap[e]); // 상태에 따라 적절한 값으로 업데이트
              }}
              type="status"
              ref={refs.gradeStatus}
            />
          </FormGroup>
        </Grid>

        {/* 학과, 학년, UMC 활동 경험 */}
        <Grid>
          <FormGroup>
            <Label>
              학과 <RequiredDot />
            </Label>
            <Input
              type="text"
              placeholder="컴퓨터공학과"
              value={applicantDTO.major}
              onChange={(e) => updateApplicantDTO("major", e.target.value)}
              ref={refs.major}
            />
          </FormGroup>

          <FormGroup>
            <Label>
              학년 <RequiredDot />
            </Label>
            <FormItem>
              <Select
                options={["1학년", "2학년", "3학년", "4학년"]}
                defaultValue="학년 선택"
                value={grade}
                onChange={(e) => {
                  const statusMap = {
                    "1학년": "FIRST",
                    "2학년": "SECOND",
                    "3학년": "THIRD",
                    "4학년": "FOURTH",
                  };
                  setGrade(e);
                  updateApplicantDTO("grade", statusMap[e]); // 상태에 따라 적절한 값으로 업데이트
                }}
                type="grade"
                ref={refs.grade}
              />
              <InfoText>2학년을 마치고 휴학한 경우 '2학년 휴학' 선택</InfoText>
            </FormItem>
          </FormGroup>

          <FormGroup>
            <Label>
              UMC 활동 경험 <RequiredDot />
            </Label>
            <Select
              options={["없음", "있음"]}
              defaultValue="활동 경험 선택"
              value={experience}
              onChange={(e) => {
                const statusMap = {
                  없음: "YB",
                  있음: "OB",
                };
                setExperience(e);
                updateApplicantDTO("experience", statusMap[e]); // 상태에 따라 적절한 값으로 업데이트
              }}
              type="experience"
              ref={refs.experience}
            />
          </FormGroup>
        </Grid>

        {/* 연락처 */}
        <FormGroup>
          <Label>
            연락처 <RequiredDot />
          </Label>
          <Input
            type="tel"
            placeholder="010-0000-0000"
            value={applicantDTO.phone}
            onChange={(e) => updateApplicantDTO("phone", e.target.value)}
            ref={refs.phone}
          />
        </FormGroup>

        {/* 디스코드 사용 이메일 */}
        <FormGroup>
          <Label>
            디스코드 (Discord) 사용 이메일 <RequiredDot />
          </Label>
          <Input
            type="email"
            placeholder="example123@gmail.com"
            value={applicantDTO.discordEmail}
            onChange={(e) => updateApplicantDTO("discordEmail", e.target.value)}
            ref={refs.discordEmail}
          />
        </FormGroup>

        {/* 노션 사용 이메일 */}
        <FormGroup>
          <Label>
            노션 (Notion) 사용 이메일 <RequiredDot />
          </Label>
          <Input
            type="email"
            placeholder="example123@gmail.com"
            value={applicantDTO.notionEmail}
            onChange={(e) => updateApplicantDTO("notionEmail", e.target.value)}
            ref={refs.notionEmail}
          />
        </FormGroup>

        {/* UMC를 알게된 경로 */}
        <FormGroup>
          <Label>
            UMC를 알게된 경로 <RequiredDot />
          </Label>
          <Input
            type="text"
            placeholder="예) 에브리타임, 인스타그램, 지인 등"
            value={applicantDTO.umcRoute}
            onChange={(e) => updateApplicantDTO("umcRoute", e.target.value)}
            ref={refs.umcRoute}
          />
        </FormGroup>

        {/* 현재 활동 중이거나 활동 예정인 동아리 */}
        <FormGroup>
          <Label>
            현재 활동 중이거나 활동 예정인 동아리 (UMC 제외) <RequiredDot />
          </Label>
          <Input
            type="text"
            placeholder="과 내 학술 소모임 1개"
            value={applicantDTO.currentClub}
            onChange={(e) => updateApplicantDTO("currentClub", e.target.value)}
            ref={refs.currentClub}
          />
        </FormGroup>

        <FormGroup>
          <Label>
            스터디 리더를 희망하시나요?
            <RequiredDot />
          </Label>
          <InfoText>
            스터디 리더란 매주 진행되는 스터디의 리더를 의미합니다. 선수 지식이
            있지 않아도 열심히 공부할 열정과 책임감이 있다면 스터디 리더 지원이
            가능합니다.{"\n"}
            이후에 스터디 리더 지원을 따로 받을 예정이며, 스터디 리더 확정이
            아니니 부담가지지 않으셔도 됩니다.
          </InfoText>

          <Grid>
            <RadioGroup ref={refs.leaderPreference}>
              <RadioButton
                $active={selectedLeader === "예"}
                onClick={() => handleLeaderClick("예")}
              >
                예
              </RadioButton>

              <RadioButton
                $active={selectedLeader === "아니요"}
                onClick={() => handleLeaderClick("아니요")}
              >
                아니요
              </RadioButton>
            </RadioGroup>
          </Grid>
        </FormGroup>

        {/* 면접 일정 추가  */}

        <FormGroup>
          <Label>
            서류 합격 시, 가능한 면접 일정을 모두 선택해주세요.
            <RequiredDot />
          </Label>

          <StyledGrid>
            <RadioGroup ref={refs.interviewDate}>
              <StyledRadioButton
                style={{ width: "100px" }}
                $active={selectedInterview.firstInterviewDate}
                onClick={() => handleInterviewClick("firstInterviewDate")}
              >
                3월 5일 (수) 18:00 ~ 22:00
              </StyledRadioButton>

              <StyledRadioButton
                $active={selectedInterview.secondInterviewDate}
                onClick={() => handleInterviewClick("secondInterviewDate")}
              >
                3월 6일 (목) 18:00 ~ 22:00
              </StyledRadioButton>

              <StyledRadioButton
                $active={selectedInterview.thirdInterviewDate}
                onClick={() => handleInterviewClick("thirdInterviewDate")}
              >
                3월 7일 (금) 18:00 ~ 22:00
              </StyledRadioButton>
            </RadioGroup>
          </StyledGrid>
        </FormGroup>
      </ContentWrapper>
    </Section>
  );
};

export default PersonalInfo;

const StyledRadioButton = styled(RadioButton)`
  max-width: 20rem !important;
`;
const StyledGrid = styled(Grid)`
  display: flex;
  flex-direction: column;
`;
