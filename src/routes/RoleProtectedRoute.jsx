import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const RoleProtectedRoute = ({ allowedRoles }) => {
  const { user, loading } = useAuth();

  // =====================================================
  // WAIT FOR AUTHENTICATION CHECK
  // =====================================================

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Inter, sans-serif",
        }}
      >
        Checking authentication...
      </div>
    );
  }


  // =====================================================
  // NOT LOGGED IN
  // =====================================================

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }


  // =====================================================
  // ROLE NOT ALLOWED
  // =====================================================

  if (!allowedRoles.includes(user.role)) {

    // ADMIN
    if (user.role === "ADMIN") {
      return (
        <Navigate
          to="/admin/dashboard"
          replace
        />
      );
    }


    // RECRUITER
    if (user.role === "RECRUITER") {
      return (
        <Navigate
          to="/recruiter"
          replace
        />
      );
    }


    // JOB SEEKER
    if (user.role === "JOB_SEEKER") {
      return (
        <Navigate
          to="/seeker"
          replace
        />
      );
    }


    // UNKNOWN ROLE
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }


  // =====================================================
  // ROLE IS ALLOWED
  // =====================================================

  return <Outlet />;
};

export default RoleProtectedRoute;