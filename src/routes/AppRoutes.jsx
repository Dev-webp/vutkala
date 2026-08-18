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
import AuthenticatedLayout from "../layouts/AuthenticatedLayout";

// =====================================================
// ADMIN
// =====================================================

import AdminDashboard from "../pages/Admin/AdminDashboard";

// =====================================================
// RECRUITER
// =====================================================

import RecruiterDashboard from "../pages/Recruiter/RecruiterDashboard";
import PostJob from "../pages/Recruiter/PostJob";
import MyJobs from "../pages/Recruiter/MyJobs";
import EditJob from "../pages/Recruiter/EditJob";
import Application from "../pages/Recruiter/Applications";
import CompanyProfile from "../pages/Recruiter/CompanyProfile";

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

          {/* ===============================================
              JOB SEEKER LAYOUT

              /seeker
          =============================================== */}

          <Route
            path="/seeker"
            element={<JobSeekerLayout />}
          >

            {/* =============================================
                DASHBOARD

                URL:
                /seeker
            ============================================= */}

            <Route
              index
              element={<JobSeekerDashboard />}
            />


            {/* =============================================
                FIND JOBS

                URL:
                /seeker/jobs
            ============================================= */}

            <Route
              path="jobs"
              element={<FindJobs />}
            />

             <Route
    path="applications"
    element={<MyApplications />}
  />


            {/* =============================================
                JOB DETAILS

                URL:
                /seeker/jobs/:id
            ============================================= */}

            <Route
              path="jobs/:id"
              element={<JobDetails />}
            />

                <Route
  path="saved-jobs"
  element={<SavedJobs />}
/>

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

            {/* Dashboard */}

            <Route
              index
              element={<RecruiterDashboard />}
            />


            {/* My Jobs */}

            <Route
              path="my-jobs"
              element={<MyJobs />}
            />


            {/* Post Job */}

            <Route
              path="post-job"
              element={<PostJob />}
            />


            {/* Edit Job */}

            <Route
              path="jobs/edit/:id"
              element={<EditJob />}
            />


            {/* Applications */}

            <Route
              path="applications"
              element={<Application />}
            />


            {/* Company Profile */}

            <Route
              path="company-profile"
              element={<CompanyProfile />}
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
            path="/admin/dashboard"
            element={
              <AuthenticatedLayout role="ADMIN">
                <AdminDashboard />
              </AuthenticatedLayout>
            }
          />

        </Route>

      </Route>

    </Routes>
  );
}

export default AppRoutes;
