import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function AdminRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    alert("인증되지 않은 사용자입니다. 로그인 페이지로 이동합니다.");
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default AdminRoute;
