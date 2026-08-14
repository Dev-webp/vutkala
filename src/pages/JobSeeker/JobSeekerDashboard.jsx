import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { getJobs } from "../../services/jobService";
import { useAuth } from "../../context/AuthContext";

import "./JobSeekerDashboard.css";

function JobSeekerDashboard() {
  const navigate = useNavigate();

  const { user } = useAuth();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");

  // =====================================================
  // LOAD JOBS
  // =====================================================

  const loadJobs = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getJobs();

      if (response.data.success) {
        setJobs(response.data.jobs || []);
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

  useEffect(() => {
    loadJobs();
  }, []);


  // =====================================================
  // SEARCH
  // =====================================================

  const handleSearch = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();

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
  // JOB DATA
  // =====================================================

  const totalJobs = jobs.length;

  const remoteJobs = jobs.filter(
    (job) =>
      job.work_mode === "REMOTE"
  ).length;

  const fullTimeJobs = jobs.filter(
    (job) =>
      job.employment_type ===
      "FULL_TIME"
  ).length;

  const recentJobs = jobs.slice(0, 5);


  // =====================================================
  // USER NAME
  // =====================================================

  const userName =
    user?.fullName ||
    user?.full_name ||
    "Job Seeker";


  return (
    <div className="jobseeker-dashboard">


      {/* =================================================
          HERO / WELCOME
      ================================================= */}

      <section className="js-dashboard-hero">

        <div className="js-hero-content">

          <span className="js-eyebrow">
            VUTKAL CAREERS
          </span>

          <h1>
            Find work that moves
            <span> your future forward.</span>
          </h1>

          <p>
            Welcome back, {userName}.
            Discover opportunities across
            technology, healthcare, BFSI,
            manufacturing, education and
            more.
          </p>


          {/* =================================================
              SEARCH
          ================================================= */}

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
                  setSearch(e.target.value)
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
            </button>

          </form>

        </div>


        {/* =================================================
            HERO DECORATION
        ================================================= */}

        <div className="js-hero-decoration">

          <div className="js-decoration-circle circle-one" />

          <div className="js-decoration-circle circle-two" />

          <div className="js-decoration-card">

            <span>
              OPPORTUNITIES
            </span>

            <strong>
              {loading
                ? "..."
                : totalJobs}
            </strong>

            <small>
              Open jobs available
            </small>

          </div>

        </div>

      </section>


      {/* =================================================
          QUICK STATS
      ================================================= */}

      <section className="js-stats-section">

        <div className="js-stat-card">

          <div className="js-stat-icon">
            JOB
          </div>

          <div>
            <span>
              Open Jobs
            </span>

            <strong>
              {loading
                ? "..."
                : totalJobs}
            </strong>

            <small>
              Opportunities available
            </small>
          </div>

        </div>


        <div className="js-stat-card">

          <div className="js-stat-icon pink">
            FT
          </div>

          <div>
            <span>
              Full Time
            </span>

            <strong>
              {loading
                ? "..."
                : fullTimeJobs}
            </strong>

            <small>
              Full-time opportunities
            </small>
          </div>

        </div>


        <div className="js-stat-card">

          <div className="js-stat-icon orange">
            REM
          </div>

          <div>
            <span>
              Remote
            </span>

            <strong>
              {loading
                ? "..."
                : remoteJobs}
            </strong>

            <small>
              Remote opportunities
            </small>
          </div>

        </div>

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
              Explore opportunities
            </h2>

          </div>

          <Link to="/seeker/jobs">
            View All Jobs →
          </Link>

        </div>


        <div className="js-industry-grid">

          <button
            type="button"
            onClick={() =>
              handleIndustryClick(
                "Information Technology"
              )
            }
            className="js-industry-card"
          >
            <span className="industry-number">
              01
            </span>

            <div>
              <h3>
                IT & Technology
              </h3>

              <p>
                Software, AI, cloud,
                data and technology
                opportunities.
              </p>
            </div>

            <span className="industry-arrow">
              →
            </span>
          </button>


          <button
            type="button"
            onClick={() =>
              handleIndustryClick(
                "Healthcare"
              )
            }
            className="js-industry-card"
          >
            <span className="industry-number">
              02
            </span>

            <div>
              <h3>
                Healthcare
              </h3>

              <p>
                Healthcare, medical
                and life sciences
                opportunities.
              </p>
            </div>

            <span className="industry-arrow">
              →
            </span>
          </button>


          <button
            type="button"
            onClick={() =>
              handleIndustryClick(
                "BFSI"
              )
            }
            className="js-industry-card"
          >
            <span className="industry-number">
              03
            </span>

            <div>
              <h3>
                BFSI
              </h3>

              <p>
                Banking, financial
                services and
                insurance.
              </p>
            </div>

            <span className="industry-arrow">
              →
            </span>
          </button>


          <button
            type="button"
            onClick={() =>
              handleIndustryClick(
                "Manufacturing"
              )
            }
            className="js-industry-card"
          >
            <span className="industry-number">
              04
            </span>

            <div>
              <h3>
                Manufacturing
              </h3>

              <p>
                Engineering,
                operations and
                manufacturing roles.
              </p>
            </div>

            <span className="industry-arrow">
              →
            </span>
          </button>


          <button
            type="button"
            onClick={() =>
              handleIndustryClick(
                "Education"
              )
            }
            className="js-industry-card"
          >
            <span className="industry-number">
              05
            </span>

            <div>
              <h3>
                Education
              </h3>

              <p>
                Teaching, training
                and education
                opportunities.
              </p>
            </div>

            <span className="industry-arrow">
              →
            </span>
          </button>


          <button
            type="button"
            onClick={() =>
              handleIndustryClick(
                "Sales & Marketing"
              )
            }
            className="js-industry-card"
          >
            <span className="industry-number">
              06
            </span>

            <div>
              <h3>
                Sales & Marketing
              </h3>

              <p>
                Sales, marketing,
                business development
                and growth.
              </p>
            </div>

            <span className="industry-arrow">
              →
            </span>
          </button>

        </div>

      </section>


      {/* =================================================
          RECENT JOBS
      ================================================= */}

      <section className="js-section">

        <div className="js-section-header">

          <div>

            <span className="js-section-eyebrow">
              OPPORTUNITIES
            </span>

            <h2>
              Latest jobs
            </h2>

          </div>

          <Link to="/seeker/jobs">
            Browse All →
          </Link>

        </div>


        {error && (
          <div className="js-dashboard-error">
            {error}
          </div>
        )}


        {loading ? (

          <div className="js-dashboard-loading">
            Loading latest opportunities...
          </div>

        ) : recentJobs.length === 0 ? (

          <div className="js-dashboard-empty">

            <div className="empty-symbol">
              JOB
            </div>

            <h3>
              No jobs available yet
            </h3>

            <p>
              New opportunities will
              appear here when recruiters
              publish jobs.
            </p>

            <Link to="/seeker/jobs">
              Explore Jobs
            </Link>

          </div>

        ) : (

          <div className="js-recent-jobs">

            {recentJobs.map(
              (job) => (

                <article
                  className="js-job-card"
                  key={job.id}
                >

                  {/* COMPANY */}

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


                  {/* DETAILS */}

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
                        {" "}
                        {job.experience_required
                          .toString()
                          .match(/^\d+$/)
                          ? "years"
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


                  {/* FOOTER */}

                  <div className="js-job-footer">

                    <div>

                      {job.salary_min &&
                        job.salary_max && (
                          <strong>
                            ₹
                            {Number(
                              job.salary_min
                            ).toLocaleString(
                              "en-IN"
                            )}
                            {" - ₹"}
                            {Number(
                              job.salary_max
                            ).toLocaleString(
                              "en-IN"
                            )}
                          </strong>
                        )}

                    </div>

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
          FINAL CTA
      ================================================= */}

      <section className="js-dashboard-cta">

        <div>

          <span>
            READY FOR YOUR NEXT MOVE?
          </span>

          <h2>
            Explore every opportunity.
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