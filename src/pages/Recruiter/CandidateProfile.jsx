import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./CandidateProfile.css";

const candidatesApi = axios.create({
  baseURL: "/api/candidates",
  withCredentials: true,
});

const getSkills = (skills) => {
  if (!skills) return [];

  if (Array.isArray(skills)) {
    return skills
      .map((skill) =>
        typeof skill === "string"
          ? skill.trim()
          : skill?.name || skill?.skill_name || ""
      )
      .filter(Boolean);
  }

  return String(skills)
    .split(",")
    .map((skill) => skill.trim())
    .filter(Boolean);
};

const getInitials = (name) => {
  if (!name) return "C";

  const parts = name.trim().split(/\s+/);

  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }

  return (
    parts[0].charAt(0) +
    parts[parts.length - 1].charAt(0)
  ).toUpperCase();
};

export default function CandidateProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCandidate();
  }, [id]);

  const fetchCandidate = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await candidatesApi.get(`/${id}`);

      if (!response.data?.success) {
        throw new Error(
          response.data?.message ||
            "Unable to load candidate."
        );
      }

      setCandidate(response.data.candidate);
    } catch (err) {
      console.error(
        "Candidate profile error:",
        err
      );

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to load candidate profile."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="candidate-profile-page">
        <div className="candidate-profile-loading">
          <div className="candidate-profile-spinner" />
          <h2>Loading candidate profile...</h2>
          <p>Please wait while we load the profile.</p>
        </div>
      </main>
    );
  }

  if (error || !candidate) {
    return (
      <main className="candidate-profile-page">
        <div className="candidate-profile-error">
          <div className="candidate-profile-error-icon">
            !
          </div>

          <h2>Unable to load profile</h2>

          <p>{error || "Candidate not found."}</p>

          <div className="candidate-profile-error-actions">
            <button
              type="button"
              onClick={fetchCandidate}
            >
              Try Again
            </button>

            <button
              type="button"
              onClick={() =>
                navigate("/recruiter/candidates")
              }
            >
              Back to Candidates
            </button>
          </div>
        </div>
      </main>
    );
  }

  const name =
    candidate.full_name ||
    candidate.name ||
    "Candidate";

  const email =
    candidate.email || "";

  const phone =
    candidate.phone || "";

  const location =
    candidate.location ||
    "Location not specified";

  const headline =
    candidate.headline ||
    candidate.current_job_title ||
    "Job Seeker";

  const experience =
    candidate.experience_years;

  const skills =
    getSkills(candidate.skills);

  const education =
    candidate.education;

  const resumeUrl =
    candidate.resume_url;

  const linkedinUrl =
    candidate.linkedin_url;

  const githubUrl =
    candidate.github_url;

  const portfolioUrl =
    candidate.portfolio_url;

  const profileImage =
    candidate.profile_image;

  return (
    <main className="candidate-profile-page">

      {/* =====================================================
          TOP NAVIGATION
      ===================================================== */}

      <div className="candidate-profile-breadcrumb">

        <button
          type="button"
          onClick={() =>
            navigate("/recruiter/candidates")
          }
          className="candidate-back-button"
        >
          ← Back to Candidates
        </button>

        <span>
          Recruiter / Candidate Profile
        </span>

      </div>


      {/* =====================================================
          PROFILE HERO
      ===================================================== */}

      <section className="candidate-profile-hero">

        <div className="candidate-profile-identity">

          {profileImage ? (
            <img
              src={profileImage}
              alt={name}
              className="candidate-profile-avatar-image"
            />
          ) : (
            <div className="candidate-profile-avatar">
              {getInitials(name)}
            </div>
          )}

          <div className="candidate-profile-title">

            <span className="candidate-profile-label">
              CANDIDATE PROFILE
            </span>

            <h1>{name}</h1>

            <p className="candidate-profile-headline">
              {headline}
            </p>

            <div className="candidate-profile-meta">

              <span>
                📍 {location}
              </span>

              {experience !== null &&
                experience !== undefined &&
                experience !== "" && (
                  <span>
                    💼 {experience}{" "}
                    {Number(experience) === 1
                      ? "year"
                      : "years"}{" "}
                    experience
                  </span>
                )}

              {candidate.industry && (
                <span>
                  🏢 {candidate.industry}
                </span>
              )}

            </div>

          </div>

        </div>


        {/* ===================================================
            HERO ACTIONS
        =================================================== */}

        <div className="candidate-profile-actions">

          <Link
            to={`/recruiter/candidates/${id}/contact`}
            className="candidate-primary-action"
          >
            ✉ Contact Candidate
          </Link>

          {resumeUrl && (
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="candidate-secondary-action"
            >
              View Resume
            </a>
          )}

        </div>

      </section>


      {/* =====================================================
          CONTACT SUMMARY
      ===================================================== */}

      <section className="candidate-contact-summary">

        <div className="candidate-contact-item">

          <span className="candidate-contact-icon">
            ✉
          </span>

          <div>
            <small>Email</small>

            <strong>
              {email || "Not provided"}
            </strong>
          </div>

        </div>


        <div className="candidate-contact-item">

          <span className="candidate-contact-icon">
            ☎
          </span>

          <div>
            <small>Phone</small>

            <strong>
              {phone || "Not provided"}
            </strong>
          </div>

        </div>


        <div className="candidate-contact-item">

          <span className="candidate-contact-icon">
            📍
          </span>

          <div>
            <small>Location</small>

            <strong>
              {location}
            </strong>
          </div>

        </div>

      </section>


      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div className="candidate-profile-grid">

        {/* ===================================================
            LEFT COLUMN
        =================================================== */}

        <div className="candidate-profile-main">


          {/* ABOUT */}

          <section className="candidate-profile-section">

            <div className="candidate-section-heading">

              <span className="candidate-section-number">
                01
              </span>

              <div>
                <span>PROFILE</span>
                <h2>About</h2>
              </div>

            </div>

            <div className="candidate-section-content">

              {candidate.bio ? (
                <p className="candidate-about-text">
                  {candidate.bio}
                </p>
              ) : (
                <div className="candidate-no-data">
                  <span>—</span>
                  <p>
                    This candidate hasn't added
                    an about section yet.
                  </p>
                </div>
              )}

            </div>

          </section>


          {/* SKILLS */}

          <section className="candidate-profile-section">

            <div className="candidate-section-heading">

              <span className="candidate-section-number">
                02
              </span>

              <div>
                <span>EXPERTISE</span>
                <h2>Skills</h2>
              </div>

            </div>

            <div className="candidate-section-content">

              {skills.length > 0 ? (
                <div className="candidate-skills-list">

                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="candidate-skill"
                    >
                      {skill}
                    </span>
                  ))}

                </div>
              ) : (
                <div className="candidate-no-data">
                  <span>—</span>
                  <p>
                    No skills have been added
                    to this profile yet.
                  </p>
                </div>
              )}

            </div>

          </section>


          {/* EXPERIENCE */}

          <section className="candidate-profile-section">

            <div className="candidate-section-heading">

              <span className="candidate-section-number">
                03
              </span>

              <div>
                <span>CAREER</span>
                <h2>Experience</h2>
              </div>

            </div>

            <div className="candidate-section-content">

              <div className="candidate-experience-card">

                <div className="candidate-experience-icon">
                  💼
                </div>

                <div>

                  <h3>
                    {candidate.current_job_title ||
                      "Professional"}
                  </h3>

                  {candidate.industry && (
                    <p>
                      {candidate.industry}
                    </p>
                  )}

                  {experience !== null &&
                    experience !== undefined &&
                    experience !== "" && (
                      <span>
                        {experience}{" "}
                        {Number(experience) === 1
                          ? "year"
                          : "years"}{" "}
                        of experience
                      </span>
                    )}

                </div>

              </div>

            </div>

          </section>


          {/* EDUCATION */}

          <section className="candidate-profile-section">

            <div className="candidate-section-heading">

              <span className="candidate-section-number">
                04
              </span>

              <div>
                <span>ACADEMIC</span>
                <h2>Education</h2>
              </div>

            </div>

            <div className="candidate-section-content">

              {education ? (
                <div className="candidate-education-card">

                  <div className="candidate-education-icon">
                    🎓
                  </div>

                  <div>

                    <h3>
                      {education}
                    </h3>

                    <p>
                      Educational qualification
                    </p>

                  </div>

                </div>
              ) : (
                <div className="candidate-no-data">
                  <span>—</span>
                  <p>
                    Education details have not
                    been added yet.
                  </p>
                </div>
              )}

            </div>

          </section>

        </div>


        {/* ===================================================
            RIGHT SIDEBAR
        =================================================== */}

        <aside className="candidate-profile-sidebar">


          {/* QUICK ACTIONS */}

          <div className="candidate-sidebar-card candidate-sidebar-actions">

            <span className="candidate-sidebar-label">
              RECRUITER ACTIONS
            </span>

            <h3>
              Interested in this candidate?
            </h3>

            <p>
              Start a conversation and discuss
              your opportunity directly.
            </p>

            <Link
              to={`/recruiter/candidates/${id}/contact`}
              className="candidate-sidebar-contact"
            >
              ✉ Contact Candidate
            </Link>

            {resumeUrl && (
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="candidate-sidebar-resume"
              >
                📄 View Resume
              </a>
            )}

          </div>


          {/* LINKS */}

          {(linkedinUrl ||
            githubUrl ||
            portfolioUrl) && (

            <div className="candidate-sidebar-card">

              <span className="candidate-sidebar-label">
                ONLINE PRESENCE
              </span>

              <div className="candidate-social-links">

                {linkedinUrl && (
                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>in</span>
                    LinkedIn
                    <b>↗</b>
                  </a>
                )}

                {githubUrl && (
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>⌘</span>
                    GitHub
                    <b>↗</b>
                  </a>
                )}

                {portfolioUrl && (
                  <a
                    href={portfolioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>◉</span>
                    Portfolio
                    <b>↗</b>
                  </a>
                )}

              </div>

            </div>

          )}


          {/* CANDIDATE INFO */}

          <div className="candidate-sidebar-card">

            <span className="candidate-sidebar-label">
              PROFILE INFORMATION
            </span>

            <div className="candidate-info-list">

              <div>
                <span>Profile ID</span>
                <strong>
                  {candidate.id
                    ? candidate.id.slice(0, 8)
                    : "—"}
                </strong>
              </div>

              <div>
                <span>Location</span>
                <strong>
                  {location}
                </strong>
              </div>

              <div>
                <span>Industry</span>
                <strong>
                  {candidate.industry ||
                    "Not specified"}
                </strong>
              </div>

              <div>
                <span>Experience</span>
                <strong>
                  {experience !== null &&
                  experience !== undefined &&
                  experience !== ""
                    ? `${experience} years`
                    : "Not specified"}
                </strong>

                <Link
  to={`/recruiter/candidates/${id}/contact`}
  className="candidate-primary-action"
>
  ✉ Contact Candidate
</Link>
              </div>

            </div>

          </div>

        </aside>

      </div>

    </main>
  );
}