import styled from "styled-components";
import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import Title from "../../components/apply/intro/Title";
import Verification from "../apply/intro/Verification";
import PersonalInfo from "../apply/intro/PersonalInfo";
import ApplicationAgree from "./ApplicationAgree";
import ApplicationCommon from "./ApplicationCommon";
import ApplicationPart from "./ApplicationPart";
import warning from "../../assets/icons/Warning.svg";
import check from "../../assets/icons/Check.svg";
import Modal from "../../components/application/Modal";
import ToastPopup from "../../components/application/ToastPopup";
import { useEmail } from "../../contexts/EmailContext";

const ApplicationContent = styled.div`
  margin: 5rem 12.3rem 14rem 12.3rem;
  margin-bottom: 14rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Button = styled.button`
  display: flex;
  width: 10rem;
  height: 3.75rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.75rem;
  border: 0.063rem solid #2b9176;
  background: #5fbda1;

  font-family: "Pretendard Variable";
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.875rem; /* 150% */

  background-color: ${(props) => (props.disabled ? "#E1E9EA" : "#5fbda1;")};
  color: ${(props) => (props.disabled ? "#A2ABAB" : "#fff")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  border:0.063rem solid;
  border-color:${(props) => (props.disabled ? "#ccc" : "#2b9176;")}

  &:hover {
    border-radius: 0.75rem;
    border: 0.094rem solid #2b9176;
    background: #67b299;
  }
`;

const ModalWrapper = styled.div`
  display: flex;
  width: 43.25rem;
  height: 17.25rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  border-radius: 0.75rem;
  border: 0.063rem solid #e1e9ea;
  background: #fcffff;
`;

const ModalImg = styled.img`
  width: 2.25rem;
  height: 2.25rem;
`;

const ModalText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const ModalTitle = styled.div`
  color: #1d201e;
  text-align: center;
  font-family: "Pretendard Variable";
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 600;
  line-height: 135%; /* 2.025rem */
  letter-spacing: -0.015rem;
`;

const ModalDetail = styled.div`
  color: #1d201e;
  text-align: center;
  font-family: "Pretendard Variable";
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 1.5rem */
`;

const ModalButton = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 0.5rem;
`;

const Cancel = styled.button`
  display: flex;
  width: 4.375rem;
  height: 3rem;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  background: none;
  border-radius: 0.75rem;
  border: 0.094rem solid #edf4f5;

  color: #818989;
  font-family: "Pretendard Variable";
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: 145%; /* 1.26875rem */
  letter-spacing: 0.00875rem;
`;

const Submit = styled.button`
  display: flex;
  width: 4.375rem;
  height: 3rem;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  border-radius: 0.75rem;
  background: #5fbda1;
  border: none;

  color: #fff;
  font-family: "Pretendard Variable";
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: 145%; /* 1.26875rem */
  letter-spacing: 0.00875rem;

  &:hover {
    border: 0.094rem solid #2b9176;
    background: #67b299;
  }
`;

const ModalHomeButton = styled.button`
  display: flex;
  width: 6.56rem;
  height: 3rem;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  background: none;
  border-radius: 0.75rem;
  border: 0.094rem solid #edf4f5;

  color: #818989;
  font-family: "Pretendard Variable";
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: 145%; /* 1.26875rem */
  letter-spacing: 0.00875rem;
`;

const ToastWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 1rem;
  right: 1rem;
  bottom: 5rem;
`;

const ApplicationPage = () => {
  // 제출 모달창 open 상태 관리
  const [open, setOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [failOpen, setFailOpen] = useState(false);
  const handleHomeClick = () => {
    setSuccessOpen(false); // 모달 닫기
    // navigate("/"); // 홈으로 이동
    window.location.href = "/";
  };

  const { authenticatedEmail, emailAuthStatus } = useEmail();

  const [charCounts, setCharCounts] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    5: 0,
  }); // 글자수 카운트

  // applicantDTO, file 상태 관리
  const [applicantDTO, setApplicantDTO] = useState({
    name: "",
    nickName: "",
    email: authenticatedEmail,
    phone: "",
    gender: "",
    birth: "",
    studentId: "",
    major: "",
    grade: "",
    gradeStatus: "",
    experience: "",
    umcRoute: "",
    currentClub: "",
    discordEmail: "",
    notionEmail: "",
    part: "",
    leaderPreference: "",
    answers: [],
  });

  useEffect(() => {
    if (authenticatedEmail) {
      setApplicantDTO((prev) => ({
        ...prev,
        email: authenticatedEmail,
      }));
    }
  }, [authenticatedEmail]);

  const [fileDTO, setFileDTO] = useState(null);

  // PersonalInfo에서 사용할 함수(applicantDTO)
  const updateApplicantDTO = (key, value) => {
    setApplicantDTO({ ...applicantDTO, [key]: value });
  };

  // applicantDTO 중 answer 관리할 함수
  const updateAnswer = (questionId, answerText) => {
    setApplicantDTO((prevDTO) => {
      const updatedAnswers = prevDTO.answers.filter(
        (answer) => answer.questionId !== questionId
      );
      updatedAnswers.push({ questionId, answerText });
      return { ...prevDTO, answers: updatedAnswers };
    });
  };

  // ApplicationCommon, ApplicationPart에서 사용할 함수
  const handleAnswerChange = (questionId, e) => {
    updateAnswer(questionId, e.target.value);

    // 해당 questionId의 글자수만 업데이트
    if (
      questionId === 0 ||
      questionId === 1 ||
      questionId === 2 ||
      questionId === 3 ||
      questionId === 5 ||
      questionId === 6 ||
      questionId === 7
    ) {
      setCharCounts((prev) => ({
        ...prev,
        [questionId]: e.target.value.length,
      }));
    }
  };

  // 토스트 팝업 띄울 때 필요한 "누락된 항목" 상태 관리
  const [toast, setToast] = useState(false);
  // 토스트 팝업 내용 상태 관리
  const [title, setTitle] = useState("");
  const [missingField, setMissingField] = useState("");
  // 지원서 PersonalInfo 모두 채웠는지 검증 위한 필드
  const personalInfoFields = [
    { field: "name", text: "이름" },
    { field: "birth", text: "생년월일" },
    { field: "gender", text: "성별" },
    { field: "nickName", text: "닉네임" },
    { field: "studentId", text: "학번" },
    { field: "gradeStatus", text: "재학 여부" },
    { field: "major", text: "학과" },
    { field: "grade", text: "학년" },
    { field: "experience", text: "UMC 활동 경험" },
    { field: "phone", text: "연락처" },
    { field: "discordEmail", text: "디스코드 사용 이메일" },
    { field: "notionEmail", text: "노션 사용 이메일" },
    { field: "umcRoute", text: "UMC를 알게 된 경로" },
    { field: "currentClub", text: "현재 활동 중이거나 활동 예정인 동아리" },
    { field: "leaderPreference", text: "스터디 리더를 희망하시나요?" },
  ];
  const refs = {
    email: useRef(null), // 이메일도 추가
    name: useRef(null),
    nickName: useRef(null),
    birth: useRef(null),
    gender: useRef(null),
    studentId: useRef(null),
    gradeStatus: useRef(null),
    major: useRef(null),
    grade: useRef(null),
    experience: useRef(null),
    phone: useRef(null),
    discordEmail: useRef(null),
    notionEmail: useRef(null),
    umcRoute: useRef(null),
    currentClub: useRef(null),
    leaderPreference: useRef(null),
  };
  // 지원서 질문에 대한 답변 모두 채웠는지 검증 위한 필드
  const questionFields = [
    { questionId: 0, text: "공통 질문 1번" },
    { questionId: 1, text: "공통 질문 2번" },
    { questionId: 2, text: "공통 질문 3번" },
    { questionId: 3, text: "공통 질문 5번" },
    { questionId: 4, text: "파트별 질문 1번" },
    { questionId: 5, text: "파트별 질문 2번" },
    { questionId: 6, text: "파트별 질문 3번" }
  ];
  const questionRefs = useRef(
    questionFields.map(() => React.createRef()) // 각 질문에 대한 ref 생성
  );
  // 누락된 항목으로 스크롤
  const scrollToField = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      ref.current.focus();
    }
  };
  // 누락된 항목 있는지 검증 및 토스트 팝업 메세지 return
  const validateForm = () => {
    // PersonalInfo 검증
    for (const field of personalInfoFields) {
      if (
        !applicantDTO[field.field] ||
        applicantDTO[field.field].trim() === ""
      ) {
        setTitle("모든 항목에 내용을 작성해주세요");
        scrollToField(refs[field.field]);
        return `${field.text} 항목에 대한 내용이 누락되었습니다.`;
      }
    }

    // answers 검증
    for (const question of questionFields) {
      // 필수 항목이 아닌 질문은 넘어가기
      if (question.questionId === 3) {
        continue;
      }
      const answer = applicantDTO.answers.find(
        (ans) => ans.questionId === question.questionId
      );
      if (!answer || !answer.answerText.trim()) {
        setTitle("모든 항목에 내용을 작성해주세요");
        scrollToField(questionRefs.current[question.questionId]);
        return `${question.text}에 대한 답변이 누락되었습니다.`;
      }
    }

    // 이메일 인증 상태 검증
    if (!emailAuthStatus) {
      setTitle("이메일 인증이 필요합니다");
      scrollToField(refs.email); // 이메일 인증 섹션으로 스크롤
      return "이메일 인증을 완료해주세요";
    }

    // 동의 항목 검증
    if (!information) {
      setTitle("모든 약관 항목에 동의해주세요");
      scrollToField(agreeRefs.infoRef);
      return "개인정보 수집 및 이용 동의 항목에 동의해주세요";
    }
    if (!passion) {
      setTitle("모든 약관 항목에 동의해주세요");
      scrollToField(agreeRefs.passionRef);
      return "UMC에서 열정적으로 활동할 것을 동의해주세요";
    }

    return null; // 모든 검증 통과
  };

  // 지원서 페이지의 제출하기 버튼 함수
  const submitButtonClick = () => {
    if (validateForm()) {
      setMissingField(validateForm());
      setToast(true);
      return;
    } else {
      console.log("안 채운 항목 없음");
      setOpen(true);
      return;
    }
  };

  // post 요청 코드
  const apiUrl = process.env.REACT_APP_API_URL;
  const handleSubmit = async () => {
    // answers 배열을 applicantDTO에 추가
    applicantDTO.answers = applicantDTO.answers.map((answer) => ({
      questionId: answer.questionId,
      answerText: answer.answerText,
    }));

    // formData 생성
    const formData = new FormData();
    const blob = new Blob([JSON.stringify(applicantDTO)], {
      type: "application/json",
    });
    formData.append("applicantDTO", blob);
    if (fileDTO) {
      formData.append("file", fileDTO);
    }

    console.log(applicantDTO);
    console.log(JSON.stringify(applicantDTO));
    for (const x of formData.entries()) {
      console.log(x);
    }
    const reader = new FileReader();
    reader.onload = function (event) {
      console.log("applicantDTO 내용:", event.target.result); // Blob 내용을 출력
    };
    reader.readAsText(blob); // Blob을 텍스트로 읽기

    // post 요청
    try {
      const response = await axios.post(`${apiUrl}/applicant/apply`, formData);
      console.log("지원서 제출 서버 응답: ", response.data);
      setOpen(false);
      setSuccessOpen(true);
    } catch (e) {
      console.log("지원서 제출 에러 발생: ", e);
      alert("지원서 제출 실패");
      setOpen(false);
    }
  };

  // 약관 동의 여부 상태 관리
  const [information, setInformation] = useState(false);
  const [passion, setPassion] = useState(false);
  const updateAgreeChange = (information, passion) => {
    setInformation(information);
    setPassion(passion);
  };
  const agreeRefs = {
    infoRef: useRef(null),
    passionRef: useRef(null),
  };

  return (
    <ApplicationContent>
      <Title />
      <Verification emailRefs={refs.email} />
      <PersonalInfo
        applicantDTO={applicantDTO}
        updateApplicantDTO={updateApplicantDTO}
        refs={refs}
      />

      <ApplicationCommon
        handleAnswerChange={handleAnswerChange}
        setFileDTO={setFileDTO}
        charCounts={charCounts}
        refs={questionRefs.current}
      />
      <ApplicationPart
        updateApplicantDTO={updateApplicantDTO}
        handleAnswerChange={handleAnswerChange}
        charCounts={charCounts}
        refs={questionRefs.current}
      />

      <ApplicationAgree
        updateAgreeChange={updateAgreeChange}
        refs={agreeRefs}
      />

      <ButtonWrapper>
        <Button type="submit" onClick={submitButtonClick}>
          제출
        </Button>
        <Modal isOpen={open} onClose={() => setOpen(false)}>
          <ModalWrapper>
            <ModalImg src={warning} />
            <ModalText>
              <ModalTitle>제출을 완료하시겠습니까?</ModalTitle>
              <ModalDetail>제출한 내용은 수정할 수 없습니다.</ModalDetail>
            </ModalText>
            <ModalButton>
              <Cancel onClick={() => setOpen(false)}>취소</Cancel>
              <Submit onClick={() => handleSubmit()}>제출</Submit>
            </ModalButton>
          </ModalWrapper>
        </Modal>
        <Modal isOpen={successOpen} onClose={() => setSuccessOpen(false)}>
          <ModalWrapper>
            <ModalImg src={check} />
            <ModalText>
              <ModalTitle>제출이 완료되었습니다!</ModalTitle>
              <ModalDetail>지원해주셔서 감사합니다.</ModalDetail>
            </ModalText>
            <ModalHomeButton onClick={handleHomeClick}>
              홈으로 이동
            </ModalHomeButton>
          </ModalWrapper>
        </Modal>
        <Modal isOpen={failOpen} onClose={() => setFailOpen(false)}>
          <ModalWrapper>
            <ModalImg src={warning} />
            <ModalText>
              <ModalTitle>제출에 실패했습니다</ModalTitle>
              <ModalDetail>인증되지 않은 사용자입니다</ModalDetail>
            </ModalText>
            <ModalHomeButton onClick={handleHomeClick}>
              홈으로 이동
            </ModalHomeButton>
          </ModalWrapper>
        </Modal>
      </ButtonWrapper>

      <ToastWrapper>
        {toast && (
          <ToastPopup
            setToast={setToast}
            title={title}
            message={missingField}
          />
        )}
      </ToastWrapper>
    </ApplicationContent>
  );
};

export default ApplicationPage;
