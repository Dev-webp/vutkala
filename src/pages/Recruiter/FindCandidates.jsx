import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./FindCandidates.css";

/* =========================================================
   API
   ========================================================= */

const candidatesApi = axios.create({
  baseURL: "/api/candidates",
  withCredentials: true,
});


/* =========================================================
   HELPERS
   ========================================================= */

const getCandidateId = (candidate) => {
  return (
    candidate?.id ||
    candidate?.candidate_id ||
    candidate?.user_id ||
    candidate?.auth_user_id ||
    candidate?._id
  );
};


const getCandidateName = (candidate) => {
  return (
    candidate?.name ||
    candidate?.full_name ||
    candidate?.fullName ||
    candidate?.candidate_name ||
    candidate?.user?.name ||
    candidate?.user?.full_name ||
    candidate?.profile?.name ||
    "Candidate"
  );
};


const getCandidateEmail = (candidate) => {
  return (
    candidate?.email ||
    candidate?.user?.email ||
    candidate?.candidate_email ||
    ""
  );
};


const getCandidatePhone = (candidate) => {
  return (
    candidate?.phone ||
    candidate?.phone_number ||
    candidate?.mobile ||
    candidate?.mobile_number ||
    candidate?.user?.phone ||
    ""
  );
};


const getCandidateLocation = (candidate) => {
  return (
    candidate?.location ||
    candidate?.city ||
    candidate?.current_location ||
    candidate?.preferred_location ||
    candidate?.profile?.location ||
    "Location not specified"
  );
};


const getCandidateHeadline = (candidate) => {
  return (
    candidate?.headline ||
    candidate?.designation ||
    candidate?.job_title ||
    candidate?.current_position ||
    candidate?.professional_title ||
    candidate?.profile?.headline ||
    "Job Seeker"
  );
};


const getCandidateExperience = (candidate) => {
  const experience =
    candidate?.experience ||
    candidate?.experience_years ||
    candidate?.years_of_experience ||
    candidate?.total_experience ||
    candidate?.profile?.experience;

  if (
    experience === null ||
    experience === undefined ||
    experience === ""
  ) {
    return "Experience not specified";
  }

  if (
    typeof experience === "number"
  ) {
    return `${experience} ${
      experience === 1 ? "year" : "years"
    } experience`;
  }

  return String(experience);
};


const getCandidateEducation = (candidate) => {
  return (
    candidate?.education ||
    candidate?.highest_education ||
    candidate?.qualification ||
    candidate?.degree ||
    candidate?.profile?.education ||
    ""
  );
};


const getCandidateSkills = (candidate) => {
  const skills =
    candidate?.skills ||
    candidate?.skill_list ||
    candidate?.profile?.skills ||
    [];

  if (Array.isArray(skills)) {
    return skills
      .map((skill) => {
        if (typeof skill === "string") {
          return skill;
        }

        return (
          skill?.name ||
          skill?.skill_name ||
          skill?.title ||
          ""
        );
      })
      .filter(Boolean);
  }

  if (typeof skills === "string") {
    return skills
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);
  }

  return [];
};


const getCandidateResume = (candidate) => {
  return (
    candidate?.resume_url ||
    candidate?.resumeUrl ||
    candidate?.resume ||
    candidate?.cv_url ||
    candidate?.cvUrl ||
    candidate?.profile?.resume_url ||
    ""
  );
};


const getCandidateAvailability = (candidate) => {
  return (
    candidate?.availability ||
    candidate?.available_from ||
    candidate?.job_availability ||
    candidate?.profile?.availability ||
    ""
  );
};


const getCandidateWorkMode = (candidate) => {
  return (
    candidate?.work_mode ||
    candidate?.preferred_work_mode ||
    candidate?.workMode ||
    candidate?.profile?.work_mode ||
    ""
  );
};


const getInitials = (name) => {
  if (!name) return "C";

  const parts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (parts.length === 1) {
    return parts[0]
      .charAt(0)
      .toUpperCase();
  }

  return (
    parts[0].charAt(0) +
    parts[parts.length - 1].charAt(0)
  ).toUpperCase();
};


/* =========================================================
   NORMALIZE API RESPONSE
   ========================================================= */

const normalizeCandidatesResponse = (data) => {
  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data?.candidates)) {
    return data.candidates;
  }

  if (Array.isArray(data?.data)) {
    return data.data;
  }

  if (Array.isArray(data?.results)) {
    return data.results;
  }

  if (Array.isArray(data?.users)) {
    return data.users;
  }

  return [];
};


/* =========================================================
   MAIN COMPONENT
   ========================================================= */

export default function FindCandidates() {

  /* -------------------------------------------------------
     DATA
  ------------------------------------------------------- */

  const [candidates, setCandidates] =
    useState([]);


  /* -------------------------------------------------------
     LOADING / ERROR
  ------------------------------------------------------- */

  const [loading, setLoading] =
    useState(true);

  const [searching, setSearching] =
    useState(false);

  const [error, setError] =
    useState("");


  /* -------------------------------------------------------
     SEARCH
  ------------------------------------------------------- */

  const [search, setSearch] =
    useState("");

  const [location, setLocation] =
    useState("");

  const [experience, setExperience] =
    useState("");

  const [workMode, setWorkMode] =
    useState("");

  const [education, setEducation] =
    useState("");


  /* -------------------------------------------------------
     SKILLS
  ------------------------------------------------------- */

  const [skillInput, setSkillInput] =
    useState("");

  const [selectedSkills, setSelectedSkills] =
    useState([]);


  /* -------------------------------------------------------
     UI
  ------------------------------------------------------- */

  const [showFilters, setShowFilters] =
    useState(true);

  const [sortBy, setSortBy] =
    useState("relevance");


  /* -------------------------------------------------------
     CONTACT MODAL
  ------------------------------------------------------- */

  const [contactCandidate, setContactCandidate] =
    useState(null);

  const [emailSubject, setEmailSubject] =
    useState("");

  const [emailMessage, setEmailMessage] =
    useState("");

  const [sendingEmail, setSendingEmail] =
    useState(false);

  const [emailError, setEmailError] =
    useState("");

  const [emailSuccess, setEmailSuccess] =
    useState("");


  /* =======================================================
     FETCH CANDIDATES
     ======================================================= */

  const fetchCandidates = async (
    useFilters = true
  ) => {

    try {

      setSearching(true);
      setError("");


      const params = {};


      if (useFilters) {

        if (search.trim()) {
          params.search =
            search.trim();
        }

        if (location.trim()) {
          params.location =
            location.trim();
        }

        if (experience) {
          params.experience =
            experience;
        }

        if (workMode) {
          params.work_mode =
            workMode;
        }

        if (education) {
          params.education =
            education;
        }

        if (selectedSkills.length > 0) {

          params.skills =
            selectedSkills.join(",");

        }

      }


      const response =
        await candidatesApi.get(
          "/",
          {
            params,
          }
        );


      const list =
        normalizeCandidatesResponse(
          response?.data
        );


      setCandidates(list);

    } catch (err) {

      console.error(
        "Find candidates error:",
        err
      );

      console.error(
        "API response:",
        err?.response?.data
      );


      if (
        err?.response?.status === 404
      ) {

        setError(
          "Candidate search API was not found. Please make sure GET /api/candidates is available in the backend."
        );

      } else {

        setError(
          err?.response?.data?.message ||
          err?.response?.data?.error ||
          "Unable to load candidates."
        );

      }

    } finally {

      setLoading(false);
      setSearching(false);

    }

  };


  /* =======================================================
     INITIAL LOAD
     ======================================================= */

  useEffect(() => {

    fetchCandidates(false);

  }, []);


  /* =======================================================
     ADD SKILL
     ======================================================= */

  const addSkill = () => {

    const value =
      skillInput.trim();

    if (!value) return;


    const exists =
      selectedSkills.some(
        (skill) =>
          skill.toLowerCase() ===
          value.toLowerCase()
      );


    if (exists) {

      setSkillInput("");

      return;

    }


    setSelectedSkills(
      (previous) => [
        ...previous,
        value,
      ]
    );


    setSkillInput("");

  };


  /* =======================================================
     REMOVE SKILL
     ======================================================= */

  const removeSkill = (skillToRemove) => {

    setSelectedSkills(
      (previous) =>
        previous.filter(
          (skill) =>
            skill !== skillToRemove
        )
    );

  };


  /* =======================================================
     ENTER KEY FOR SKILL
     ======================================================= */

  const handleSkillKeyDown = (event) => {

    if (event.key === "Enter") {

      event.preventDefault();

      addSkill();

    }

  };


  /* =======================================================
     SEARCH
     ======================================================= */

  const handleSearch = (event) => {

    event.preventDefault();

    fetchCandidates(true);

  };


  /* =======================================================
     CLEAR FILTERS
     ======================================================= */

  const clearFilters = () => {

    setSearch("");
    setLocation("");
    setExperience("");
    setWorkMode("");
    setEducation("");
    setSkillInput("");
    setSelectedSkills([]);
    setSortBy("relevance");

    /*
     * Fetch all candidates again.
     */

    setTimeout(() => {

      fetchCandidates(false);

    }, 0);

  };


  /* =======================================================
     CLIENT-SIDE SORT
     ======================================================= */

  const sortedCandidates = useMemo(() => {

    const list =
      [...candidates];


    if (sortBy === "name") {

      list.sort(
        (a, b) =>
          getCandidateName(a)
            .localeCompare(
              getCandidateName(b)
            )
      );

    }


    if (sortBy === "location") {

      list.sort(
        (a, b) =>
          getCandidateLocation(a)
            .localeCompare(
              getCandidateLocation(b)
            )
      );

    }


    return list;

  }, [
    candidates,
    sortBy,
  ]);


  /* =======================================================
     OPEN CONTACT MODAL
     ======================================================= */

  const openContactModal = (
    candidate
  ) => {

    const name =
      getCandidateName(candidate);

    setContactCandidate(
      candidate
    );

    setEmailSubject(
      `Job Opportunity - ${name}`
    );

    setEmailMessage(
      `Hello ${name},

We came across your profile on Vutkala and believe your experience may be a good fit for an opportunity with our company.

We would like to discuss the opportunity with you.

Please let us know if you are interested.

Regards,
Recruitment Team`
    );

    setEmailError("");
    setEmailSuccess("");

  };


  /* =======================================================
     CLOSE CONTACT MODAL
     ======================================================= */

  const closeContactModal = () => {

    if (sendingEmail) return;

    setContactCandidate(null);
    setEmailSubject("");
    setEmailMessage("");
    setEmailError("");
    setEmailSuccess("");

  };


  /* =======================================================
     SEND EMAIL
     ======================================================= */

  const sendCandidateEmail = async (
    event
  ) => {

    event.preventDefault();


    if (!contactCandidate) {
      return;
    }


    const candidateId =
      getCandidateId(
        contactCandidate
      );


    const candidateEmail =
      getCandidateEmail(
        contactCandidate
      );


    if (!candidateId) {

      setEmailError(
        "Candidate ID is missing."
      );

      return;

    }


    if (!candidateEmail) {

      setEmailError(
        "This candidate does not have an email address available."
      );

      return;

    }


    if (!emailSubject.trim()) {

      setEmailError(
        "Please enter an email subject."
      );

      return;

    }


    if (!emailMessage.trim()) {

      setEmailError(
        "Please enter a message."
      );

      return;

    }


    try {

      setSendingEmail(true);
      setEmailError("");
      setEmailSuccess("");


      await candidatesApi.post(
        `/${candidateId}/contact`,
        {
          subject:
            emailSubject.trim(),

          message:
            emailMessage.trim(),
        }
      );


      setEmailSuccess(
        "Email sent successfully."
      );


      /*
       * Keep the success message visible
       * briefly before closing.
       */

      setTimeout(() => {

        setContactCandidate(null);
        setEmailSubject("");
        setEmailMessage("");
        setEmailSuccess("");

      }, 1500);

    } catch (err) {

      console.error(
        "Send candidate email error:",
        err
      );


      setEmailError(
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Unable to send the email."
      );

    } finally {

      setSendingEmail(false);

    }

  };


  /* =======================================================
     LOADING SCREEN
     ======================================================= */

  if (loading) {

    return (

      <main className="find-candidates-page">

        <div className="fc-loading">

          <div className="fc-spinner" />

          <h2>
            Finding candidates...
          </h2>

          <p>
            Loading available talent.
          </p>

        </div>

      </main>

    );

  }


  /* =======================================================
     RENDER
     ======================================================= */

  return (

    <main className="find-candidates-page">

      {/* ===================================================
          PAGE HEADER
      =================================================== */}

      <section className="fc-page-header">

        <div>

          <span className="fc-eyebrow">
            TALENT SEARCH
          </span>

          <h1>
            Find Candidates
          </h1>

          <p>
            Search Vutkala's talent pool and
            discover candidates who match your
            hiring requirements.
          </p>

        </div>


        <div className="fc-header-actions">

          <Link
            to="/recruiter/saved-candidates"
            className="fc-secondary-btn"
          >
            ♡ Saved Candidates
          </Link>

        </div>

      </section>


      {/* ===================================================
          SEARCH PANEL
      =================================================== */}

      <section className="fc-search-card">

        <form
          onSubmit={handleSearch}
          className="fc-search-form"
        >

          {/* -------------------------------------------------
              MAIN SEARCH
          ------------------------------------------------- */}

          <div className="fc-main-search">

            <span className="fc-search-icon">
              🔍
            </span>

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
              placeholder="Search by skills, job title, keywords..."
            />

          </div>


          {/* -------------------------------------------------
              FILTER TOGGLE
          ------------------------------------------------- */}

          <button
            type="button"
            className="fc-filter-toggle"
            onClick={() =>
              setShowFilters(
                (previous) =>
                  !previous
              )
            }
          >
            ⚙ Filters
            <span>
              {showFilters
                ? "−"
                : "+"}
            </span>
          </button>


          {/* -------------------------------------------------
              FILTERS
          ------------------------------------------------- */}

          {showFilters && (

            <div className="fc-filter-grid">

              {/* LOCATION */}

              <div className="fc-field">

                <label>
                  Location
                </label>

                <input
                  type="text"
                  value={location}
                  onChange={(event) =>
                    setLocation(
                      event.target.value
                    )
                  }
                  placeholder="e.g. Hyderabad"
                />

              </div>


              {/* EXPERIENCE */}

              <div className="fc-field">

                <label>
                  Experience
                </label>

                <select
                  value={experience}
                  onChange={(event) =>
                    setExperience(
                      event.target.value
                    )
                  }
                >

                  <option value="">
                    Any experience
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


              {/* WORK MODE */}

              <div className="fc-field">

                <label>
                  Work Mode
                </label>

                <select
                  value={workMode}
                  onChange={(event) =>
                    setWorkMode(
                      event.target.value
                    )
                  }
                >

                  <option value="">
                    Any work mode
                  </option>

                  <option value="remote">
                    Remote
                  </option>

                  <option value="hybrid">
                    Hybrid
                  </option>

                  <option value="onsite">
                    On-site
                  </option>

                </select>

              </div>


              {/* EDUCATION */}

              <div className="fc-field">

                <label>
                  Education
                </label>

                <select
                  value={education}
                  onChange={(event) =>
                    setEducation(
                      event.target.value
                    )
                  }
                >

                  <option value="">
                    Any education
                  </option>

                  <option value="10th">
                    10th
                  </option>

                  <option value="12th">
                    12th
                  </option>

                  <option value="diploma">
                    Diploma
                  </option>

                  <option value="bachelor">
                    Bachelor's
                  </option>

                  <option value="master">
                    Master's
                  </option>

                  <option value="phd">
                    PhD
                  </option>

                </select>

              </div>

            </div>

          )}


          {/* -------------------------------------------------
              SKILLS
          ------------------------------------------------- */}

          {showFilters && (

            <div className="fc-skills-section">

              <label>
                Skills
              </label>


              <div className="fc-skill-input-row">

                <input
                  type="text"
                  value={skillInput}
                  onChange={(event) =>
                    setSkillInput(
                      event.target.value
                    )
                  }
                  onKeyDown={
                    handleSkillKeyDown
                  }
                  placeholder="Add a skill, e.g. React"
                />

                <button
                  type="button"
                  onClick={addSkill}
                >
                  Add
                </button>

              </div>


              {selectedSkills.length >
                0 && (

                <div className="fc-selected-skills">

                  {selectedSkills.map(
                    (skill) => (

                      <span
                        key={skill}
                        className="fc-skill-chip"
                      >

                        {skill}

                        <button
                          type="button"
                          onClick={() =>
                            removeSkill(
                              skill
                            )
                          }
                          aria-label={`Remove ${skill}`}
                        >
                          ×
                        </button>

                      </span>

                    )
                  )}

                </div>

              )}

            </div>

          )}


          {/* -------------------------------------------------
              ACTIONS
          ------------------------------------------------- */}

          <div className="fc-search-actions">

            <button
              type="button"
              className="fc-clear-btn"
              onClick={
                clearFilters
              }
            >
              Clear Filters
            </button>


            <button
              type="submit"
              className="fc-search-btn"
              disabled={
                searching
              }
            >

              {searching
                ? "Searching..."
                : "Search Candidates"}

              {!searching && (
                <span>
                  →
                </span>
              )}

            </button>

          </div>

        </form>

      </section>


      {/* ===================================================
          ERROR
      =================================================== */}

      {error && (

        <div className="fc-error">

          <div>

            <strong>
              Unable to load candidates
            </strong>

            <p>
              {error}
            </p>

          </div>


          <button
            type="button"
            onClick={() =>
              fetchCandidates(true)
            }
          >
            Retry
          </button>

        </div>

      )}


      {/* ===================================================
          RESULTS HEADER
      =================================================== */}

      <section className="fc-results-section">

        <div className="fc-results-header">

          <div>

            <span className="fc-eyebrow">
              CANDIDATE DATABASE
            </span>

            <h2>
              {candidates.length}{" "}
              {candidates.length === 1
                ? "Candidate"
                : "Candidates"}{" "}
              Found
            </h2>

          </div>


          <div className="fc-sort">

            <label>
              Sort by
            </label>

            <select
              value={sortBy}
              onChange={(event) =>
                setSortBy(
                  event.target.value
                )
              }
            >

              <option value="relevance">
                Relevance
              </option>

              <option value="name">
                Name A-Z
              </option>

              <option value="location">
                Location
              </option>

            </select>

          </div>

        </div>


        {/* =================================================
            RESULTS
        ================================================= */}

        {sortedCandidates.length ===
        0 ? (

          <div className="fc-empty">

            <div className="fc-empty-icon">
              👥
            </div>

            <h3>
              No candidates found
            </h3>

            <p>
              Try changing your search
              criteria or removing some
              filters.
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

          <div className="fc-candidate-list">

            {sortedCandidates.map(
              (
                candidate,
                index
              ) => {

                const candidateId =
                  getCandidateId(
                    candidate
                  );

                const name =
                  getCandidateName(
                    candidate
                  );

                const email =
                  getCandidateEmail(
                    candidate
                  );

                const phone =
                  getCandidatePhone(
                    candidate
                  );

                const location =
                  getCandidateLocation(
                    candidate
                  );

                const headline =
                  getCandidateHeadline(
                    candidate
                  );

                const experience =
                  getCandidateExperience(
                    candidate
                  );

                const education =
                  getCandidateEducation(
                    candidate
                  );

                const skills =
                  getCandidateSkills(
                    candidate
                  );

                const availability =
                  getCandidateAvailability(
                    candidate
                  );

                const candidateWorkMode =
                  getCandidateWorkMode(
                    candidate
                  );

                const resume =
                  getCandidateResume(
                    candidate
                  );


                return (

                  <article
                    className="fc-candidate-card"
                    key={
                      candidateId ||
                      `candidate-${index}`
                    }
                  >

                    {/* ---------------------------------------
                        CARD TOP
                    --------------------------------------- */}

                    <div className="fc-candidate-top">

                      <div className="fc-candidate-identity">

                        <div className="fc-avatar">

                          {getInitials(
                            name
                          )}

                        </div>


                        <div>

                          <h3>
                            {name}
                          </h3>

                          <p>
                            {headline}
                          </p>

                        </div>

                      </div>


                      {availability && (

                        <span className="fc-availability">

                          ●{" "}
                          {availability}

                        </span>

                      )}

                    </div>


                    {/* ---------------------------------------
                        BASIC INFO
                    --------------------------------------- */}

                    <div className="fc-candidate-info">

                      <span>
                        📍 {location}
                      </span>


                      <span>
                        💼 {experience}
                      </span>


                      {education && (

                        <span>
                          🎓 {education}
                        </span>

                      )}


                      {candidateWorkMode && (

                        <span>
                          🏢{" "}
                          {candidateWorkMode}
                        </span>

                      )}

                    </div>


                    {/* ---------------------------------------
                        SKILLS
                    --------------------------------------- */}

                    {skills.length >
                      0 && (

                      <div className="fc-candidate-skills">

                        {skills
                          .slice(0, 8)
                          .map(
                            (skill) => (

                              <span
                                key={
                                  skill
                                }
                              >
                                {skill}
                              </span>

                            )
                          )}


                        {skills.length >
                          8 && (

                          <span className="fc-more-skills">

                            +
                            {skills.length -
                              8}

                          </span>

                        )}

                      </div>

                    )}


                    {/* ---------------------------------------
                        CONTACT INFO
                    --------------------------------------- */}

                    <div className="fc-candidate-contact">

                      {email && (

                        <span>
                          ✉ {email}
                        </span>

                      )}


                      {phone && (

                        <span>
                          ☎ {phone}
                        </span>

                      )}

                    </div>


                    {/* ---------------------------------------
                        CARD FOOTER
                    --------------------------------------- */}

                    <div className="fc-candidate-footer">

                      {candidateId ? (

                        <Link
                          to={`/recruiter/candidates/${candidateId}`}
                          className="fc-view-profile"
                        >
                          View Profile
                          <span>
                            →
                          </span>
                        </Link>

                      ) : (

                        <button
                          type="button"
                          className="fc-view-profile"
                          disabled
                        >
                          Profile Unavailable
                        </button>

                      )}


                      <div className="fc-card-actions">

                        {resume && (

                          <a
                            href={resume}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="fc-resume-btn"
                          >
                            Resume
                          </a>

                        )}


                        <button
                          type="button"
                          className="fc-contact-btn"
                          onClick={() =>
                            openContactModal(
                              candidate
                            )
                          }
                          disabled={
                            !email
                          }
                        >
                          ✉ Contact
                        </button>

                      </div>

                    </div>

                  </article>

                );

              }
            )}

          </div>

        )}

      </section>


      {/* ===================================================
          CONTACT MODAL
      =================================================== */}

      {contactCandidate && (

        <div
          className="fc-modal-overlay"
          onMouseDown={(event) => {

            if (
              event.target ===
              event.currentTarget
            ) {
              closeContactModal();
            }

          }}
        >

          <div
            className="fc-contact-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-candidate-title"
          >

            {/* ---------------------------------------------
                MODAL HEADER
            --------------------------------------------- */}

            <div className="fc-modal-header">

              <div>

                <span className="fc-eyebrow">
                  RECRUITER CONTACT
                </span>

                <h2 id="contact-candidate-title">
                  Contact{" "}
                  {getCandidateName(
                    contactCandidate
                  )}
                </h2>

              </div>


              <button
                type="button"
                className="fc-modal-close"
                onClick={
                  closeContactModal
                }
                disabled={
                  sendingEmail
                }
              >
                ×
              </button>

            </div>


            {/* ---------------------------------------------
                RECIPIENT
            --------------------------------------------- */}

            <div className="fc-recipient">

              <div className="fc-recipient-avatar">

                {getInitials(
                  getCandidateName(
                    contactCandidate
                  )
                )}

              </div>


              <div>

                <strong>
                  {getCandidateName(
                    contactCandidate
                  )}
                </strong>

                <span>
                  {getCandidateEmail(
                    contactCandidate
                  )}
                </span>

              </div>

            </div>


            {/* ---------------------------------------------
                FORM
            --------------------------------------------- */}

            <form
              onSubmit={
                sendCandidateEmail
              }
              className="fc-contact-form"
            >

              <div className="fc-field">

                <label>
                  To
                </label>

                <input
                  type="email"
                  value={
                    getCandidateEmail(
                      contactCandidate
                    )
                  }
                  disabled
                />

              </div>


              <div className="fc-field">

                <label>
                  Subject
                </label>

                <input
                  type="text"
                  value={
                    emailSubject
                  }
                  onChange={(event) =>
                    setEmailSubject(
                      event.target.value
                    )
                  }
                  placeholder="Email subject"
                  disabled={
                    sendingEmail
                  }
                />

              </div>


              <div className="fc-field">

                <label>
                  Message
                </label>

                <textarea
                  value={
                    emailMessage
                  }
                  onChange={(event) =>
                    setEmailMessage(
                      event.target.value
                    )
                  }
                  placeholder="Write your message..."
                  rows={9}
                  disabled={
                    sendingEmail
                  }
                />

              </div>


              {/* -------------------------------------------
                  ERROR
              ------------------------------------------- */}

              {emailError && (

                <div className="fc-modal-error">
                  {emailError}
                </div>

              )}


              {/* -------------------------------------------
                  SUCCESS
              ------------------------------------------- */}

              {emailSuccess && (

                <div className="fc-modal-success">
                  {emailSuccess}
                </div>

              )}


              {/* -------------------------------------------
                  ACTIONS
              ------------------------------------------- */}

              <div className="fc-modal-actions">

                <button
                  type="button"
                  className="fc-modal-cancel"
                  onClick={
                    closeContactModal
                  }
                  disabled={
                    sendingEmail
                  }
                >
                  Cancel
                </button>


                <button
                  type="submit"
                  className="fc-modal-send"
                  disabled={
                    sendingEmail ||
                    !getCandidateEmail(
                      contactCandidate
                    )
                  }
                >

                  {sendingEmail
                    ? "Sending..."
                    : "Send Email"}

                  {!sendingEmail && (
                    <span>
                      →
                    </span>
                  )}

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </main>

  );
}