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

function Routing() {
  // Header와 Footer 표시할 페이지
  const { pathname } = useLocation();
  const showPages = [
    "/",
    "/home",
    "/main",
    "/recruitment",
    "/apply",
    "/leader",
  ].includes(pathname);

  return (
    <>
      {showPages && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/main" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
        {/* <Route path="/leader" element={<LeaderPage />} /> */}
        <Route path="/recruitment" element={<RecruitmentPage />} />
        <Route
          path="/apply"
          element={
            <EmailProvider>
              <ApplicationPage />
            </EmailProvider>
          }
        />
        <Route path="/join" element={<AdminJoinPage />} />
        <Route path="/login" element={<AdminLoginPage />} />
        {/* <Route path="/admin" element={<AdminPage />} /> */}
      </Routes>
      {showPages && <Footer />}
    </>
  );
}

export default Routing;
