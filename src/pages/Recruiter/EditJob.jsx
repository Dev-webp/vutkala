import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getJob,
  updateJob,
} from "../../services/jobService";

function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    employment_type: "",
    experience_required: "",
    salary_min: "",
    salary_max: "",
    skills: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");


  /*
  ========================================================
  LOAD JOB
  ========================================================
  */

  useEffect(() => {
    const loadJob = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getJob(id);

        if (!response.data.success) {
          setError(
            response.data.message ||
              "Unable to load job."
          );

          return;
        }

        const job = response.data.job;

        /*
        Load existing job values into form
        */

        setFormData({
          title: job.title || "",
          description: job.description || "",
          location: job.location || "",
          employment_type:
            job.employment_type || "",
          experience_required:
            job.experience_required || "",
          salary_min:
            job.salary_min || "",
          salary_max:
            job.salary_max || "",
          skills: job.skills || "",
        });

      } catch (error) {
        console.error(
          "Load job error:",
          error
        );

        setError(
          error.response?.data?.message ||
            "Unable to load job."
        );

      } finally {
        setLoading(false);
      }
    };

    loadJob();
  }, [id]);


  /*
  ========================================================
  HANDLE INPUT
  ========================================================
  */

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  /*
  ========================================================
  SAVE JOB
  ========================================================
  */

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    /*
    Basic validation
    */

    if (
      !formData.title.trim() ||
      !formData.description.trim()
    ) {
      setError(
        "Job title and description are required."
      );

      return;
    }

    /*
    Salary validation
    */

    if (
      formData.salary_min !== "" &&
      formData.salary_max !== "" &&
      Number(formData.salary_min) >
        Number(formData.salary_max)
    ) {
      setError(
        "Minimum salary cannot be greater than maximum salary."
      );

      return;
    }

    try {
      setSaving(true);

      const response = await updateJob(
        id,
        {
          title: formData.title,
          description: formData.description,
          location: formData.location,
          employment_type:
            formData.employment_type,
          experience_required:
            formData.experience_required,
          salary_min:
            formData.salary_min === ""
              ? null
              : Number(formData.salary_min),
          salary_max:
            formData.salary_max === ""
              ? null
              : Number(formData.salary_max),
          skills: formData.skills,
        }
      );

      if (response.data.success) {
        setMessage(
          "Job updated successfully."
        );

        /*
        Go back to My Jobs after
        a short delay.
        */

        setTimeout(() => {
          navigate(
            "/recruiter/my-jobs"
          );
        }, 800);

      } else {
        setError(
          response.data.message ||
            "Unable to update job."
        );
      }

    } catch (error) {
      console.error(
        "Update job error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Unable to update job."
      );

    } finally {
      setSaving(false);
    }
  };


  /*
  ========================================================
  LOADING
  ========================================================
  */

  if (loading) {
    return (
      <div className="edit-job-page">
        <h1>Edit Job</h1>
        <p>Loading job...</p>
      </div>
    );
  }


  /*
  ========================================================
  PAGE
  ========================================================
  */

  return (
    <div className="edit-job-page">

      <h1>Edit Job</h1>

      <p>
        Update the details of your job posting.
      </p>


      {error && (
        <p className="error">
          {error}
        </p>
      )}


      {message && (
        <p className="success">
          {message}
        </p>
      )}


      <form onSubmit={handleSubmit}>


        {/* JOB TITLE */}

        <div>
          <label>
            Job Title
          </label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Job Title"
            disabled={saving}
          />
        </div>


        {/* DESCRIPTION */}

        <div>
          <label>
            Description
          </label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Job Description"
            rows="6"
            disabled={saving}
          />
        </div>


        {/* LOCATION */}

        <div>
          <label>
            Location
          </label>

          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            disabled={saving}
          />
        </div>


        {/* EMPLOYMENT TYPE */}

        <div>
          <label>
            Employment Type
          </label>

          <select
            name="employment_type"
            value={
              formData.employment_type
            }
            onChange={handleChange}
            disabled={saving}
          >
            <option value="">
              Select Employment Type
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

            <option value="REMOTE">
              Remote
            </option>

          </select>
        </div>


        {/* EXPERIENCE */}

        <div>
          <label>
            Experience Required
          </label>

          <input
            type="text"
            name="experience_required"
            value={
              formData.experience_required
            }
            onChange={handleChange}
            placeholder="Example: 2+ years"
            disabled={saving}
          />
        </div>


        {/* MINIMUM SALARY */}

        <div>
          <label>
            Minimum Salary
          </label>

          <input
            type="number"
            name="salary_min"
            value={formData.salary_min}
            onChange={handleChange}
            placeholder="Minimum Salary"
            min="0"
            disabled={saving}
          />
        </div>


        {/* MAXIMUM SALARY */}

        <div>
          <label>
            Maximum Salary
          </label>

          <input
            type="number"
            name="salary_max"
            value={formData.salary_max}
            onChange={handleChange}
            placeholder="Maximum Salary"
            min="0"
            disabled={saving}
          />
        </div>


        {/* SKILLS */}

        <div>
          <label>
            Skills
          </label>

          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            placeholder="React, Node.js, PostgreSQL"
            disabled={saving}
          />
        </div>


        {/* BUTTONS */}

        <div className="edit-job-actions">

          <button
            type="submit"
            disabled={saving}
          >
            {saving
              ? "Saving..."
              : "Save Changes"}
          </button>


          <button
            type="button"
            disabled={saving}
            onClick={() =>
              navigate(
                "/recruiter/my-jobs"
              )
            }
          >
            Cancel
          </button>

        </div>

      </form>

    </div>
  );
}

export default EditJob;