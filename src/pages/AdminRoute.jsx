import React, { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function AdminRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  console.log("isAuthenticated: ", isAuthenticated);

  if (!isAuthenticated) {
    alert("접근 권한이 없습니다. 로그인 페이지로 이동합니다.");
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
}

export default AdminRoute;
