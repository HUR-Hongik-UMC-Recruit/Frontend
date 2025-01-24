import "./App.css";
import GlobalStyle from "./GlobalStyles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import HomePage from "./pages/home/HomePage";
import RecruitmentPage from "./pages/recruitment/RecruitmentPage";
import ApplicationPage from "./pages/application/ApplicationPage";
import NotFoundPage from "./pages/NotFoundPage";
import AdminJoinPage from "./pages/admin/AdminJoinPage";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import RecruitAlertEmailPage from "./pages/admin/RecruitAlertEmailPage";
import DocPassEmailPage from "./pages/admin/DocPassEmailPage";
import DocFailEmailPage from "./pages/admin/DocFailEmailPage";
import FinalPassEmailPage from "./pages/admin/FinalPassEmailPage";
import FinalFailEmailPage from "./pages/admin/FinalFailEmailPage";
import AllApplicantsPage from "./pages/admin/AllApplicantsPage";

import { EmailProvider } from "./contexts/EmailContext";

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
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
        {/* <Route path="/admin" element={} /> */}
        <Route path="/admin-recruit-email" element={<RecruitAlertEmailPage />} />
        <Route path="/admin-docpass-email" element={<DocPassEmailPage />} />
        <Route path="/admin-docfail-email" element={<DocFailEmailPage />} />
        <Route path="/admin-finalpass-email" element={<FinalPassEmailPage />} />
        <Route path="/admin-finalfail-email" element={<FinalFailEmailPage />} />
        <Route path="/admin-all-applicants" element={<AllApplicantsPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
