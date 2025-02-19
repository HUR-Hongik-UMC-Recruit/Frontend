import styled from "styled-components";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 19.5rem;
  height: 100vh;
  background: #0e3e4f;
  position: fixed;
`;

const Title = styled.div`
  margin: 3.5rem 0rem 4.3rem 2.5rem;
  color: #fff;
  font-family: "Pretendard Variable";
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 575;
  line-height: 135%; /* 2.025rem */
  letter-spacing: -0.015rem;
`;

const Menu = styled.a`
  text-decoration: none;
  cursor: pointer;
  margin: 1rem 0rem 1rem 2.5rem;
  color: #fff;
  font-family: "Pretendard Variable";
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 450;
  line-height: 140%; /* 1.75rem */
  letter-spacing: -0.0125rem;
`;

const Border = styled.div`
  width: 99%;
  border: 0.04119rem solid #5c6161;
`;

const Logout = styled.div`
  cursor: pointer;
  background: transparent;
  border: none;
  margin: auto 0rem 1.6rem 2.5rem;
  color: #fff;
  font-family: "Pretendard Variable";
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 500;
  line-height: 140%; /* 1.75rem */
`;

const AdminHeader = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const apiUrl = process.env.REACT_APP_API_URL;

  const logoutButtonClick = async () => {
    try {
      const response = await axios.post(`${apiUrl}/logout`);

      console.log("로그아웃 성공:", response.data);
      alert("로그아웃 성공!");

      logout();
      navigate("/login");
    } catch (e) {
      console.log("로그아웃 실패:", e);
      alert("로그아웃 실패");
    }
  };

  return (
    <Container>
      <Title>UMC ADMIN</Title>
      <Menu href="/admin/applicants">지원자 대시보드</Menu>
      <Border />
      <Menu href="/admin/recruit-email">모집 알림 이메일</Menu>
      <Border />
      <Menu href="/admin/docpass-email">서류 합격 이메일</Menu>
      <Border />
      <Menu href="/admin/docfail-email">서류 불합격 이메일</Menu>
      <Border />
      <Menu href="/admin/finalpass-email">최종 합격 이메일</Menu>
      <Border />
      <Menu href="/admin/finalfail-email">최종 불합격 이메일</Menu>
      <Border />
      <Logout onClick={logoutButtonClick}>로그아웃</Logout>
    </Container>
  );
};

export default AdminHeader;
