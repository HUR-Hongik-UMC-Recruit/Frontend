import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "../../components/application/Modal";
import PlatformConverter from "../../data/project/PlatformConverter";
import { ReactComponent as LinkIcon } from "../../assets/icons/LinkIcon.svg";
import { motion, AnimatePresence } from "framer-motion";

const ProjectContainer = styled.div`
  background: black;
  padding: 5rem 8rem 10rem 8rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  min-height: 100vh;
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
      setProjects(response.data.result);
      console.log("프로젝트 get 요청 응답: ", response.data.result);
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
      setSelectedProject(response.data.result);
      setIsOpen(true);
    } catch (e) {
      console.log("프로젝트 get 요청 실패: ", e);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedProject(null);
  };

  const handleToLink = (link) => {
    if (link) {
      window.open(link, "_blank");
    } else {
      alert("링크가 없습니다.");
    }
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
              <ProjectPlatform>
                {PlatformConverter[project.platform]}
              </ProjectPlatform>
            </Project>
            <Description>{project.description}</Description>
          </CardContainer>
        ))}
      </ProjectWrapper>

      {/*모달*/}
      <AnimatePresence>
        {isOpen && (
          <Modal isOpen={isOpen} onClose={closeModal}>
            {selectedProject && (
              <ModalContent
                initial={{ opacity: 0, scale: 1 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.1, ease: "easeOut" }}
              >
                <ContentWrapper>
                  <ImgContainer>
                    <ModalImg
                      src={selectedProject.img}
                      style={{ objectFit: "cover" }}
                    />
                    <LinkButton
                      onClick={() => handleToLink(selectedProject.link)}
                    >
                      <LinkIcon />
                    </LinkButton>
                  </ImgContainer>
                  <ModalHeader>
                    <HeaderContent>
                      <TitleSection>
                        <ModalProjectName>
                          {selectedProject.name}
                        </ModalProjectName>
                        <ModalPlatform>
                          {selectedProject.platform}
                        </ModalPlatform>
                      </TitleSection>
                      <ModalGeneration>
                        {selectedProject.generation}
                      </ModalGeneration>
                    </HeaderContent>
                  </ModalHeader>

                  <TeamSection>
                    <TeamTitle>TEAM</TeamTitle>
                    <TeamMember>
                      {Object.keys(selectedProject.team).map(
                        (
                          part // 객체를 배열로 바꾸자
                        ) => (
                          <Part key={part}>
                            <PartTitle>{part.toUpperCase()}</PartTitle>
                            {selectedProject.team[part].map((member, index) => (
                              <MemberList key={index}>
                                {member.nickname} • {member.name}
                                {/* 제일 마지막 요소에는 세로바 없음 */}
                                {index !==
                                  selectedProject.team[part].length - 1 && (
                                  <VerticalBar />
                                )}
                              </MemberList>
                            ))}
                          </Part>
                        )
                      )}
                    </TeamMember>
                  </TeamSection>
                </ContentWrapper>
              </ModalContent>
            )}
          </Modal>
        )}
      </AnimatePresence>
    </ProjectContainer>
  );
};

export default ProjectPage;

const ModalContent = styled(motion.div)`
  width: 68.75rem;
  height: 53.438rem;
  border-radius: 1rem;
  padding: 4rem 6.25rem 4rem 7.813rem;
  background: black;
  border: 0.063rem solid #353838;
  box-shadow: 0rem 0rem 3.75rem 0rem #d1dadb66;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentWrapper = styled.div`
  width: 45.25rem;
  height: 45.438rem;
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  width: 45.25rem;
  height: 3.688rem;
  margin-bottom: 3rem;
`;

const HeaderContent = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.25rem;
`;

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const ModalProjectName = styled.h2`
  font-family: Pretendard Variable;
  font-weight: 600;
  font-size: 1.375rem;
  line-height: 1.856rem;
  letter-spacing: -1%;
  color: #ffffff;
  margin-bottom: 0.25rem;
`;

const ModalPlatform = styled.div`
  font-family: Pretendard Variable;
  font-weight: 600;
  font-size: 1.063rem;
  line-height: 1.541rem;
  letter-spacing: 0%;
  color: #818989;
`;

const ModalGeneration = styled.div`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  width: 2.813rem;
  height: 2rem;
  border-radius: 3.125rem;
  background-color: #353838;
  margin-top: 0;

  font-family: Pretendard Variable;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.269rem;
  letter-spacing: 1%;
  color: #a2abab;
`;

const TeamSection = styled.div`
  margin-top: 2rem;
`;

const Part = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: row;
  gap: 0.875rem;
  flex-wrap: wrap;
`;

const MemberList = styled.div`
  font-family: Pretendard Variable;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.5rem;
  letter-spacing: 0%;
  color: #bcc6c6;
  display: flex;
  align-items: center;
`;

const TeamMember = styled.div`
  color: #d1dadb;
`;

const TeamTitle = styled.h2`
  color: var(--Gray-50, #fcffff);
  font-family: "Pretendard Variable";
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 600;
  line-height: 145%;
`;

const PartTitle = styled.div`
  font-family: Pretendard Variable;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.5rem;
  letter-spacing: 0%;
  color: #818989;
  margin-right: 3.75rem;
  width: 5.625rem;
`;

const VerticalBar = styled.div`
  width: 0.125rem;
  height: 0.875rem;
  background-color: #5c6161;
  margin-left: 1.25rem;
`;

const ModalImg = styled.img`
  width: 45.25rem;
  height: 25.5rem;
  border-radius: 0.313rem;
  background-color: #ffffff;
  margin-bottom: 1.875rem;
`;

const LinkButton = styled.button`
  position: absolute;
  right: 1rem;
  bottom: 0.688rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  width: 10.313rem;
  height: 2.75rem;
  background: #353838;
  border: 0.063rem solid #5c6161;
  border-radius: 3.125rem;
  cursor: pointer;

  &:hover {
    background: #454848;
  }
`;

const ImgContainer = styled.div`
  position: relative;
  width: 45.25rem;
  height: 25.5rem;
  margin-bottom: 1.875rem;
`;
