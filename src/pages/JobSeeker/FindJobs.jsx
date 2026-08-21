import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import { Link } from "react-router-dom";

import {
  FaSearch,
  FaMapMarkerAlt,
  FaHeart,
  FaRegHeart,
  FaBriefcase,
  FaBuilding,
  FaClock,
  FaChevronDown,
  FaTimes,
  FaSlidersH,
} from "react-icons/fa";

import { getJobs } from "../../services/jobService";

import "./FindJobs.css";


// =====================================================
// CONSTANTS
// =====================================================

const JOBS_PER_PAGE = 10;

const INITIAL_FILTERS = {
  search: "",
  location: "",
  industry: "",
  employment_type: "",
  work_mode: "",
  experience: "",
};


// =====================================================
// FIND JOBS
// =====================================================

function FindJobs() {

  // ===================================================
  // STATE
  // ===================================================

  const [jobs, setJobs] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [filters, setFilters] =
    useState(INITIAL_FILTERS);

  const [searchFilters, setSearchFilters] =
    useState(INITIAL_FILTERS);

  const [sortBy, setSortBy] =
    useState("relevance");

  const [currentPage, setCurrentPage] =
    useState(1);

  const [savedJobs, setSavedJobs] =
    useState(() => {

      try {

        return JSON.parse(
          localStorage.getItem(
            "vutkala_saved_jobs"
          )
        ) || [];

      } catch {

        return [];

      }

    });


  // ===================================================
  // LOAD JOBS
  // ===================================================

  const loadJobs = async () => {

    try {

      setLoading(true);

      setError("");

      const params =
        new URLSearchParams();

      Object.entries(searchFilters).forEach(
        ([key, value]) => {

          if (
            value &&
            String(value).trim()
          ) {

            params.append(
              key,
              String(value).trim()
            );

          }

        }
      );

      const query =
        params.toString()
          ? `?${params.toString()}`
          : "";

      const response =
        await getJobs(query);

      console.log(
        "FIND JOBS RESPONSE:",
        response.data
      );

      if (response.data.success) {

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


  // ===================================================
  // INITIAL LOAD
  // ===================================================

  useEffect(() => {

    loadJobs();

  }, [searchFilters]);


  // ===================================================
  // RESET PAGE WHEN SEARCH CHANGES
  // ===================================================

  useEffect(() => {

    setCurrentPage(1);

  }, [
    searchFilters,
    sortBy,
  ]);


  // ===================================================
  // INPUT CHANGE
  // ===================================================

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


  // ===================================================
  // SEARCH
  // ===================================================

  const handleSearch = (e) => {

    e.preventDefault();

    setSearchFilters({
      ...filters,
    });

  };


  // ===================================================
  // CLEAR ALL FILTERS
  // ===================================================

  const clearFilters = () => {

    setFilters({
      ...INITIAL_FILTERS,
    });

    setSearchFilters({
      ...INITIAL_FILTERS,
    });

    setCurrentPage(1);

  };


  // ===================================================
  // REMOVE SINGLE FILTER
  // ===================================================

  const removeFilter = (key) => {

    const updatedFilters = {
      ...filters,
      [key]: "",
    };

    setFilters(updatedFilters);

    setSearchFilters(updatedFilters);

    setCurrentPage(1);

  };


  // ===================================================
  // SAVE / UNSAVE JOB
  // ===================================================

  const toggleSaveJob = (jobId) => {

    setSavedJobs((current) => {

      let updated;

      if (current.includes(jobId)) {

        updated =
          current.filter(
            (id) => id !== jobId
          );

      } else {

        updated = [
          ...current,
          jobId,
        ];

      }

      localStorage.setItem(
        "vutkala_saved_jobs",
        JSON.stringify(updated)
      );

      return updated;

    });

  };


  // ===================================================
  // SORT JOBS
  // ===================================================

  const sortedJobs = useMemo(() => {

    const result = [
      ...jobs,
    ];

    if (sortBy === "latest") {

      result.sort(
        (a, b) => {

          const dateA =
            new Date(
              a.created_at ||
              a.posted_at ||
              0
            );

          const dateB =
            new Date(
              b.created_at ||
              b.posted_at ||
              0
            );

          return dateB - dateA;

        }
      );

    }

    return result;

  }, [
    jobs,
    sortBy,
  ]);


  // ===================================================
  // PAGINATION
  // ===================================================

  const totalPages =
    Math.ceil(
      sortedJobs.length /
        JOBS_PER_PAGE
    );

  const startIndex =
    (currentPage - 1) *
      JOBS_PER_PAGE;

  const visibleJobs =
    sortedJobs.slice(
      startIndex,
      startIndex +
        JOBS_PER_PAGE
    );


  // ===================================================
  // ACTIVE FILTERS
  // ===================================================

  const activeFilters =
    Object.entries(searchFilters)
      .filter(
        ([, value]) =>
          value &&
          String(value).trim()
      );


  // ===================================================
  // FORMAT DATE
  // ===================================================

  const getPostedText = (job) => {

    const date =
      job.created_at ||
      job.posted_at ||
      job.applied_at;

    if (!date) {

      return "Posted recently";

    }

    const created =
      new Date(date);

    if (
      Number.isNaN(
        created.getTime()
      )
    ) {

      return "Posted recently";

    }

    const now =
      new Date();

    const difference =
      Math.floor(
        (
          now - created
        ) /
          (
            1000 *
            60 *
            60 *
            24
          )
      );

    if (difference <= 0) {

      return "Posted today";

    }

    if (difference === 1) {

      return "Posted 1 day ago";

    }

    if (difference < 30) {

      return `Posted ${difference} days ago`;

    }

    return created.toLocaleDateString(
      "en-IN"
    );

  };


  // ===================================================
  // LOADING
  // ===================================================

  if (loading) {

    return (

      <div className="find-jobs-page">

        <section className="find-jobs-loading-page">

          <div className="loading-spinner" />

          <h2>
            Finding jobs for you
          </h2>

          <p>
            Searching the latest
            opportunities...
          </p>

        </section>

      </div>

    );

  }


  // ===================================================
  // UI
  // ===================================================

  return (

    <div className="find-jobs-page">

      {/* =================================================
          HERO
      ================================================= */}

      <section className="find-jobs-hero">

        <div className="find-jobs-hero-inner">

          <div className="find-jobs-eyebrow">
            VUTKALA CAREERS
          </div>

          <h1>
            Find your next
            <span>
              {" "}career opportunity.
            </span>
          </h1>

          <p>
            Search thousands of opportunities
            across technology, healthcare,
            BFSI, manufacturing, education
            and more.
          </p>


          {/* SEARCH */}

          <form
            className="job-search-bar"
            onSubmit={handleSearch}
          >

            <div className="search-field">

              <FaSearch className="search-icon" />

              <input
                name="search"
                value={
                  filters.search
                }
                onChange={
                  handleChange
                }
                placeholder="Job title, skills or company"
              />

            </div>


            <div className="search-divider" />


            <div className="search-field">

              <FaMapMarkerAlt className="search-icon" />

              <input
                name="location"
                value={
                  filters.location
                }
                onChange={
                  handleChange
                }
                placeholder="Location"
              />

            </div>


            <button
              type="submit"
              className="search-jobs-btn"
            >

              <FaSearch />

              Search Jobs

            </button>

          </form>

        </div>

      </section>


      {/* =================================================
          ACTIVE FILTERS
      ================================================= */}

      {activeFilters.length > 0 && (

        <div className="active-filters-wrapper">

          <div className="active-filters">

            <span className="active-filter-label">
              Active filters:
            </span>

            {activeFilters.map(
              ([key, value]) => (

                <button
                  type="button"
                  className="active-filter-chip"
                  key={key}
                  onClick={() =>
                    removeFilter(key)
                  }
                >

                  {value}

                  <FaTimes />

                </button>

              )
            )}

            <button
              type="button"
              className="clear-active-filters"
              onClick={clearFilters}
            >
              Clear all
            </button>

          </div>

        </div>

      )}


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
                <FaSlidersH />
                FILTERS
              </span>

              <h2>
                Refine Results
              </h2>

            </div>

            <button
              type="button"
              onClick={
                clearFilters
              }
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
              value={
                filters.industry
              }
              onChange={
                handleChange
              }
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
              onChange={
                handleChange
              }
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
              value={
                filters.work_mode
              }
              onChange={
                handleChange
              }
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
              value={
                filters.experience
              }
              onChange={
                handleChange
              }
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


          {/* APPLY FILTER */}

          <button
            type="button"
            className="apply-filter-btn"
            onClick={() => {

              setSearchFilters({
                ...filters,
              });

            }}
          >
            Apply Filters
          </button>

        </aside>


        {/* =================================================
            RESULTS
        ================================================= */}

        <main className="jobs-results">

          {/* RESULTS HEADER */}

          <div className="jobs-results-header">

            <div>

              <span>
                JOB OPPORTUNITIES
              </span>

              <h2>
                {jobs.length} Jobs Found
              </h2>

            </div>


            <div className="jobs-sort">

              <span>
                Sort by
              </span>

              <div className="sort-select">

                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(
                      e.target.value
                    )
                  }
                >

                  <option value="relevance">
                    Relevance
                  </option>

                  <option value="latest">
                    Latest
                  </option>

                </select>

                <FaChevronDown />

              </div>

            </div>

          </div>


          {/* ERROR */}

          {error && (

            <div className="jobs-error">

              {error}

            </div>

          )}


          {/* EMPTY */}

          {jobs.length === 0 ? (

            <div className="jobs-empty">

              <div className="empty-icon">
                <FaSearch />
              </div>

              <h3>
                No jobs found
              </h3>

              <p>
                We couldn't find jobs matching
                your search. Try changing your
                keywords or filters.
              </p>

              <button
                type="button"
                onClick={
                  clearFilters
                }
              >
                Clear Filters
              </button>

            </div>

          ) : (

            <>

              {/* JOB LIST */}

              <div className="jobs-list">

                {visibleJobs.map(
                  (job) => {

                    const isSaved =
                      savedJobs.includes(
                        job.id
                      );

                    return (

                      <article
                        className="job-result-card"
                        key={job.id}
                      >

                        {/* TOP */}

                        <div className="job-card-top">

                          <div className="company-logo">

                            {job.company_name
                              ?.charAt(0)
                              ?.toUpperCase() ||
                              "V"}

                          </div>


                          <div className="job-card-title">

                            <Link
                              to={`/seeker/jobs/${job.id}`}
                            >

                              <h3>
                                {job.title}
                              </h3>

                            </Link>

                            <p>

                              <FaBuilding />

                              {job.company_name ||
                                "Vutkala Global"}

                            </p>

                          </div>


                          {/* SAVE */}

                          <button
                            type="button"
                            className={`save-job-btn ${
                              isSaved
                                ? "saved"
                                : ""
                            }`}
                            aria-label={
                              isSaved
                                ? "Unsave job"
                                : "Save job"
                            }
                            onClick={() =>
                              toggleSaveJob(
                                job.id
                              )
                            }
                          >

                            {isSaved ? (
                              <FaHeart />
                            ) : (
                              <FaRegHeart />
                            )}

                          </button>

                        </div>


                        {/* META */}

                        <div className="job-meta">

                          {job.location && (

                            <span>

                              <FaMapMarkerAlt />

                              {job.location}

                            </span>

                          )}

                          {job.experience_required && (

                            <span>

                              <FaBriefcase />

                              {job.experience_required}

                            </span>

                          )}

                          {job.employment_type && (

                            <span>

                              {job.employment_type}

                            </span>

                          )}

                          {job.work_mode && (

                            <span>

                              {job.work_mode}

                            </span>

                          )}

                        </div>


                        {/* SALARY */}

                        {(
                          job.salary_min ||
                          job.salary_max ||
                          job.salary
                        ) && (

                          <div className="job-salary">

                            ₹{" "}

                            {job.salary ||
                              (
                                job.salary_min &&
                                job.salary_max
                                  ? `${job.salary_min} - ${job.salary_max}`
                                  : job.salary_min ||
                                    job.salary_max
                              )}

                          </div>

                        )}


                        {/* SKILLS */}

                        {job.skills && (

                          <div className="job-skills">

                            {String(
                              job.skills
                            )
                              .split(",")
                              .slice(0, 6)
                              .map(
                                (
                                  skill,
                                  index
                                ) => (

                                  <span
                                    key={
                                      index
                                    }
                                  >
                                    {
                                      skill.trim()
                                    }
                                  </span>

                                )
                              )}

                          </div>

                        )}


                        {/* BOTTOM */}

                        <div className="job-card-bottom">

                          <span className="job-posted">

                            <FaClock />

                            {getPostedText(
                              job
                            )}

                          </span>


                          <Link
                            to={`/seeker/jobs/${job.id}`}
                            className="view-job-btn"
                          >
                            View Details
                          </Link>

                        </div>

                      </article>

                    );

                  }
                )}

              </div>


              {/* PAGINATION */}

              {totalPages > 1 && (

                <div className="jobs-pagination">

                  <button
                    type="button"
                    disabled={
                      currentPage === 1
                    }
                    onClick={() =>
                      setCurrentPage(
                        (page) =>
                          Math.max(
                            1,
                            page - 1
                          )
                      )
                    }
                  >
                    Previous
                  </button>


                  {Array.from(
                    {
                      length:
                        totalPages,
                    },
                    (_, index) =>
                      index + 1
                  )
                    .slice(
                      Math.max(
                        0,
                        currentPage - 3
                      ),
                      Math.min(
                        totalPages,
                        currentPage + 2
                      )
                    )
                    .map(
                      (page) => (

                        <button
                          type="button"
                          key={page}
                          className={
                            currentPage ===
                            page
                              ? "active"
                              : ""
                          }
                          onClick={() =>
                            setCurrentPage(
                              page
                            )
                          }
                        >
                          {page}
                        </button>

                      )
                    )}


                  <button
                    type="button"
                    disabled={
                      currentPage ===
                      totalPages
                    }
                    onClick={() =>
                      setCurrentPage(
                        (page) =>
                          Math.min(
                            totalPages,
                            page + 1
                          )
                      )
                    }
                  >
                    Next
                  </button>

                </div>

              )}

            </>

          )}

        </main>

      </section>

    </div>

  );

}


export default FindJobs;