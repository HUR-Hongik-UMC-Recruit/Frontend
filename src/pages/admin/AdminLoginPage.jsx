import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import { useAuth } from "../../contexts/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

const AdminLoginPage = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const apiUrl = process.env.REACT_APP_API_URL;

  const loginButtonClick = async () => {
    const formData = new FormData();
    formData.append("username", id);
    formData.append("password", password);

    try {
      const response = await axios.post(`${apiUrl}/login`, formData, {
        withCredentials: true,
      });

      if (response.data.isSuccess) {
        console.log("로그인 성공:", response.data);
        login();
        const redirectPath = location.state?.from?.pathname || "/admin";
        navigate(redirectPath, { replace: true });
      } else {
        alert(response.data.message);
      }
    } catch (e) {
      console.log("로그인 실패:", e);
      alert(e.response?.data?.message || "로그인에 실패했습니다");
    }
  };

  // 로그인버튼 활성화
  const isLoginDisabled = !id || !password;

  return (
    <ContentWrapper>
      <Title>UMC ADMIN</Title>

      <Form>
        <IdForm>
          <Label>ID</Label>
          <InputWrapper>
            <Input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="아이디를 입력해주세요"
            />
          </InputWrapper>
        </IdForm>

        <PasswordForm>
          <Label>PW</Label>
          <InputWrapper>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="패스워드를 입력해주세요"
            />
          </InputWrapper>
        </PasswordForm>

        <LoginBtn onClick={loginButtonClick} disabled={isLoginDisabled}>
          로그인하기
        </LoginBtn>

        <LinkText href="/join">회원가입</LinkText>
      </Form>
    </ContentWrapper>
  );
};

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;

const Title = styled.div`
  color: #1d201e;
  font-family: "Pretendard Variable";
  font-size: 2.25rem;
  font-style: normal;
  font-weight: 600;
  line-height: 135%;
  letter-spacing: -0.0225rem;
  margin-bottom: 4.5rem;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  width: 29.6875rem;
`;

const Label = styled.label`
  color: #5c6161;
  font-family: "Pretendard Variable";
  font-size: 1.0625rem;
  font-style: normal;
  font-weight: 550;
  line-height: 145%;
  margin-bottom: 0.75rem;
`;

const IdForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 2rem 3rem 2rem;
`;

const PasswordForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 2rem 3rem 2rem;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 25.6875rem;
  height: 2rem;
`;

const Input = styled.input`
  width: 100%;
  height: 2rem;
  font-family: "Pretendard Variable";
  font-style: normal;
  font-weight: 400;
  font-size: 1rem;
  line-height: 150%;
  color: #818989;
  border: none;
  border-bottom: 0.10625rem solid #a2abab;
  padding-bottom: 0.5rem;
  background: transparent;

  &::placeholder {
    color: #818989;
  }

  &:focus {
    outline: none;
    border-bottom-color: #90e6c9;
  }
`;

const LoginBtn = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 26.5rem;
  height: 4rem;
  border-radius: 0.625rem;
  border: 0.0625rem solid;
  color: #353838;
  background: transparent;
  margin: 0 auto 2rem auto;

  font-family: "Pretendard Variable";
  font-style: normal;
  font-weight: 550;
  font-size: 1.375rem;
  line-height: 135%;
  letter-spacing: -0.01em;

  cursor: ${(props) => (props.disabled ? "" : "pointer")};
  border-color: ${(props) => (props.disabled ? "#818989" : "#90E6C9;")};

  &:hover {
    background: ${(props) => (props.disabled ? "" : "#90e6c9;")};
    border-color: ${(props) => (props.disabled ? "" : "#2b9176;")};
    color: ${(props) => (props.disabled ? "" : "#fff")};
  }
`;

const LinkText = styled.a`
  font-family: "Pretendard Variable";
  font-style: normal;
  font-weight: 400;
  font-size: 0.8125rem;
  line-height: 138%;
  letter-spacing: 0.01em;
  color: #818989;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
`;

export default AdminLoginPage;
