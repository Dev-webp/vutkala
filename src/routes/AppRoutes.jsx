import { Routes, Route } from "react-router-dom";

// =====================================================
// PUBLIC PAGES
// =====================================================

import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import Jobs from "../pages/Jobs/Jobs";
import Services from "../pages/ServiceHome/Services";
import Hire from "../pages/Hire/Hire";
import Industries from "../pages/Industries/Industries";

// =====================================================
// AUTHENTICATION
// =====================================================

import Register from "../pages/login/Register";
import Login from "../pages/login/Login";
import ForgotPassword from "../pages/login/ForgotPassword";
import ResetPassword from "../pages/login/ResetPassword";
import VerifyOTP from "../pages/login/VerifyOTP";

// =====================================================
// ROUTE PROTECTION
// =====================================================

import ProtectedRoute from "./ProtectedRoute";
import RoleProtectedRoute from "./RoleProtectedRoute";

// =====================================================
// LAYOUTS
// =====================================================

import PublicLayout from "../layouts/PublicLayout";
import RecruiterLayout from "../layouts/RecruiterLayout";
import JobSeekerLayout from "../layouts/JobSeekerLayout";

// =====================================================
// ADMIN
// =====================================================
import AdminCompanies from "../pages/Admin/AdminCompanies";
import AdminLayout from "../pages/Admin/AdminLayout";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import AdminUsers from "../pages/Admin/AdminUsers";
import AdminApprovals from "../pages/Admin/AdminApprovals";
import AdminJobs from "../pages/Admin/AdminJobs";
import AdminApplications from "../pages/Admin/AdminApplications";

import AdminCandidates from "../pages/Admin/AdminCandidates";


// =====================================================
// RECRUITER
// =====================================================

import RecruiterDashboard from "../pages/Recruiter/RecruiterDashboard";
import PostJob from "../pages/Recruiter/PostJob";
import MyJobs from "../pages/Recruiter/MyJobs";
import EditJob from "../pages/Recruiter/EditJob";
import Application from "../pages/Recruiter/Applications";
import CompanyProfile from "../pages/Recruiter/CompanyProfile";
import ContactCandidate from "../pages/Recruiter/ContactCandidate";

// Candidate Search + Profile
import FindCandidates from "../pages/Recruiter/FindCandidates";
import CandidateProfile from "../pages/Recruiter/CandidateProfile";

// =====================================================
// JOB SEEKER
// =====================================================

import JobSeekerDashboard from "../pages/JobSeeker/JobSeekerDashboard";
import FindJobs from "../pages/JobSeeker/FindJobs";
import JobDetails from "../pages/JobSeeker/JobDetails";
import MyApplications from "../pages/JobSeeker/MyApplications";
import SavedJobs from "../pages/JobSeeker/SavedJobs";
import MyProfile from "../pages/JobSeeker/MyProfile";

// =====================================================
// APP ROUTES
// =====================================================

function AppRoutes() {
  return (
    <Routes>

      {/* =================================================
          PUBLIC WEBSITE
      ================================================= */}

      <Route element={<PublicLayout />}>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route
          path="/jobs"
          element={<Jobs />}
        />

        <Route
          path="/services"
          element={<Services />}
        />

        <Route
          path="/hire"
          element={<Hire />}
        />

        <Route
          path="/industry"
          element={<Industries />}
        />

        {/* =================================================
            AUTHENTICATION
        ================================================= */}

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/forgot"
          element={<ForgotPassword />}
        />

        <Route
          path="/reset-password"
          element={<ResetPassword />}
        />

        <Route
          path="/verify-otp"
          element={<VerifyOTP />}
        />

      </Route>


      {/* =================================================
          ALL PROTECTED ROUTES
      ================================================= */}

      <Route element={<ProtectedRoute />}>


        {/* =================================================
            JOB SEEKER
        ================================================= */}

        <Route
          element={
            <RoleProtectedRoute
              allowedRoles={["JOB_SEEKER"]}
            />
          }
        >

          {/* =================================================
              JOB SEEKER LAYOUT

              /seeker
          ================================================= */}

          <Route
            path="/seeker"
            element={<JobSeekerLayout />}
          >

            {/* Dashboard */}
            <Route
              index
              element={<JobSeekerDashboard />}
            />

            {/* Find Jobs */}
            <Route
              path="jobs"
              element={<FindJobs />}
            />

            {/* Job Details */}
            <Route
              path="jobs/:id"
              element={<JobDetails />}
            />

            {/* My Applications */}
            <Route
              path="applications"
              element={<MyApplications />}
            />

            {/* Saved Jobs */}
            <Route
              path="saved-jobs"
              element={<SavedJobs />}
            />

            {/* My Profile */}
            <Route
              path="profile"
              element={<MyProfile />}
            />

          </Route>

        </Route>


        {/* =================================================
            RECRUITER
        ================================================= */}

        <Route
          element={
            <RoleProtectedRoute
              allowedRoles={["RECRUITER"]}
            />
          }
        >

          <Route
            path="/recruiter"
            element={<RecruiterLayout />}
          >

            {/* =================================================
                RECRUITER DASHBOARD

                URL:
                /recruiter
            ================================================= */}

            <Route
              index
              element={<RecruiterDashboard />}
            />


            {/* =================================================
                MY JOBS

                URL:
                /recruiter/my-jobs
            ================================================= */}

            <Route
              path="my-jobs"
              element={<MyJobs />}
            />


            {/* =================================================
                POST JOB

                URL:
                /recruiter/post-job
            ================================================= */}

            <Route
              path="post-job"
              element={<PostJob />}
            />


            {/* =================================================
                EDIT JOB

                URL:
                /recruiter/jobs/edit/:id
            ================================================= */}

            <Route
              path="jobs/edit/:id"
              element={<EditJob />}
            />


            {/* =================================================
                CONTACT CANDIDATE

                URL:
                /recruiter/candidates/:id/contact
            ================================================= */}

            <Route
              path="candidates/:id/contact"
              element={<ContactCandidate />}
            />


            {/* =================================================
                APPLICATIONS

                URL:
                /recruiter/applications
            ================================================= */}

            <Route
              path="applications"
              element={<Application />}
            />


            {/* =================================================
                COMPANY PROFILE

                URL:
                /recruiter/company-profile
            ================================================= */}

            <Route
              path="company-profile"
              element={<CompanyProfile />}
            />


            {/* =================================================
                FIND CANDIDATES

                URL:
                /recruiter/candidates
            ================================================= */}

            <Route
              path="candidates"
              element={<FindCandidates />}
            />


            {/* =================================================
                CANDIDATE PROFILE

                URL:
                /recruiter/candidates/:id
            ================================================= */}

            <Route
              path="candidates/:id"
              element={<CandidateProfile />}
            />

          </Route>

        </Route>


        {/* =================================================
            ADMIN
        ================================================= */}
      <Route
  element={
    <RoleProtectedRoute
      allowedRoles={["ADMIN"]}
    />
  }
>

  <Route
    path="/admin"
    element={<AdminLayout />}
  >

    {/* =================================================
        ADMIN DASHBOARD

        URLs:
        /admin
        /admin/dashboard
    ================================================= */}

    <Route
      index
      element={<AdminDashboard />}
    />

<Route
  path="companies"
  element={<AdminCompanies />}
/>

    <Route
      path="dashboard"
      element={<AdminDashboard />}
    />


    {/* =================================================
        ADMIN JOBS

        URL:
        /admin/jobs
    ================================================= */}

    <Route
      path="jobs"
      element={<AdminJobs />}
    />

<Route
  path="applications"
  element={<AdminApplications />}
/>


<Route
  path="/admin/candidates"
  element={<AdminCandidates />}
/>

    {/* =================================================
        ADMIN USERS

        URL:
        /admin/users
    ================================================= */}

    <Route
      path="users"
      element={<AdminUsers />}
    />


    {/* =================================================
        ADMIN APPROVALS

        URL:
        /admin/approvals
    ================================================= */}

    <Route
      path="approvals"
      element={<AdminApprovals />}
    />

  </Route>

</Route>

      </Route> {/* CLOSE ProtectedRoute */}

    </Routes>
  );
}

export default AppRoutes;