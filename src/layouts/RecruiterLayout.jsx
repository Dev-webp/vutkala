import React from "react";
import { Outlet } from "react-router-dom";

import RecruiterNavbar from "../components/RecruiterNavbar/RecruiterNavbar";

import "./RecruiterLayout.css";

function RecruiterLayout() {
  return (
    <div className="recruiter-layout">

      <RecruiterNavbar />

      <main className="recruiter-main">
        <Outlet />
      </main>

    </div>
  );
}

export default RecruiterLayout;