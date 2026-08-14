import React, { useState } from "react";
import { createJob } from "../../services/jobService";
import "./PostJob.css";

function PostJob() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    industry: "",
    employment_type: "",
    job_type: "",
    work_mode: "",
    experience_required: "",
    salary_min: "",
    salary_max: "",
    skills: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);


  // =====================================================
  // HANDLE INPUT
  // =====================================================

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };


  // =====================================================
  // RESET FORM
  // =====================================================

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      location: "",
      industry: "",
      employment_type: "",
      job_type: "",
      work_mode: "",
      experience_required: "",
      salary_min: "",
      salary_max: "",
      skills: "",
    });
  };


  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");
    setSubmitting(true);

    try {
      const response =
        await createJob(formData);

      if (response.data.success) {
        setMessage(
          "Job posted successfully."
        );

        resetForm();
      } else {
        setError(
          response.data.message ||
            "Unable to create job."
        );
      }

    } catch (error) {
      console.error(
        "Create job error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Unable to create job."
      );

    } finally {
      setSubmitting(false);
    }
  };


  return (
    <div className="post-job-page">

      {/* =================================================
          PAGE HEADER
      ================================================= */}

      <div className="post-job-header">

        <div>
          <span className="post-job-eyebrow">
            RECRUITMENT
          </span>

          <h1>
            Post a New Job
          </h1>

          <p>
            Create a job opportunity and
            start attracting qualified
            candidates.
          </p>
        </div>

      </div>


      {/* =================================================
          FORM
      ================================================= */}

      <form
        className="post-job-form"
        onSubmit={handleSubmit}
      >


        {/* =================================================
            JOB INFORMATION
        ================================================= */}

        <div className="form-section">

          <div className="form-section-header">

            <div className="form-section-number">
              01
            </div>

            <div>
              <h2>
                Job Information
              </h2>

              <p>
                Provide the basic details
                about this position.
              </p>
            </div>

          </div>


          <div className="form-grid">


            {/* JOB TITLE */}

            <div className="form-group full-width">

              <label htmlFor="title">
                Job Title
              </label>

              <input
                id="title"
                name="title"
                type="text"
                placeholder="e.g. Senior React Developer"
                value={formData.title}
                onChange={handleChange}
                required
              />

            </div>


            {/* DESCRIPTION */}

            <div className="form-group full-width">

              <label htmlFor="description">
                Job Description
              </label>

              <textarea
                id="description"
                name="description"
                placeholder="Describe the role, responsibilities and requirements..."
                value={formData.description}
                onChange={handleChange}
                rows="7"
                required
              />

            </div>


            {/* INDUSTRY */}

            <div className="form-group">

              <label htmlFor="industry">
                Industry
              </label>

              <select
                id="industry"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                required
              >

                <option value="">
                  Select industry
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

                <option value="Other">
                  Other
                </option>

              </select>

            </div>


            {/* LOCATION */}

            <div className="form-group">

              <label htmlFor="location">
                Location
              </label>

              <input
                id="location"
                name="location"
                type="text"
                placeholder="e.g. Hyderabad, India"
                value={formData.location}
                onChange={handleChange}
                required
              />

            </div>


            {/* EMPLOYMENT TYPE */}

            <div className="form-group">

              <label htmlFor="employment_type">
                Employment Type
              </label>

              <select
                id="employment_type"
                name="employment_type"
                value={
                  formData.employment_type
                }
                onChange={handleChange}
                required
              >

                <option value="">
                  Select employment type
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


            {/* JOB TYPE */}

            <div className="form-group">

              <label htmlFor="job_type">
                Job Type
              </label>

              <select
                id="job_type"
                name="job_type"
                value={formData.job_type}
                onChange={handleChange}
                required
              >

                <option value="">
                  Select job type
                </option>

                <option value="PERMANENT">
                  Permanent
                </option>

                <option value="TEMPORARY">
                  Temporary
                </option>

                <option value="FREELANCE">
                  Freelance
                </option>

                <option value="CONTRACT">
                  Contract
                </option>

              </select>

            </div>


            {/* WORK MODE */}

            <div className="form-group">

              <label htmlFor="work_mode">
                Work Mode
              </label>

              <select
                id="work_mode"
                name="work_mode"
                value={formData.work_mode}
                onChange={handleChange}
                required
              >

                <option value="">
                  Select work mode
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

            <div className="form-group">

              <label htmlFor="experience_required">
                Experience Required
              </label>

              <input
                id="experience_required"
                name="experience_required"
                type="text"
                placeholder="e.g. 2-4 years"
                value={
                  formData.experience_required
                }
                onChange={handleChange}
              />

            </div>

          </div>

        </div>


        {/* =================================================
            SALARY & SKILLS
        ================================================= */}

        <div className="form-section">

          <div className="form-section-header">

            <div className="form-section-number">
              02
            </div>

            <div>

              <h2>
                Salary & Skills
              </h2>

              <p>
                Add compensation information
                and required skills.
              </p>

            </div>

          </div>


          <div className="form-grid">


            {/* MINIMUM SALARY */}

            <div className="form-group">

              <label htmlFor="salary_min">
                Minimum Salary
              </label>

              <input
                id="salary_min"
                name="salary_min"
                type="number"
                min="0"
                placeholder="e.g. 40000"
                value={formData.salary_min}
                onChange={handleChange}
              />

            </div>


            {/* MAXIMUM SALARY */}

            <div className="form-group">

              <label htmlFor="salary_max">
                Maximum Salary
              </label>

              <input
                id="salary_max"
                name="salary_max"
                type="number"
                min="0"
                placeholder="e.g. 80000"
                value={formData.salary_max}
                onChange={handleChange}
              />

            </div>


            {/* SKILLS */}

            <div className="form-group full-width">

              <label htmlFor="skills">
                Required Skills
              </label>

              <input
                id="skills"
                name="skills"
                type="text"
                placeholder="e.g. React, Node.js, PostgreSQL, AWS"
                value={formData.skills}
                onChange={handleChange}
              />

              <span className="input-help">
                Separate multiple skills with
                commas.
              </span>

            </div>

          </div>

        </div>


        {/* =================================================
            MESSAGES
        ================================================= */}

        {error && (
          <div className="form-message error">
            <span>!</span>

            {error}
          </div>
        )}


        {message && (
          <div className="form-message success">
            <span>✓</span>

            {message}
          </div>
        )}


        {/* =================================================
            ACTIONS
        ================================================= */}

        <div className="form-actions">

          <button
            type="submit"
            className="post-job-btn"
            disabled={submitting}
          >

            <span>
              {submitting
                ? "Posting..."
                : "Post Job"}
            </span>

            {!submitting && (
              <span className="post-job-arrow">
                →
              </span>
            )}

          </button>

        </div>

      </form>

    </div>
  );
}

export default PostJob;