import React from "react";
import { Outlet } from "react-router-dom";

import JobSeekerNavbar from "../components/JobSeeker/JobSeekerNavbar";

import "./JobSeekerLayout.css";

function JobSeekerLayout() {
  return (
    <div className="jobseeker-layout">

      {/* ================================
          JOB SEEKER NAVBAR
      ================================= */}

      <JobSeekerNavbar />


      {/* ================================
          PAGE CONTENT
      ================================= */}

      <main className="jobseeker-main">
        <Outlet />
      </main>

    </div>
  );
}

export default JobSeekerLayout;