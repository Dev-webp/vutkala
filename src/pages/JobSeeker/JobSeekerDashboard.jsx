import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  getJobs,
} from "../../services/jobService";

import {
  getMyApplications,
} from "../../services/applicationService";

import {
  useAuth,
} from "../../context/AuthContext";

import "./JobSeekerDashboard.css";


function JobSeekerDashboard() {

  const navigate = useNavigate();

  const { user } = useAuth();


  // =====================================================
  // STATE
  // =====================================================

  const [jobs, setJobs] = useState([]);

  const [applications, setApplications] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [applicationsLoading, setApplicationsLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [applicationError, setApplicationError] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [location, setLocation] =
    useState("");

  const [savedJobs, setSavedJobs] =
    useState(() => {

      try {

        const saved =
          localStorage.getItem(
            "vutkala_saved_jobs"
          );

        return saved
          ? JSON.parse(saved)
          : [];

      } catch {

        return [];

      }

    });


  // =====================================================
  // USER NAME
  // =====================================================

  const userName =
    user?.fullName ||
    user?.full_name ||
    user?.name ||
    "Job Seeker";


  // =====================================================
  // LOAD JOBS
  // =====================================================

  const loadJobs = async () => {

    try {

      setLoading(true);
      setError("");

      const response =
        await getJobs();

      console.log(
        "JOB SEEKER JOBS:",
        response.data
      );

      if (
        response.data.success
      ) {

        setJobs(
          response.data.jobs || []
        );

      } else {

        setError(
          response.data.message ||
          "Unable to load jobs."
        );

      }

    } catch (error) {

      console.error(
        "Job seeker dashboard error:",
        error
      );

      setError(
        error.response?.data?.message ||
        "Unable to load jobs."
      );

    } finally {

      setLoading(false);

    }

  };


  // =====================================================
  // LOAD APPLICATIONS
  // =====================================================

  const loadApplications = async () => {

    try {

      setApplicationsLoading(true);
      setApplicationError("");

      const response =
        await getMyApplications();

      console.log(
        "JOB SEEKER APPLICATIONS:",
        response.data
      );

      if (
        response.data.success
      ) {

        setApplications(
          response.data.applications || []
        );

      } else {

        setApplicationError(
          response.data.message ||
          "Unable to load applications."
        );

      }

    } catch (error) {

      console.error(
        "Load applications error:",
        error
      );

      setApplicationError(
        error.response?.data?.message ||
        "Unable to load applications."
      );

    } finally {

      setApplicationsLoading(false);

    }

  };


  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {

    loadJobs();

    loadApplications();

  }, []);


  // =====================================================
  // SAVE JOBS TO LOCAL STORAGE
  // =====================================================

  useEffect(() => {

    localStorage.setItem(
      "vutkala_saved_jobs",
      JSON.stringify(savedJobs)
    );

  }, [savedJobs]);


  // =====================================================
  // SEARCH
  // =====================================================

  const handleSearch = (e) => {

    e.preventDefault();

    const params =
      new URLSearchParams();

    if (search.trim()) {

      params.append(
        "search",
        search.trim()
      );

    }

    if (location.trim()) {

      params.append(
        "location",
        location.trim()
      );

    }

    const query =
      params.toString();

    navigate(
      query
        ? `/seeker/jobs?${query}`
        : "/seeker/jobs"
    );

  };


  // =====================================================
  // INDUSTRY SEARCH
  // =====================================================

  const handleIndustryClick = (
    industry
  ) => {

    navigate(
      `/seeker/jobs?industry=${encodeURIComponent(
        industry
      )}`
    );

  };


  // =====================================================
  // SAVE / UNSAVE JOB
  // =====================================================

  const toggleSavedJob = (
    jobId
  ) => {

    setSavedJobs((current) => {

      if (
        current.includes(jobId)
      ) {

        return current.filter(
          (id) => id !== jobId
        );

      }

      return [
        ...current,
        jobId,
      ];

    });

  };


  // =====================================================
  // CHECK SAVED JOB
  // =====================================================

  const isJobSaved = (
    jobId
  ) => {

    return savedJobs.includes(
      jobId
    );

  };


  // =====================================================
  // JOB STATISTICS
  // =====================================================

  const totalJobs =
    jobs.length;

  const remoteJobs =
    jobs.filter(
      (job) =>
        job.work_mode ===
        "REMOTE"
    ).length;

  const fullTimeJobs =
    jobs.filter(
      (job) =>
        job.employment_type ===
        "FULL_TIME"
    ).length;


  // =====================================================
  // APPLICATION STATISTICS
  // =====================================================

  const totalApplications =
    applications.length;

  const shortlistedApplications =
    applications.filter(
      (application) =>
        application.status ===
        "SHORTLISTED"
    ).length;

  const interviewApplications =
    applications.filter(
      (application) =>
        application.status ===
        "INTERVIEW"
    ).length;

  const selectedApplications =
    applications.filter(
      (application) =>
        application.status ===
        "SELECTED"
    ).length;


  // =====================================================
  // PROFILE COMPLETION
  // =====================================================

  const profileCompletion =
    useMemo(() => {

      let completed = 0;

      const total = 5;

      if (
        user?.fullName ||
        user?.full_name ||
        user?.name
      ) {

        completed++;

      }

      if (
        user?.email
      ) {

        completed++;

      }

      if (
        user?.phone ||
        user?.mobile ||
        user?.phone_number
      ) {

        completed++;

      }

      if (
        user?.resume ||
        user?.resume_url
      ) {

        completed++;

      }

      if (
        user?.skills
      ) {

        completed++;

      }

      return Math.round(
        (completed / total) *
        100
      );

    }, [user]);


  // =====================================================
  // RECENT JOBS
  // =====================================================

  const recentJobs =
    jobs.slice(0, 6);


  // =====================================================
  // RECENT APPLICATIONS
  // =====================================================

  const recentApplications =
    applications.slice(0, 5);


  // =====================================================
  // STATUS CLASS
  // =====================================================

  const getStatusClass = (
    status
  ) => {

    return String(
      status || "NEW"
    ).toLowerCase();

  };


  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (
    date
  ) => {

    if (!date) {
      return "";
    }

    return new Date(
      date
    ).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );

  };


  // =====================================================
  // FORMAT SALARY
  // =====================================================

  const formatSalary = (
    min,
    max
  ) => {

    if (
      min &&
      max
    ) {

      return `₹${Number(
        min
      ).toLocaleString(
        "en-IN"
      )} - ₹${Number(
        max
      ).toLocaleString(
        "en-IN"
      )}`;

    }

    if (min) {

      return `₹${Number(
        min
      ).toLocaleString(
        "en-IN"
      )}+`;

    }

    return "Salary not disclosed";

  };


  // =====================================================
  // INDUSTRIES
  // =====================================================

  const industries = [

    {
      number: "01",
      title: "IT & Technology",
      description:
        "Software, AI, cloud, data and technology opportunities.",
      value:
        "Information Technology",
    },

    {
      number: "02",
      title: "Healthcare",
      description:
        "Healthcare, medical and life sciences opportunities.",
      value:
        "Healthcare",
    },

    {
      number: "03",
      title: "BFSI",
      description:
        "Banking, financial services and insurance.",
      value:
        "BFSI",
    },

    {
      number: "04",
      title: "Manufacturing",
      description:
        "Engineering, operations and manufacturing roles.",
      value:
        "Manufacturing",
    },

    {
      number: "05",
      title: "Education",
      description:
        "Teaching, training and education opportunities.",
      value:
        "Education",
    },

    {
      number: "06",
      title: "Sales & Marketing",
      description:
        "Sales, marketing, business development and growth.",
      value:
        "Sales & Marketing",
    },

  ];


  // =====================================================
  // LOADING
  // =====================================================

  if (
    loading &&
    applicationsLoading
  ) {

    return (

      <div className="jobseeker-dashboard">

        <div className="js-dashboard-loading">

          <div className="js-loading-spinner" />

          <p>
            Loading your Vutkala dashboard...
          </p>

        </div>

      </div>

    );

  }


  // =====================================================
  // UI
  // =====================================================

  return (

    <div className="jobseeker-dashboard">


      {/* =================================================
          TOP WELCOME
      ================================================= */}

      <section className="js-dashboard-welcome">

        <div>

          <span className="js-eyebrow">
            VUTKALA CAREERS
          </span>

          <h1>

            Welcome back,{" "}

            <span>
              {userName}
            </span>

            👋

          </h1>

          <p>
            Find opportunities that match
            your skills, experience and
            career goals.
          </p>

        </div>


        <div className="js-profile-mini">

          <div className="js-profile-mini-top">

            <span>
              Profile Completion
            </span>

            <strong>
              {profileCompletion}%
            </strong>

          </div>

          <div className="js-progress">

            <div
              style={{
                width:
                  `${profileCompletion}%`,
              }}
            />

          </div>

          <Link to="/seeker/profile">
            Complete Profile →
          </Link>

        </div>

      </section>


      {/* =================================================
          SEARCH HERO
      ================================================= */}

      <section className="js-search-hero">

        <div className="js-search-content">

          <span className="js-search-eyebrow">
            FIND YOUR NEXT OPPORTUNITY
          </span>

          <h2>
            Search jobs that move
            <span> your career forward.</span>
          </h2>

          <p>
            Search thousands of opportunities
            across industries and locations.
          </p>


          <form
            className="js-main-search"
            onSubmit={handleSearch}
          >

            <div className="js-search-field">

              <span className="js-search-icon">
                🔎
              </span>

              <input
                type="text"
                placeholder="Job title, skills or company"
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
              />

            </div>


            <div className="js-search-divider" />


            <div className="js-search-field">

              <span className="js-search-icon">
                📍
              </span>

              <input
                type="text"
                placeholder="City or location"
                value={location}
                onChange={(e) =>
                  setLocation(
                    e.target.value
                  )
                }
              />

            </div>


            <button
              type="submit"
              className="js-search-button"
            >

              Search Jobs

              <span>
                →
              </span>

            </button>

          </form>


          <div className="js-popular-searches">

            <span>
              Popular:
            </span>

            <button
              type="button"
              onClick={() => {

                setSearch(
                  "Software Engineer"
                );

              }}
            >
              Software Engineer
            </button>

            <button
              type="button"
              onClick={() => {

                setSearch(
                  "Data Analyst"
                );

              }}
            >
              Data Analyst
            </button>

            <button
              type="button"
              onClick={() => {

                setSearch(
                  "Marketing"
                );

              }}
            >
              Marketing
            </button>

            <button
              type="button"
              onClick={() => {

                setSearch(
                  "HR"
                );

              }}
            >
              HR
            </button>

          </div>

        </div>


        <div className="js-search-decoration">

          <div className="js-decoration-circle circle-one" />

          <div className="js-decoration-circle circle-two" />

          <div className="js-decoration-card">

            <span>
              OPEN OPPORTUNITIES
            </span>

            <strong>
              {loading
                ? "..."
                : totalJobs}
            </strong>

            <small>
              Jobs waiting for you
            </small>

          </div>

        </div>

      </section>


      {/* =================================================
          ERROR
      ================================================= */}

      {error && (

        <div className="js-dashboard-error">

          {error}

        </div>

      )}


      {/* =================================================
          APPLICATION STATS
      ================================================= */}

      <section className="js-application-stats">

        <div className="js-stat-heading">

          <span className="js-section-eyebrow">
            YOUR JOB SEARCH
          </span>

          <h2>
            Application Overview
          </h2>

        </div>


        <div className="js-stat-grid">


          {/* APPLIED */}

          <Link
            to="/seeker/applications"
            className="js-stat-card"
          >

            <div className="js-stat-icon">
              AP
            </div>

            <div>

              <span>
                Applied Jobs
              </span>

              <strong>

                {applicationsLoading
                  ? "..."
                  : totalApplications}

              </strong>

              <small>
                Total applications
              </small>

            </div>

          </Link>


          {/* SHORTLISTED */}

          <Link
            to="/seeker/applications"
            className="js-stat-card"
          >

            <div className="js-stat-icon pink">
              SH
            </div>

            <div>

              <span>
                Shortlisted
              </span>

              <strong>

                {applicationsLoading
                  ? "..."
                  : shortlistedApplications}

              </strong>

              <small>
                Applications shortlisted
              </small>

            </div>

          </Link>


          {/* INTERVIEW */}

          <Link
            to="/seeker/applications"
            className="js-stat-card"
          >

            <div className="js-stat-icon orange">
              IN
            </div>

            <div>

              <span>
                Interviews
              </span>

              <strong>

                {applicationsLoading
                  ? "..."
                  : interviewApplications}

              </strong>

              <small>
                Interview stage
              </small>

            </div>

          </Link>


          {/* SAVED */}

          <Link
            to="/seeker/saved-jobs"
            className="js-stat-card"
          >

            <div className="js-stat-icon saved">
              ♥
            </div>

            <div>

              <span>
                Saved Jobs
              </span>

              <strong>
                {savedJobs.length}
              </strong>

              <small>
                Jobs saved for later
              </small>

            </div>

          </Link>


        </div>

      </section>


      {/* =================================================
          JOB MARKET STATS
      ================================================= */}

      <section className="js-market-stats">

        <div className="js-market-stat">

          <strong>
            {loading
              ? "..."
              : totalJobs}
          </strong>

          <span>
            Open Jobs
          </span>

        </div>


        <div className="js-market-stat">

          <strong>
            {loading
              ? "..."
              : fullTimeJobs}
          </strong>

          <span>
            Full Time
          </span>

        </div>


        <div className="js-market-stat">

          <strong>
            {loading
              ? "..."
              : remoteJobs}
          </strong>

          <span>
            Remote Jobs
          </span>

        </div>


        <div className="js-market-stat">

          <strong>
            {selectedApplications}
          </strong>

          <span>
            Selected
          </span>

        </div>

      </section>


      {/* =================================================
          RECOMMENDED / LATEST JOBS
      ================================================= */}

      <section className="js-section">

        <div className="js-section-header">

          <div>

            <span className="js-section-eyebrow">
              RECOMMENDED FOR YOU
            </span>

            <h2>
              Latest opportunities
            </h2>

            <p>
              Explore the newest jobs available
              on Vutkala.
            </p>

          </div>

          <Link to="/seeker/jobs">
            View All Jobs →
          </Link>

        </div>


        {recentJobs.length === 0 ? (

          <div className="js-dashboard-empty">

            <div className="empty-symbol">
              JOB
            </div>

            <h3>
              No jobs available yet
            </h3>

            <p>
              New opportunities will appear
              here when recruiters publish jobs.
            </p>

            <Link to="/seeker/jobs">
              Explore Jobs →
            </Link>

          </div>

        ) : (

          <div className="js-recommended-grid">

            {recentJobs.map(
              (job) => (

                <article
                  className="js-job-card"
                  key={job.id}
                >


                  {/* JOB TOP */}

                  <div className="js-job-top">

                    <div className="js-job-company">

                      <div className="js-company-logo">

                        {job.company_name
                          ?.charAt(0)
                          ?.toUpperCase() ||
                          "V"}

                      </div>

                      <div>

                        <h3>
                          {job.title}
                        </h3>

                        <p>
                          {job.company_name ||
                            "Vutkala Global"}
                        </p>

                      </div>

                    </div>


                    <button
                      type="button"
                      className={`js-save-job ${
                        isJobSaved(job.id)
                          ? "saved"
                          : ""
                      }`}
                      onClick={() =>
                        toggleSavedJob(
                          job.id
                        )
                      }
                      aria-label="Save job"
                    >

                      {isJobSaved(
                        job.id
                      )
                        ? "♥"
                        : "♡"}

                    </button>

                  </div>


                  {/* JOB DETAILS */}

                  <div className="js-job-details">

                    {job.location && (

                      <span>
                        📍 {job.location}
                      </span>

                    )}

                    {job.work_mode && (

                      <span>
                        {job.work_mode}
                      </span>

                    )}

                    {job.employment_type && (

                      <span>
                        {job.employment_type}
                      </span>

                    )}

                    {job.experience_required && (

                      <span>

                        {job.experience_required}

                        {job.experience_required
                          .toString()
                          .match(/^\d+$/)
                          ? " years"
                          : ""}

                      </span>

                    )}

                  </div>


                  {/* INDUSTRY */}

                  {job.industry && (

                    <div className="js-job-industry">

                      {job.industry}

                    </div>

                  )}


                  {/* SKILLS */}

                  {job.skills && (

                    <div className="js-job-skills">

                      {job.skills
                        .split(",")
                        .slice(0, 4)
                        .map(
                          (
                            skill,
                            index
                          ) => (

                            <span
                              key={index}
                            >
                              {skill.trim()}
                            </span>

                          )
                        )}

                    </div>

                  )}


                  {/* SALARY */}

                  <div className="js-job-salary">

                    {formatSalary(
                      job.salary_min,
                      job.salary_max
                    )}

                  </div>


                  {/* FOOTER */}

                  <div className="js-job-footer">

                    <span className="js-job-posted">

                      {job.created_at
                        ? `Posted ${formatDate(
                            job.created_at
                          )}`
                        : "Latest opportunity"}

                    </span>


                    <Link
                      to={`/seeker/jobs/${job.id}`}
                      className="js-view-job"
                    >
                      View Job →
                    </Link>

                  </div>

                </article>

              )
            )}

          </div>

        )}

      </section>


      {/* =================================================
          RECENT APPLICATIONS
      ================================================= */}

      <section className="js-section">

        <div className="js-section-header">

          <div>

            <span className="js-section-eyebrow">
              APPLICATION ACTIVITY
            </span>

            <h2>
              Recent applications
            </h2>

          </div>

          <Link to="/seeker/applications">
            View All Applications →
          </Link>

        </div>


        {applicationError && (

          <div className="js-dashboard-error">

            {applicationError}

          </div>

        )}


        {recentApplications.length === 0 ? (

          <div className="js-application-empty">

            <div>
              📄
            </div>

            <h3>
              No applications yet
            </h3>

            <p>
              Start applying to jobs that
              match your career goals.
            </p>

            <Link to="/seeker/jobs">
              Find Jobs →
            </Link>

          </div>

        ) : (

          <div className="js-applications-table">

            {recentApplications.map(
              (application) => (

                <div
                  className="js-application-row"
                  key={application.id}
                >


                  <div className="js-application-company">

                    <div className="js-company-logo small">

                      {(
                        application.company_name ||
                        "V"
                      )
                        .charAt(0)
                        .toUpperCase()}

                    </div>

                    <div>

                      <h3>
                        {application.title ||
                          "Job Application"}
                      </h3>

                      <p>
                        {application.company_name ||
                          "Company"}
                      </p>

                    </div>

                  </div>


                  <div className="js-application-location">

                    {application.location ||
                      "Location not specified"}

                  </div>


                  <div>

                    <span
                      className={`js-application-status ${getStatusClass(
                        application.status
                      )}`}
                    >

                      {application.status ||
                        "NEW"}

                    </span>

                  </div>


                  <div className="js-application-date">

                    {formatDate(
                      application.applied_at
                    )}

                  </div>


                  <Link
                    to="/seeker/applications"
                    className="js-application-view"
                  >
                    View →
                  </Link>

                </div>

              )
            )}

          </div>

        )}

      </section>


      {/* =================================================
          INDUSTRIES
      ================================================= */}

      <section className="js-section">

        <div className="js-section-header">

          <div>

            <span className="js-section-eyebrow">
              EXPLORE
            </span>

            <h2>
              Explore by industry
            </h2>

            <p>
              Discover opportunities across
              different career categories.
            </p>

          </div>

          <Link to="/seeker/jobs">
            Browse All Jobs →
          </Link>

        </div>


        <div className="js-industry-grid">

          {industries.map(
            (industry) => (

              <button
                type="button"
                key={industry.number}
                onClick={() =>
                  handleIndustryClick(
                    industry.value
                  )
                }
                className="js-industry-card"
              >

                <span className="industry-number">
                  {industry.number}
                </span>

                <div>

                  <h3>
                    {industry.title}
                  </h3>

                  <p>
                    {industry.description}
                  </p>

                </div>

                <span className="industry-arrow">
                  →
                </span>

              </button>

            )
          )}

        </div>

      </section>


      {/* =================================================
          PROFILE CTA
      ================================================= */}

      <section className="js-profile-cta">

        <div>

          <span>
            BUILD A STRONGER PROFILE
          </span>

          <h2>
            Let recruiters discover you.
          </h2>

          <p>
            Complete your profile, add your
            skills and upload your resume to
            improve your chances of getting noticed.
          </p>

        </div>


        <div className="js-profile-cta-right">

          <div className="js-profile-circle">

            <strong>
              {profileCompletion}%
            </strong>

            <span>
              Complete
            </span>

          </div>

          <Link
            to="/seeker/profile"
            className="js-cta-button"
          >
            Complete Profile →
          </Link>

        </div>

      </section>


      {/* =================================================
          FINAL CTA
      ================================================= */}

      <section className="js-dashboard-cta">

        <div>

          <span>
            READY FOR YOUR NEXT MOVE?
          </span>

          <h2>
            Your next opportunity
            could be one search away.
          </h2>

          <p>
            Search jobs across industries,
            locations and work modes.
          </p>

        </div>


        <Link
          to="/seeker/jobs"
          className="js-cta-button"
        >
          Find Jobs →
        </Link>

      </section>


    </div>

  );

}


export default JobSeekerDashboard;