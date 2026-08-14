import React, {
  useEffect,
  useState,
} from "react";

import {
  getMyProfile,
  updateMyProfile,
} from "../../services/jobSeekerProfileService";

import "./MyProfile.css";

function MyProfile() {

  const [profile, setProfile] =
    useState(null);

  const [formData, setFormData] =
    useState({});

  const [editing, setEditing] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");


  // =====================================================
  // LOAD PROFILE
  // =====================================================

  useEffect(() => {

    const loadProfile = async () => {

      try {

        const response =
          await getMyProfile();

        if (response.data.success) {

          const data =
            response.data.profile;

          setProfile(data);

          setFormData(data);

        }

      } catch (error) {

        console.error(
          "Load profile error:",
          error
        );

        setError(
          error.response?.data?.message ||
          "Unable to load profile."
        );

      } finally {

        setLoading(false);

      }

    };

    loadProfile();

  }, []);


  // =====================================================
  // CHANGE
  // =====================================================

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

  };


  // =====================================================
  // SAVE
  // =====================================================

  const handleSave = async () => {

    try {

      setSaving(true);
      setMessage("");
      setError("");

      const response =
        await updateMyProfile(
          formData
        );

      if (response.data.success) {

        const updated =
          response.data.profile;

        setProfile({
          ...profile,
          ...formData,
          ...updated,
        });

        setFormData({
          ...profile,
          ...formData,
          ...updated,
        });

        setEditing(false);

        setMessage(
          "Profile updated successfully."
        );

      }

    } catch (error) {

      console.error(
        "Update profile error:",
        error
      );

      setError(
        error.response?.data?.message ||
        "Unable to update profile."
      );

    } finally {

      setSaving(false);

    }

  };


  // =====================================================
  // CANCEL
  // =====================================================

  const handleCancel = () => {

    setFormData(profile);

    setEditing(false);

    setMessage("");

    setError("");

  };


  if (loading) {

    return (
      <div className="my-profile-page">

        <div className="profile-loading">
          Loading profile...
        </div>

      </div>
    );

  }


  if (!profile) {

    return (
      <div className="my-profile-page">

        <div className="profile-error">
          {error || "Profile not found."}
        </div>

      </div>
    );

  }


  const fullName =
    profile.full_name ||
    "Job Seeker";

  const initial =
    fullName
      .charAt(0)
      .toUpperCase();


  return (

    <div className="my-profile-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="profile-page-header">

        <div>

          <span className="profile-eyebrow">
            JOB SEEKER
          </span>

          <h1>
            My Profile
          </h1>

          <p>
            Manage your professional
            information and profile.
          </p>

        </div>

        {!editing && (

          <button
            className="profile-edit-btn"
            onClick={() =>
              setEditing(true)
            }
          >
            Edit Profile
          </button>

        )}

      </div>


      {/* =================================================
          MESSAGE
      ================================================= */}

      {message && (
        <div className="profile-success">
          {message}
        </div>
      )}

      {error && (
        <div className="profile-error">
          {error}
        </div>
      )}


      {/* =================================================
          PROFILE HEADER CARD
      ================================================= */}

      <section className="profile-hero">

        <div className="profile-avatar">

          {profile.profile_image ? (

            <img
              src={profile.profile_image}
              alt={fullName}
            />

          ) : (

            initial

          )}

        </div>

        <div className="profile-hero-info">

          <h2>
            {fullName}
          </h2>

          <p>
            {profile.headline ||
              "Job Seeker"}
          </p>

          {profile.location && (

            <span>
              📍 {profile.location}
            </span>

          )}

        </div>

      </section>


      {/* =================================================
          BASIC INFORMATION
      ================================================= */}

      <section className="profile-section">

        <div className="profile-section-heading">

          <span>
            PERSONAL INFORMATION
          </span>

          <h2>
            Contact Details
          </h2>

        </div>


        <div className="profile-grid">

          <div className="profile-field">

            <label>
              Full Name
            </label>

            {editing ? (

              <input
                name="full_name"
                value={
                  formData.full_name || ""
                }
                onChange={
                  handleChange
                }
              />

            ) : (

              <strong>
                {profile.full_name ||
                  "Not provided"}
              </strong>

            )}

          </div>


          <div className="profile-field">

            <label>
              Email
            </label>

            <strong>
              {profile.email}
            </strong>

            <small>
              Email cannot be changed
              here.
            </small>

          </div>


          <div className="profile-field">

            <label>
              Phone
            </label>

            {editing ? (

              <input
                name="phone"
                value={
                  formData.phone || ""
                }
                onChange={
                  handleChange
                }
              />

            ) : (

              <strong>
                {profile.phone ||
                  "Not provided"}
              </strong>

            )}

          </div>


          <div className="profile-field">

            <label>
              Location
            </label>

            {editing ? (

              <input
                name="location"
                value={
                  formData.location ||
                  ""
                }
                onChange={
                  handleChange
                }
              />

            ) : (

              <strong>
                {profile.location ||
                  "Not provided"}
              </strong>

            )}

          </div>

        </div>

      </section>


      {/* =================================================
          PROFESSIONAL
      ================================================= */}

      <section className="profile-section">

        <div className="profile-section-heading">

          <span>
            PROFESSIONAL
          </span>

          <h2>
            Career Information
          </h2>

        </div>


        <div className="profile-grid">

          <div className="profile-field">

            <label>
              Professional Headline
            </label>

            {editing ? (

              <input
                name="headline"
                value={
                  formData.headline ||
                  ""
                }
                onChange={
                  handleChange
                }
                placeholder="e.g. Full Stack Developer"
              />

            ) : (

              <strong>
                {profile.headline ||
                  "Not provided"}
              </strong>

            )}

          </div>


          <div className="profile-field">

            <label>
              Current Job Title
            </label>

            {editing ? (

              <input
                name="current_job_title"
                value={
                  formData.current_job_title ||
                  ""
                }
                onChange={
                  handleChange
                }
              />

            ) : (

              <strong>
                {profile.current_job_title ||
                  "Not provided"}
              </strong>

            )}

          </div>


          <div className="profile-field">

            <label>
              Industry
            </label>

            {editing ? (

              <input
                name="industry"
                value={
                  formData.industry ||
                  ""
                }
                onChange={
                  handleChange
                }
              />

            ) : (

              <strong>
                {profile.industry ||
                  "Not provided"}
              </strong>

            )}

          </div>


          <div className="profile-field">

            <label>
              Experience
            </label>

            {editing ? (

              <input
                type="number"
                step="0.5"
                min="0"
                name="experience_years"
                value={
                  formData.experience_years ||
                  ""
                }
                onChange={
                  handleChange
                }
              />

            ) : (

              <strong>
                {profile.experience_years
                  ? `${profile.experience_years} years`
                  : "Fresher"}
              </strong>

            )}

          </div>

        </div>

      </section>


      {/* =================================================
          ABOUT
      ================================================= */}

      <section className="profile-section">

        <div className="profile-section-heading">

          <span>
            ABOUT
          </span>

          <h2>
            About Me
          </h2>

        </div>


        {editing ? (

          <textarea
            name="bio"
            rows="6"
            value={
              formData.bio || ""
            }
            onChange={
              handleChange
            }
            placeholder="Tell recruiters about yourself..."
          />

        ) : (

          <p className="profile-bio">
            {profile.bio ||
              "No profile summary added yet."}
          </p>

        )}

      </section>


      {/* =================================================
          SKILLS
      ================================================= */}

      <section className="profile-section">

        <div className="profile-section-heading">

          <span>
            EXPERTISE
          </span>

          <h2>
            Skills
          </h2>

        </div>


        {editing ? (

          <input
            name="skills"
            value={
              formData.skills || ""
            }
            onChange={
              handleChange
            }
            placeholder="React, Node.js, Java, Python"
          />

        ) : (

          <div className="profile-skills">

            {profile.skills ? (

              profile.skills
                .split(",")
                .map(
                  (skill, index) => (

                    <span key={index}>
                      {skill.trim()}
                    </span>

                  )
                )

            ) : (

              <p>
                No skills added yet.
              </p>

            )}

          </div>

        )}

      </section>


      {/* =================================================
          EDUCATION
      ================================================= */}

      <section className="profile-section">

        <div className="profile-section-heading">

          <span>
            EDUCATION
          </span>

          <h2>
            Education
          </h2>

        </div>


        {editing ? (

          <textarea
            name="education"
            rows="5"
            value={
              formData.education || ""
            }
            onChange={
              handleChange
            }
            placeholder="B.Tech in Computer Science..."
          />

        ) : (

          <p className="profile-bio">
            {profile.education ||
              "No education information added."}
          </p>

        )}

      </section>


      {/* =================================================
          LINKS
      ================================================= */}

      <section className="profile-section">

        <div className="profile-section-heading">

          <span>
            ONLINE PRESENCE
          </span>

          <h2>
            Professional Links
          </h2>

        </div>


        <div className="profile-grid">

          <div className="profile-field">

            <label>
              LinkedIn
            </label>

            {editing ? (

              <input
                name="linkedin_url"
                value={
                  formData.linkedin_url ||
                  ""
                }
                onChange={
                  handleChange
                }
              />

            ) : (

              <strong>
                {profile.linkedin_url ||
                  "Not provided"}
              </strong>

            )}

          </div>


          <div className="profile-field">

            <label>
              Portfolio
            </label>

            {editing ? (

              <input
                name="portfolio_url"
                value={
                  formData.portfolio_url ||
                  ""
                }
                onChange={
                  handleChange
                }
              />

            ) : (

              <strong>
                {profile.portfolio_url ||
                  "Not provided"}
              </strong>

            )}

          </div>


          <div className="profile-field">

            <label>
              GitHub
            </label>

            {editing ? (

              <input
                name="github_url"
                value={
                  formData.github_url ||
                  ""
                }
                onChange={
                  handleChange
                }
              />

            ) : (

              <strong>
                {profile.github_url ||
                  "Not provided"}
              </strong>

            )}

          </div>

        </div>

      </section>


      {/* =================================================
          ACTIONS
      ================================================= */}

      {editing && (

        <div className="profile-actions">

          <button
            type="button"
            className="profile-cancel-btn"
            onClick={handleCancel}
            disabled={saving}
          >
            Cancel
          </button>

          <button
            type="button"
            className="profile-save-btn"
            onClick={handleSave}
            disabled={saving}
          >
            {saving
              ? "Saving..."
              : "Save Changes"}
          </button>

        </div>

      )}

    </div>

  );
}

export default MyProfile;