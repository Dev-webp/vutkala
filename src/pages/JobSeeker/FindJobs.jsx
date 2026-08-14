import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getJobs } from "../../services/jobService";
import "./FindJobs.css";

function FindJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [filters, setFilters] = useState({
    search: "",
    location: "",
    industry: "",
    employment_type: "",
    work_mode: "",
    experience: "",
  });

  const [searchFilters, setSearchFilters] = useState(filters);

  const loadJobs = async () => {
    try {
      setLoading(true);
      setError("");

      const params = new URLSearchParams();

      Object.entries(searchFilters).forEach(
        ([key, value]) => {
          if (value.trim()) {
            params.append(key, value.trim());
          }
        }
      );

      const url = params.toString()
        ? `?${params.toString()}`
        : "";

      const response = await getJobs(url);

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
        "Find jobs error:",
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
  }, [searchFilters]);

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setFilters((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchFilters(filters);
  };

  const clearFilters = () => {
    const emptyFilters = {
      search: "",
      location: "",
      industry: "",
      employment_type: "",
      work_mode: "",
      experience: "",
    };

    setFilters(emptyFilters);
    setSearchFilters(emptyFilters);
  };

  return (
    <div className="find-jobs-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <section className="find-jobs-hero">

        <div className="find-jobs-eyebrow">
          VUTKAL CAREERS
        </div>

        <h1>
          Find the right opportunity
          <span> for your future.</span>
        </h1>

        <p>
          Search opportunities across
          technology, healthcare, BFSI,
          manufacturing, education and
          more.
        </p>


        {/* =================================================
            SEARCH BAR
        ================================================= */}

        <form
          className="job-search-bar"
          onSubmit={handleSearch}
        >

          <div className="search-field">
            <span className="search-icon">
              🔎
            </span>

            <input
              name="search"
              value={filters.search}
              onChange={handleChange}
              placeholder="Job title, skills or company"
            />
          </div>


          <div className="search-divider" />


          <div className="search-field">
            <span className="search-icon">
              📍
            </span>

            <input
              name="location"
              value={filters.location}
              onChange={handleChange}
              placeholder="Location"
            />
          </div>


          <button
            type="submit"
            className="search-jobs-btn"
          >
            Search Jobs
          </button>

        </form>

      </section>


      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <section className="find-jobs-content">

        {/* =================================================
            FILTER SIDEBAR
        ================================================= */}

        <aside className="jobs-filter-panel">

          <div className="filter-header">

            <div>
              <span>
                FILTERS
              </span>

              <h2>
                Refine Results
              </h2>
            </div>

            <button
              type="button"
              onClick={clearFilters}
            >
              Clear
            </button>

          </div>


          {/* INDUSTRY */}

          <div className="filter-group">

            <label>
              Industry
            </label>

            <select
              name="industry"
              value={filters.industry}
              onChange={handleChange}
            >
              <option value="">
                All Industries
              </option>

              <option value="Information Technology">
                IT & Technology
              </option>

              <option value="Healthcare">
                Healthcare
              </option>

              <option value="BFSI">
                BFSI
              </option>

              <option value="Manufacturing">
                Manufacturing
              </option>

              <option value="Education">
                Education
              </option>

              <option value="Retail">
                Retail
              </option>

              <option value="Logistics">
                Logistics
              </option>

              <option value="Construction">
                Construction
              </option>

              <option value="Hospitality">
                Hospitality
              </option>

              <option value="Sales & Marketing">
                Sales & Marketing
              </option>

              <option value="Finance & Accounting">
                Finance & Accounting
              </option>

              <option value="Human Resources">
                Human Resources
              </option>

            </select>

          </div>


          {/* EMPLOYMENT */}

          <div className="filter-group">

            <label>
              Employment Type
            </label>

            <select
              name="employment_type"
              value={
                filters.employment_type
              }
              onChange={handleChange}
            >
              <option value="">
                All Types
              </option>

              <option value="FULL_TIME">
                Full Time
              </option>

              <option value="PART_TIME">
                Part Time
              </option>

              <option value="CONTRACT">
                Contract
              </option>

              <option value="INTERNSHIP">
                Internship
              </option>

            </select>

          </div>


          {/* WORK MODE */}

          <div className="filter-group">

            <label>
              Work Mode
            </label>

            <select
              name="work_mode"
              value={filters.work_mode}
              onChange={handleChange}
            >
              <option value="">
                All Work Modes
              </option>

              <option value="REMOTE">
                Remote
              </option>

              <option value="HYBRID">
                Hybrid
              </option>

              <option value="ON_SITE">
                On-site
              </option>

            </select>

          </div>


          {/* EXPERIENCE */}

          <div className="filter-group">

            <label>
              Experience
            </label>

            <select
              name="experience"
              value={filters.experience}
              onChange={handleChange}
            >
              <option value="">
                Any Experience
              </option>

              <option value="Fresher">
                Fresher
              </option>

              <option value="0-1">
                0 - 1 years
              </option>

              <option value="1-3">
                1 - 3 years
              </option>

              <option value="3-5">
                3 - 5 years
              </option>

              <option value="5-10">
                5 - 10 years
              </option>

              <option value="10+">
                10+ years
              </option>

            </select>

          </div>

        </aside>


        {/* =================================================
            JOB RESULTS
        ================================================= */}

        <main className="jobs-results">

          <div className="jobs-results-header">

            <div>
              <span>
                JOB OPPORTUNITIES
              </span>

              <h2>
                {loading
                  ? "Finding jobs..."
                  : `${jobs.length} Jobs Found`}
              </h2>
            </div>

          </div>


          {error && (
            <div className="jobs-error">
              {error}
            </div>
          )}


          {loading ? (

            <div className="jobs-loading">
              <div className="loading-spinner" />
              <p>
                Finding the best opportunities
                for you...
              </p>
            </div>

          ) : jobs.length === 0 ? (

            <div className="jobs-empty">

              <div className="empty-icon">
                🔎
              </div>

              <h3>
                No jobs found
              </h3>

              <p>
                Try changing your search
                or filters.
              </p>

              <button
                type="button"
                onClick={clearFilters}
              >
                Clear Filters
              </button>

            </div>

          ) : (

            <div className="jobs-list">

              {jobs.map((job) => (

                <article
                  className="job-result-card"
                  key={job.id}
                >

                  <div className="job-card-top">

                    <div className="company-logo">
                      {job.company_name
                        ?.charAt(0)
                        ?.toUpperCase() ||
                        "V"}
                    </div>

                    <div className="job-card-title">

                      <h3>
                        {job.title}
                      </h3>

                      <p>
                        {job.company_name ||
                          "Vutkal Global"}
                      </p>

                    </div>

                    <button
                      type="button"
                      className="save-job-btn"
                      aria-label="Save job"
                    >
                      ♡
                    </button>

                  </div>


                  <div className="job-meta">

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
                      </span>
                    )}

                  </div>


                  {job.skills && (
                    <div className="job-skills">

                      {job.skills
                        .split(",")
                        .slice(0, 5)
                        .map(
                          (skill, index) => (
                            <span
                              key={index}
                            >
                              {skill.trim()}
                            </span>
                          )
                        )}

                    </div>
                  )}


                 <div className="job-card-bottom">

  <span className="job-posted">
    Posted recently
  </span>

  <Link
    to={`/seeker/jobs/${job.id}`}
    className="view-job-btn"
  >
    View Job →
  </Link>

</div>
                </article>

              ))}

            </div>

          )}

        </main>

      </section>

    </div>
  );
}

export default FindJobs;