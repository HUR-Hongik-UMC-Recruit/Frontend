import styled from "styled-components";
import Projects from "../../data/project/ProjectsData";
import ProjectData from "../../data/project/ProjectData";
import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "../../components/application/Modal";

const ProjectContainer = styled.div`
  background: black;
  padding: 5rem 8rem 10rem 8rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 4rem;
  margin-bottom: 8.13rem;
`;

const SectionTitle = styled.div`
  color: #90e6c9;
  text-align: center;
  font-family: "Pretendard Variable";
  font-size: 2.5rem;
  font-style: normal;
  font-weight: 600;
  line-height: 170%; /* 4.25rem */
  letter-spacing: -0.025rem;
`;

const SectionDetail = styled.div`
  color: #818989;
  text-align: center;
  font-family: "Pretendard Variable";
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 400;
  line-height: 170%; /* 2.125rem */
  letter-spacing: -0.0125rem;
`;

const ProjectWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 5rem;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  cursor: pointer;
`;

const Img = styled.img`
  border: 1px solid #c7c7c7;
  width: 20.5rem;
  height: 11.51544rem;
`;

const Project = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const ProjectName = styled.div`
  color: #fff;
  font-family: "Pretendard Variable";
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 599;
  line-height: 135%; /* 2.025rem */
  letter-spacing: -0.015rem;
`;

const ProjectPlatform = styled.div`
  color: #a2abab;
  font-family: "Pretendard Variable";
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: 155%; /* 1.35625rem */
  letter-spacing: 0.00875rem;
`;

const Description = styled.div`
  color: #d1dadb;
  font-family: "Pretendard Variable";
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 1.5rem */
`;

const ProjectPage = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  // api 연결
  const apiUrl = process.env.REACT_APP_API_URL;
  const getProjects = async () => {
    try {
      const response = await axios.get(`${apiUrl}/projects`);
      setProjects(response.data);
      console.log("프로젝트 get 요청 응답: ", response.data);
    } catch (e) {
      console.log("프로젝트 get 요청 실패: ", e);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  const openModal = async (projectId) => {
    try {
      const response = await axios.get(`${apiUrl}/projects/${projectId}`);
      setSelectedProject(response.data);
      setIsOpen(true);
    } catch (e) {
      console.log("프로젝트 get 요청 실패: ", e);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedProject(null);
  };

  return (
    <ProjectContainer>
      <Section>
        <SectionTitle>프로젝트</SectionTitle>
        <SectionDetail>UMC만의 프로젝트를 소개합니다</SectionDetail>
      </Section>
      <ProjectWrapper>
        {projects.map((project) => (
          <CardContainer key={project.id} onClick={() => openModal(project.id)}>
            <Img src={project.img} />
            <Project>
              <ProjectName>{project.name}</ProjectName>
              <ProjectPlatform>{project.platform}</ProjectPlatform>
            </Project>
            <Description>{project.description}</Description>
          </CardContainer>
        ))}
      </ProjectWrapper>
      <Modal isOpen={isOpen} onClose={closeModal}>
        {selectedProject && <></>}
      </Modal>
    </ProjectContainer>
  );
};

export default ProjectPage;
