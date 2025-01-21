// 로그인하지 않은 사용자가 /admin에 접속하는 것 막기 위함

import React, { createContext, useState, useContext } from "react";

// 인증 상태를 위한 Context 생성
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => setIsAuthenticated(true); // 로그인 함수
  const logout = () => setIsAuthenticated(false); // 로그아웃 함수

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// AuthContext를 사용하는 커스텀 훅
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
