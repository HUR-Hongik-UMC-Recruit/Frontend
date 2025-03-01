import { Route, Routes, useLocation } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import HomePage from "./home/HomePage";
import NotFoundPage from "./NotFoundPage";
import RecruitmentPage from "./recruitment/RecruitmentPage";
import { EmailProvider } from "../contexts/EmailContext";
import ApplicationPage from "./application/ApplicationPage";
import AdminJoinPage from "./admin/AdminJoinPage";
import AdminLoginPage from "./admin/AdminLoginPage";
import AdminLayout from "../components/admin/AdminLayout";
import AdminRoute from "./AdminRoute";
import RecruitAlertEmailPage from "../pages/admin/RecruitAlertEmailPage";
import DocPassEmailPage from "../pages/admin/DocPassEmailPage";
import DocFailEmailPage from "../pages/admin/DocFailEmailPage";
import FinalPassEmailPage from "../pages/admin/FinalPassEmailPage";
import FinalFailEmailPage from "../pages/admin/FinalFailEmailPage";
import AllApplicantsPage from "../pages/admin/AllApplicantsPage";
import { AuthProvider } from "../contexts/AuthContext";
import LeaderPage from "./leader/LeaderPage";
import ProjectPage from "./project/ProjectPage";
import RecruiteInfoPage from "./recruitment/RecruiteInfoPage";

function Routing() {
  // Header와 Footer 표시할 페이지
  const { pathname } = useLocation();
  const showPages = [
    "/",
    "/home",
    "/main",
    "/recruitment",
    "/recruiteInfo",
    // "/apply",
    "/leader",
    "/project",
  ].includes(pathname);

  return (
    <AuthProvider>
      {showPages && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/main" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/leader" element={<LeaderPage />} />
        <Route path="/project" element={<ProjectPage />} />
        <Route path="/recruitment" element={<RecruitmentPage />} />
        <Route path="/recruiteInfo" element={<RecruiteInfoPage />} />
        {/* <Route
          path="/apply"
          element={
            <EmailProvider>
              <ApplicationPage />
            </EmailProvider>
          }
        /> */}
        <Route path="/join" element={<AdminJoinPage />} />
        <Route path="/login" element={<AdminLoginPage />} />

        {/* admin 관련 라우팅 */}
        <Route
          path="/admin/*"
          element={
            <AdminRoute>
              <AdminLayout>
                <Routes>
                  <Route path="" element={<AllApplicantsPage />} />
                  <Route
                    path="recruit-email"
                    element={<RecruitAlertEmailPage />}
                  />
                  <Route path="docpass-email" element={<DocPassEmailPage />} />
                  <Route path="docfail-email" element={<DocFailEmailPage />} />
                  <Route
                    path="finalpass-email"
                    element={<FinalPassEmailPage />}
                  />
                  <Route
                    path="finalfail-email"
                    element={<FinalFailEmailPage />}
                  />
                  <Route path="applicants" element={<AllApplicantsPage />} />
                </Routes>
              </AdminLayout>
            </AdminRoute>
          }
        />
      </Routes>
      {showPages && <Footer />}
    </AuthProvider>
  );
}

export default Routing;
