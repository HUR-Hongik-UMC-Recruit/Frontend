import { useState } from "react";
import styled from "styled-components";
import upload from "../../assets/icons/FileUpload.svg";
import close from "../../assets/icons/FileClose.svg";

const CommonContainer = styled.div`
  width: 100%;
  margin-top: 5rem;
`;

const CommonTitle = styled.div`
  color: #2b9176;
  font-family: "Pretendard Variable";
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 575;
  line-height: 1.875rem; /* 125% */
`;

const CommonBorder = styled.div`
  height: 0.1875rem;
  background: #e1e9ea;
  margin: 1rem 0rem 1.5rem 0rem;
`;

const QuestionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-bottom: 4rem;
`;

const Question = styled.label`
  color: #1d201e;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.875rem; /* 150% */
`;

const RadioWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  border-radius: 0.75rem;
  border: 0.094rem solid #d1dadb;
  background: #fcffff;

  position: relative;
  cursor: pointer;

  font-family: "Pretendard Variable";
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.875rem; /* 187.5% */

  &:hover {
    border: 0.094rem solid #2b9176;
    background: #b1e9d6;
  }
`;

const AnswerBig = styled.textarea`
  font-family: "Pretendard Variable";
  width: 100%;
  height: 15.063rem;
  padding: 0.938rem 1.125rem;
  padding-bottom: 2.5rem;
  background: #fcffff;
  border: 0.094rem solid #d1dadb;
  border-radius: 0.75rem;
  resize: none;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.875rem;
  color: #353838;
  box-sizing: border-box;

  &::placeholder {
    color: #818989;
  }

  &:hover {
    border: 0.094rem solid #2b9176;
  }

  &:focus {
    border: 0.094rem solid #2b9176;
    outline: none;
    caret-color: #2b9176;
  }
`;

const Guide = styled.div`
  color: #2b9176;
  font-family: "Pretendard Variable";
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;

  line-height: 1.875rem;
`;

const AnswerSmall = styled.textarea`
  height: 1.88rem;
  padding: 0.9375rem 1.4375rem;
  background: #fcffff;
  border: 0.094rem solid #d1dadb;
  border-radius: 0.75rem;
  resize: none;
  font-family: "Pretendard Variable";
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.875rem; /* 187.5% */
  color: #353838;

  &::placeholder {
    color: #818989;
  }

  &:hover {
    border: 0.094rem solid #2b9176;
  }

  &:focus {
    border: 0.094rem solid #2b9176;
    outline: none;
    caret-color: #2b9176;
  }
`;

const FileWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  align-items: center;
`;

const FileInput = styled.label`
  display: flex;
  width: 23.3125rem;
  height: 6.375rem;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;

  cursor: pointer;

  border-radius: 0.75rem;
  border: 0.094rem dashed #a2abab;
  background: #fcffff;

  color: #818989;
  font-family: "Pretendard Variable";
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.875rem; /* 150% */
`;

const UploadedFile = styled.div`
  display: flex;
  gap: 1.5rem;
  width: 23.3125rem;
  height: 6.375rem;
  align-items: center;
  justify-content: center;
  border-radius: 0.75rem;
  border: 0.094rem solid #d1dadb;
  background: #fcffff;
`;

const FileInfo = styled.div`
  color: #353838;
  font-size: 1.2rem;
  font-weight: 500;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

const CountText = styled.span`
  position: absolute;
  right: 1.125rem;
  bottom: 1rem;
  color: #818989;
  font-size: 1rem;
`;

const AnswerWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const ApplicationCommon = ({
  handleAnswerChange,
  setFileDTO,
  charCounts,
  refs,
}) => {
  // 파일 첨부
  const [file, setFile] = useState(null);
  const handleFileChange = (e) => {
    if (e?.target?.files) {
      // 파일 용량 10MB로 제한하기
      const maxSize = 10 * 1024 * 1024;
      const fileSize = e.target.files[0]?.size;
      if (fileSize > maxSize) {
        alert("첨부 파일 사이즈는 5MB 이내로 등록 가능합니다.");
        return;
      }
      setFile(e.target.files[0]);
      setFileDTO(e.target.files[0]);
      console.log(e.target.files[0]);
    }
  };
  // 파일 삭제
  const handleDeleteFile = () => {
    setFile(null);
  };

  return (
    <CommonContainer>
      <CommonTitle>공통 질문</CommonTitle>

      <CommonBorder />

      <QuestionWrapper>
        <Question>
          1. UMC 지원 동기와 UMC 활동을 통해 기대하는 바를 서술해주세요.
        </Question>
        <AnswerWrapper>
          <AnswerBig
            type="text"
            placeholder="500자 이하로 얘기해주세요"
            onChange={(e) => handleAnswerChange(0, e)}
            maxLength={500}
            ref={refs[0]}
          />
          <CountText>{charCounts[0] || 0}/500자</CountText>
        </AnswerWrapper>
      </QuestionWrapper>

      <QuestionWrapper>
        <Question>2. 본인의 장단점에 대해 서술해주세요.</Question>
        <AnswerWrapper>
          <AnswerBig
            type="text"
            placeholder="500자 이하로 얘기해주세요"
            onChange={(e) => handleAnswerChange(1, e)}
            maxLength={500}
            ref={refs[1]}
          />
          <CountText>{charCounts[1] || 0}/500자</CountText>
        </AnswerWrapper>
      </QuestionWrapper>

      <QuestionWrapper>
        <Question>3. UMC에 임하는 각오를 서술해주세요.</Question>
        <AnswerWrapper>
          <AnswerBig
            type="text"
            placeholder="500자 이하로 얘기해주세요"
            onChange={(e) => handleAnswerChange(2, e)}
            maxLength={500}
            ref={refs[2]}
          />
          <CountText>{charCounts[2] || 0}/500자</CountText>
        </AnswerWrapper>
      </QuestionWrapper>

      <QuestionWrapper>
        <Question>
          4. UMC는 학기 중에 배운 것을 바탕으로 방학 동안 팀을 구성해 앱 런칭을
          진행합니다. 실제로 어떤 서비스를 개발하고 싶은지 서술해주세요.
        </Question>
        <AnswerWrapper>
          <AnswerBig
            type="text"
            placeholder="500자 이하로 얘기해주세요"
            onChange={(e) => handleAnswerChange(3, e)}
            maxLength={500}
            ref={refs[3]}
          />
          <CountText>{charCounts[3] || 0}/500자</CountText>
        </AnswerWrapper>
      </QuestionWrapper>

      <QuestionWrapper>
        <Question>
          5. (포트폴리오 첨부) 협업하면서 어려웠던 점과 협업을 어떻게
          진행했는지, 해당 프로젝트를 진행한 이유와 프로젝트 내 나의 파트 등을
          자세하게 서술해주세요. 디자인 혹은 협업 경험이 없는 경우 자기소개서를
          제출하셔도 괜찮습니다.
        </Question>
        <FileWrapper>
          {!file ? (
            <>
              <FileInput htmlFor="file">
                <img
                  src={upload}
                  alt="upload"
                  style={{ height: "1.75rem", width: "1.75rem" }}
                />
                <input
                  type="file"
                  accept="application/pdf"
                  id="file"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
                파일 첨부
              </FileInput>
            </>
          ) : (
            <UploadedFile>
              <FileInfo>{file.name}</FileInfo>
              <DeleteButton onClick={handleDeleteFile}>
                <img
                  src={close}
                  alt="close"
                  style={{ height: "1.75rem", width: "1.75rem" }}
                />
              </DeleteButton>
            </UploadedFile>
          )}
          <Guide>
            하나의 PDF 파일로 병합 후 제출 부탁드립니다.
            <br />
            최대 파일 크기는 10MB입니다.
          </Guide>
        </FileWrapper>
      </QuestionWrapper>

      <QuestionWrapper>
        <Question>6. 본인의 경험을 드러낼수 있는 링크를 첨부해주세요.</Question>
        <AnswerSmall
          type="text"
          placeholder="예) 깃허브, 노션, 기술블로그"
          onChange={(e) => handleAnswerChange(4, e)}
          ref={refs[4]}
        />
      </QuestionWrapper>
    </CommonContainer>
  );
};

export default ApplicationCommon;
