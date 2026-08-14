import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./FindOpportunities.css";

/* =========================================================
   FIND OPPORTUNITIES
   VUTKALA GLOBAL TECHNOLOGIES
   ========================================================= */

function Jobs() {
  const navigate = useNavigate();
  const formRef = useRef(null);
  const firstInvalidRef = useRef(null);

  /* =======================================================
     CONSTANTS
     ======================================================= */

  const STORAGE_KEY = "vutkala_candidate_interest";

  const industries = [
    {
      id: "technology-it",
      number: "01",
      name: "Technology / IT",
      description: "AI · Cloud · Data · Engineering",
    },
    {
      id: "banking-finance",
      number: "02",
      name: "Banking / Finance",
      description: "Digital · FinTech · Data",
    },
    {
      id: "healthcare",
      number: "03",
      name: "Healthcare / Life Sciences",
      description: "HealthTech · Digital Health · Data",
    },
    {
      id: "manufacturing",
      number: "04",
      name: "Manufacturing / Engineering",
      description: "Automation · Engineering · Industry 4.0",
    },
    {
      id: "retail",
      number: "05",
      name: "Retail / Consumer",
      description: "E-Commerce · Digital Experience · Analytics",
    },
    {
      id: "education",
      number: "06",
      name: "Education / EdTech",
      description: "Learning · Technology · Data",
    },
    {
      id: "telecom-media",
      number: "07",
      name: "Telecommunications / Media",
      description: "Connectivity · Digital · Communication",
    },
    {
      id: "logistics",
      number: "08",
      name: "Logistics / Supply Chain",
      description: "Automation · Visibility · Digital Operations",
    },
  ];

  const technologyGroups = [
    {
      title: "CORE TECHNOLOGY",
      skills: [
        "Software Engineering",
        "AI & Machine Learning",
        "Data Science",
        "Data & Analytics",
        "Cloud & Infrastructure",
        "DevOps",
        "Cybersecurity",
      ],
    },
    {
      title: "SOFTWARE",
      skills: [
        "Frontend Development",
        "Backend Development",
        "Full Stack Development",
        "Mobile Development",
        "QA / Testing",
        "UI/UX",
      ],
    },
    {
      title: "CLOUD & INFRASTRUCTURE",
      skills: [
        "AWS",
        "Azure",
        "Google Cloud",
        "Kubernetes",
        "Docker",
      ],
    },
    {
      title: "DATA & AI",
      skills: [
        "Python",
        "Machine Learning",
        "Deep Learning",
        "Generative AI",
        "Data Engineering",
        "Data Analytics",
        "NLP",
        "Computer Vision",
      ],
    },
    {
      title: "BUSINESS / TECHNOLOGY",
      skills: [
        "Business Analysis",
        "Product Management",
        "Project Management",
        "Technology Consulting",
        "Digital Transformation",
      ],
    },
  ];

  const countries = [
    "India",
    "United States",
    "United Kingdom",
    "Australia",
    "Canada",
    "Germany",
    "UAE",
    "Singapore",
    "Other",
  ];

  const opportunityTypes = [
    "Full-time",
    "Contract",
    "Part-time",
    "Internship",
    "Project-based",
    "Consulting",
  ];

  const workModes = [
    "Remote",
    "Hybrid",
    "On-site",
  ];

  const relocationOptions = [
    "Yes",
    "No",
    "Maybe",
  ];

  const availabilityOptions = [
    "Immediately",
    "Within 2 weeks",
    "Within 1 month",
    "1–3 months",
    "Just exploring opportunities",
  ];

  const careerDirections = [
    "Technical growth",
    "Leadership",
    "Consulting",
    "Long-term employment",
    "Project-based work",
    "Career transition",
  ];

  const statuses = [
    "Working",
    "Looking for an opportunity",
    "Student",
    "Recent graduate",
    "Open to new opportunities",
  ];

  const experienceOptions = [
    "Fresher",
    "1–2 years",
    "3–5 years",
    "6–10 years",
    "10+ years",
  ];

  const qualifications = [
    "High School",
    "Diploma",
    "Bachelor's Degree",
    "Master's Degree",
    "MBA",
    "PhD",
    "Other",
  ];

  /* =======================================================
     FORM STATE
     ======================================================= */

  const createInitialForm = () => ({
    fullName: "",
    email: "",
    phone: "",
    currentCountry: "",
    currentCity: "",
    linkedin: "",
    currentStatus: "",

    currentRole: "",
    experienceLevel: "",
    yearsOfExperience: "",
    qualification: "",
    currentIndustry: "",
    professionalSummary: "",

    industries: [],
    skills: [],
    otherSkills: "",

    opportunityTypes: [],
    workModes: [],
    preferredCountries: [],
    preferredCities: [],
    relocation: "",
    availability: "",
    careerDirections: [],

    resume: null,
    github: "",
    portfolio: "",
    additionalInformation: "",
    contactPreference: "",

    consent: false,
  });

  const [currentStep, setCurrentStep] = useState(1);
const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (!saved) {
        return createInitialForm();
      }

      const parsed = JSON.parse(saved);

      return {
        ...createInitialForm(),
        ...parsed,
        resume: null,
      };
    } catch (error) {
      console.error(
        "Unable to restore candidate profile:",
        error
      );

      return createInitialForm();
    }
  });

  const [errors, setErrors] = useState({});

  const [success, setSuccess] = useState(false);

  const [skillSearch, setSkillSearch] = useState("");

  const [countrySearch, setCountrySearch] = useState("");

  const [countryOpen, setCountryOpen] = useState(false);

  const [transitionDirection, setTransitionDirection] =
    useState("forward");

  /* =======================================================
     LOCAL STORAGE
     ======================================================= */

  useEffect(() => {
    try {
      const storageData = {
        ...formData,
        resume: null,
      };

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(storageData)
      );
    } catch (error) {
      console.error(
        "Unable to save candidate profile:",
        error
      );
    }
  }, [formData]);

  /* =======================================================
     ALL SKILLS
     ======================================================= */

  const allSkills = useMemo(() => {
    const skills = [];

    technologyGroups.forEach((group) => {
      group.skills.forEach((skill) => {
        if (!skills.includes(skill)) {
          skills.push(skill);
        }
      });
    });

    return skills;
  }, []);

  const filteredSkills = useMemo(() => {
    const query = skillSearch.trim().toLowerCase();

    if (!query) {
      return allSkills;
    }

    return allSkills.filter((skill) =>
      skill.toLowerCase().includes(query)
    );
  }, [allSkills, skillSearch]);

  const filteredCountries = useMemo(() => {
    const query = countrySearch.trim().toLowerCase();

    if (!query) {
      return countries;
    }

    return countries.filter((country) =>
      country.toLowerCase().includes(query)
    );
  }, [countrySearch]);

  /* =======================================================
     UPDATE FIELD
     ======================================================= */

  const updateField = (field, value) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));

    setErrors((previous) => {
      if (!previous[field]) {
        return previous;
      }

      const next = {
        ...previous,
      };

      delete next[field];

      return next;
    });
  };

  /* =======================================================
     MULTI SELECT
     ======================================================= */

  const toggleArrayValue = (field, value) => {
    setFormData((previous) => {
      const currentValues = previous[field] || [];

      const exists = currentValues.includes(value);

      return {
        ...previous,
        [field]: exists
          ? currentValues.filter(
              (item) => item !== value
            )
          : [...currentValues, value],
      };
    });

    setErrors((previous) => {
      if (!previous[field]) {
        return previous;
      }

      const next = {
        ...previous,
      };

      delete next[field];

      return next;
    });
  };

  /* =======================================================
     TEXTAREA CHARACTER COUNT
     ======================================================= */

  const handleSummaryChange = (event) => {
    const value = event.target.value.slice(0, 500);

    updateField(
      "professionalSummary",
      value
    );
  };

  /* =======================================================
     RESUME
     ======================================================= */

  const handleResumeChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    const extension = file.name
      .split(".")
      .pop()
      ?.toLowerCase();

    const validExtension = [
      "pdf",
      "doc",
      "docx",
    ].includes(extension);

    if (
      !allowedTypes.includes(file.type) &&
      !validExtension
    ) {
      setErrors((previous) => ({
        ...previous,
        resume:
          "Please upload a PDF, DOC or DOCX file.",
      }));

      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrors((previous) => ({
        ...previous,
        resume:
          "Resume must be smaller than 10 MB.",
      }));

      return;
    }

    setErrors((previous) => {
      const next = {
        ...previous,
      };

      delete next.resume;

      return next;
    });

    updateField("resume", file);
  };

  const removeResume = () => {
    updateField("resume", null);
  };

  /* =======================================================
     VALIDATION
     ======================================================= */

  const validateStep = (step) => {
    const nextErrors = {};

    if (step === 1) {
      if (!formData.fullName.trim()) {
        nextErrors.fullName =
          "Please enter your full name.";
      }

      if (!formData.email.trim()) {
        nextErrors.email =
          "Please enter your email address.";
      } else if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
          formData.email
        )
      ) {
        nextErrors.email =
          "Please enter a valid email address.";
      }

      if (!formData.phone.trim()) {
        nextErrors.phone =
          "Please enter your phone number.";
      }

      if (!formData.currentCountry) {
        nextErrors.currentCountry =
          "Please select your current country.";
      }

      if (!formData.currentRole.trim()) {
        nextErrors.currentRole =
          "Please enter your current or most recent role.";
      }

      if (!formData.experienceLevel) {
        nextErrors.experienceLevel =
          "Please select your experience level.";
      }
    }

    if (step === 2) {
      if (!formData.industries.length) {
        nextErrors.industries =
          "Please select at least one industry.";
      }

      if (!formData.skills.length) {
        nextErrors.skills =
          "Please select at least one skill.";
      }
    }

    if (step === 3) {
      if (!formData.opportunityTypes.length) {
        nextErrors.opportunityTypes =
          "Please select at least one opportunity type.";
      }

      if (!formData.workModes.length) {
        nextErrors.workModes =
          "Please select at least one work mode.";
      }

      if (!formData.preferredCountries.length) {
        nextErrors.preferredCountries =
          "Please select at least one preferred country.";
      }

      if (!formData.availability) {
        nextErrors.availability =
          "Please select your availability.";
      }
    }

    if (step === 4) {
      if (!formData.consent) {
        nextErrors.consent =
          "Please accept the consent before submitting your profile.";
      }
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setTimeout(() => {
        const firstErrorKey =
          Object.keys(nextErrors)[0];

        const element =
          document.querySelector(
            `[data-field="${firstErrorKey}"]`
          );

        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });

          if (
            typeof element.focus === "function"
          ) {
            element.focus({
              preventScroll: true,
            });
          }
        }
      }, 50);

      return false;
    }

    return true;
  };

  /* =======================================================
     STEP NAVIGATION
     ======================================================= */

  const goToStep = (step) => {
    if (step === currentStep) {
      return;
    }

    setTransitionDirection(
      step > currentStep
        ? "forward"
        : "backward"
    );

    setCurrentStep(step);

    setErrors({});

    setTimeout(() => {
      formRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);
  };

  const handleContinue = () => {
    if (!validateStep(currentStep)) {
      return;
    }

    if (currentStep < 4) {
      goToStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      goToStep(currentStep - 1);
    }
  };

  /* =======================================================
     SUBMIT
     ======================================================= */
const handleSubmit = async (event) => {
  event.preventDefault();

  // Prevent duplicate submissions
  if (isSubmitting) {
    console.log("Submission already in progress...");
    return;
  }

  console.log("========== SUBMIT STARTED ==========");

  if (!validateStep(4)) {
    console.log("Validation failed");
    return;
  }

  setIsSubmitting(true);

  try {
    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key === "resume") {
        if (value) {
          data.append("resume", value);

          console.log(
            "Resume added:",
            value.name,
            value.size,
            value.type
          );
        }

        return;
      }

      if (Array.isArray(value)) {
        data.append(key, JSON.stringify(value));
      } else {
        data.append(
          key,
          String(value ?? "")
        );
      }
    });

    console.log(
      "Sending request to candidate API..."
    );

    const response = await fetch(
      "http://localhost:5000/api/candidate-interests",
      {
        method: "POST",
        body: data,
      }
    );

    console.log(
      "Candidate API status:",
      response.status
    );

    const result = await response.json();

    console.log(
      "Candidate API response:",
      result
    );

    if (!response.ok) {
      throw new Error(
        result.message ||
          "Failed to submit profile."
      );
    }

    console.log(
      "Candidate submitted successfully."
    );

    localStorage.removeItem(STORAGE_KEY);

    setSuccess(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  } catch (error) {
    console.error(
      "Candidate submission failed:",
      error
    );

    setErrors({
      submit:
        error instanceof Error
          ? error.message
          : "Unable to submit your profile.",
    });

  } finally {
    setIsSubmitting(false);
  }
};
  /* =======================================================
     HERO CTA
     ======================================================= */

  const handleStartProfile = () => {
    formRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  /* =======================================================
     STEP LABELS
     ======================================================= */

  const steps = [
    {
      number: "01",
      title: "ABOUT YOU",
    },
    {
      number: "02",
      title: "INDUSTRY & TECHNOLOGY",
    },
    {
      number: "03",
      title: "OPPORTUNITY PREFERENCES",
    },
    {
      number: "04",
      title: "PROFILE & SUBMIT",
    },
  ];

  /* =======================================================
     SUCCESS SCREEN
     ======================================================= */

  if (success) {
    return (
      <div className="vg-find-page vg-find-success-page">
        <header className="vg-find-header">
          <Link
            to="/"
            className="vg-find-logo"
          >
            <span className="vg-find-logo-mark">
              V
            </span>

            <span className="vg-find-logo-text">
              <strong>VUTKALA</strong>
              <small>GLOBAL TECHNOLOGIES</small>
            </span>
          </Link>

          <nav className="vg-find-header-nav">
            <Link to="/">Home</Link>
            <Link className="is-active" to="/jobs">
              Jobs
            </Link>
            <Link to="/hire">Hire Talent</Link>
            <Link to="/services">Services</Link>
            <Link to="/about">About</Link>
            <Link to="/industry">Industries</Link>
            <Link to="/contact">Contact</Link>
          </nav>

          <div className="vg-find-header-actions">
            <Link
              to="/login"
              className="vg-find-login"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="vg-find-get-started"
            >
              Get Started
              <span>→</span>
            </Link>
          </div>
        </header>

        <main className="vg-find-success">
          <div className="vg-find-success-inner">
            <span className="vg-find-success-number">
              01
            </span>

            <div className="vg-find-success-line" />

            <div className="vg-find-success-wordmark">
              <span>PEOPLE</span>
              <span>TECHNOLOGY</span>
              <span>OPPORTUNITY</span>
            </div>

            <h1>
              PROFILE
              <br />
              RECEIVED
            </h1>

            <p>
              Thank you for sharing your profile
              with Vutkala Global Technologies.
            </p>

            <p>
              Our team will review your experience,
              skills and preferences and contact you
              when relevant opportunities arise.
            </p>

            <div className="vg-find-success-actions">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="vg-find-primary-button"
              >
                BACK TO HOME
                <span>→</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  navigate("/services")
                }
                className="vg-find-secondary-button"
              >
                EXPLORE SERVICES
                <span>→</span>
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  /* =======================================================
     MAIN UI
     ======================================================= */

  return (
    <div className="vg-find-page">

      {/* ===================================================
          HEADER
      =================================================== */}

      <header className="vg-find-header">

        <Link
          to="/"
          className="vg-find-logo"
        >
          <span className="vg-find-logo-mark">
            V
          </span>

          <span className="vg-find-logo-text">
            <strong>VUTKALA</strong>
            <small>GLOBAL TECHNOLOGIES</small>
          </span>
        </Link>

        <nav className="vg-find-header-nav">
          <Link to="/">Home</Link>

          <Link
            to="/jobs"
            className="is-active"
          >
            Jobs
          </Link>

          <Link to="/hire">
            Hire Talent
          </Link>

          <Link to="/services">
            Services
          </Link>

          <Link to="/about">
            About
          </Link>

          <Link to="/industry">
            Industries
          </Link>

          <Link to="/contact">
            Contact
          </Link>
        </nav>

        <div className="vg-find-header-actions">

          <Link
            to="/login"
            className="vg-find-login"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="vg-find-get-started"
          >
            Get Started
            <span>→</span>
          </Link>

        </div>

        <button
          type="button"
          className="vg-find-mobile-menu"
          aria-label="Open navigation"
        >
          <span />
          <span />
          <span />
        </button>

      </header>


      {/* ===================================================
          HERO
      =================================================== */}

      <section className="vg-find-hero">

        <div className="vg-find-hero-overlay" />

        <div className="vg-find-hero-content">

          <span className="vg-find-eyebrow">
            FIND OPPORTUNITIES
          </span>

          <span className="vg-find-eyebrow-line" />

          <h1>
            YOUR NEXT
            <br />
            OPPORTUNITY
            <br />
            <span>COULD START HERE.</span>
          </h1>

          <p>
            Tell us what you're looking for.
            We'll connect your skills, experience
            and ambitions with relevant
            opportunities.
          </p>

          <div className="vg-find-hero-actions">

            <button
              type="button"
              onClick={handleStartProfile}
              className="vg-find-primary-button"
            >
              START YOUR PROFILE
              <span>→</span>
            </button>

            <button
              type="button"
              onClick={() =>
                formRef.current?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                })
              }
              className="vg-find-how-button"
            >
              <span className="vg-find-play">
                ▶
              </span>

              HOW IT WORKS
            </button>

          </div>


        </div>


        {/* =================================================
            HERO STATISTICS
        ================================================= */}

      </section>


      {/* ===================================================
          FORM EXPERIENCE
      =================================================== */}

      <section
        className="vg-find-form-section"
        ref={formRef}
        id="candidate-profile"
      >

        <div className="vg-find-form-layout">

          {/* LEFT SIDE CONTEXT */}

          <aside className="vg-find-form-context">

            <span className="vg-find-context-eyebrow">
              FIND OPPORTUNITIES
            </span>

            <span className="vg-find-context-line" />

            <h2>
              YOUR SKILLS
              <br />
             <span>YOUR NEXT</span> 
              <br />
              <span>CHAPTER.</span>
            </h2>

            <p>
              Share your experience, interests
              and career preferences with
              Vutkala Global Technologies.
            </p>

            <div className="vg-find-context-meta">
              <span>PEOPLE</span>
              <span>TECHNOLOGY</span>
              <span>OPPORTUNITY</span>
            </div>

          </aside>


          {/* RIGHT FORM */}

          <div className="vg-find-form-panel">

            <div
              className={`vg-find-step-container ${transitionDirection}`}
              key={currentStep}
            >

              {/* =========================================
                  STEP HEADER
              ========================================= */}

              <div className="vg-find-step-heading">

                <span className="vg-find-step-number">
                  0{currentStep}
                </span>

                <span className="vg-find-step-heading-line" />

                <h2>
                  {currentStep === 1 &&
                    "ABOUT YOU"}

                  {currentStep === 2 &&
                    "INDUSTRY & TECHNOLOGY"}

                  {currentStep === 3 &&
                    "OPPORTUNITY PREFERENCES"}

                  {currentStep === 4 &&
                    "COMPLETE YOUR PROFILE"}
                </h2>

                <p>
                  {currentStep === 1 &&
                    "Let's start with the basics."}

                  {currentStep === 2 &&
                    "Tell us where your experience and interests fit."}

                  {currentStep === 3 &&
                    "Tell us what the right opportunity looks like for you."}

                  {currentStep === 4 &&
                    "Add the final details that help us understand your profile."}
                </p>

              </div>


              {/* =========================================
                  STEP 1
              ========================================= */}

              {currentStep === 1 && (
                <div className="vg-find-step">

                  <div className="vg-find-form-section-title">
                    PERSONAL INFORMATION
                  </div>

                  <div className="vg-find-field-grid">

                    <div
                      className={`vg-find-field ${
                        errors.fullName
                          ? "has-error"
                          : ""
                      }`}
                      data-field="fullName"
                    >
                      <label>
                        Full Name
                        <span>*</span>
                      </label>

                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(event) =>
                          updateField(
                            "fullName",
                            event.target.value
                          )
                        }
                        placeholder="Enter your full name"
                        aria-invalid={
                          !!errors.fullName
                        }
                      />

                      {errors.fullName && (
                        <small>
                          {errors.fullName}
                        </small>
                      )}
                    </div>


                    <div
                      className={`vg-find-field ${
                        errors.email
                          ? "has-error"
                          : ""
                      }`}
                      data-field="email"
                    >
                      <label>
                        Email Address
                        <span>*</span>
                      </label>

                      <input
                        type="email"
                        value={formData.email}
                        onChange={(event) =>
                          updateField(
                            "email",
                            event.target.value
                          )
                        }
                        placeholder="you@example.com"
                        aria-invalid={
                          !!errors.email
                        }
                      />

                      {errors.email && (
                        <small>
                          {errors.email}
                        </small>
                      )}
                    </div>


                    <div
                      className={`vg-find-field ${
                        errors.phone
                          ? "has-error"
                          : ""
                      }`}
                      data-field="phone"
                    >
                      <label>
                        Phone Number
                        <span>*</span>
                      </label>

                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(event) =>
                          updateField(
                            "phone",
                            event.target.value
                          )
                        }
                        placeholder="+91 00000 00000"
                        aria-invalid={
                          !!errors.phone
                        }
                      />

                      {errors.phone && (
                        <small>
                          {errors.phone}
                        </small>
                      )}
                    </div>


                    <div
                      className={`vg-find-field ${
                        errors.currentCountry
                          ? "has-error"
                          : ""
                      }`}
                      data-field="currentCountry"
                    >
                      <label>
                        Current Country
                        <span>*</span>
                      </label>

                      <select
                        value={
                          formData.currentCountry
                        }
                        onChange={(event) =>
                          updateField(
                            "currentCountry",
                            event.target.value
                          )
                        }
                      >
                        <option value="">
                          Select country
                        </option>

                        {countries.map(
                          (country) => (
                            <option
                              key={country}
                              value={country}
                            >
                              {country}
                            </option>
                          )
                        )}
                      </select>

                      {errors.currentCountry && (
                        <small>
                          {errors.currentCountry}
                        </small>
                      )}
                    </div>


                    <div className="vg-find-field">
                      <label>
                        Current City
                      </label>

                      <input
                        type="text"
                        value={
                          formData.currentCity
                        }
                        onChange={(event) =>
                          updateField(
                            "currentCity",
                            event.target.value
                          )
                        }
                        placeholder="Your current city"
                      />
                    </div>


                    <div className="vg-find-field">
                      <label>
                        LinkedIn Profile
                      </label>

                      <input
                        type="url"
                        value={formData.linkedin}
                        onChange={(event) =>
                          updateField(
                            "linkedin",
                            event.target.value
                          )
                        }
                        placeholder="https://linkedin.com/in/yourprofile"
                      />
                    </div>

                  </div>


                  <div className="vg-find-divider" />

                  <div className="vg-find-form-section-title">
                    CURRENT STATUS
                  </div>

                  <div className="vg-find-selection-row">

                    {statuses.map((status) => (
                      <button
                        key={status}
                        type="button"
                        className={`vg-find-choice ${
                          formData.currentStatus ===
                          status
                            ? "selected"
                            : ""
                        }`}
                        onClick={() =>
                          updateField(
                            "currentStatus",
                            status
                          )
                        }
                      >
                        {formData.currentStatus ===
                          status && (
                          <span>✓</span>
                        )}

                        {status}
                      </button>
                    ))}

                  </div>


                  <div className="vg-find-divider" />

                  <div className="vg-find-form-section-title">
                    PROFESSIONAL INFORMATION
                  </div>

                  <div className="vg-find-field-grid">

                    <div
                      className={`vg-find-field ${
                        errors.currentRole
                          ? "has-error"
                          : ""
                      }`}
                      data-field="currentRole"
                    >
                      <label>
                        Current / Most Recent Role
                        <span>*</span>
                      </label>

                      <input
                        type="text"
                        value={
                          formData.currentRole
                        }
                        onChange={(event) =>
                          updateField(
                            "currentRole",
                            event.target.value
                          )
                        }
                        placeholder="e.g. Software Engineer"
                      />

                      {errors.currentRole && (
                        <small>
                          {errors.currentRole}
                        </small>
                      )}
                    </div>


                    <div
                      className={`vg-find-field ${
                        errors.experienceLevel
                          ? "has-error"
                          : ""
                      }`}
                      data-field="experienceLevel"
                    >
                      <label>
                        Experience
                        <span>*</span>
                      </label>

                      <select
                        value={
                          formData.experienceLevel
                        }
                        onChange={(event) =>
                          updateField(
                            "experienceLevel",
                            event.target.value
                          )
                        }
                      >
                        <option value="">
                          Select experience
                        </option>

                        {experienceOptions.map(
                          (experience) => (
                            <option
                              key={experience}
                              value={experience}
                            >
                              {experience}
                            </option>
                          )
                        )}
                      </select>

                      {errors.experienceLevel && (
                        <small>
                          {errors.experienceLevel}
                        </small>
                      )}
                    </div>


                    <div className="vg-find-field">
                      <label>
                        Highest Qualification
                      </label>

                      <select
                        value={
                          formData.qualification
                        }
                        onChange={(event) =>
                          updateField(
                            "qualification",
                            event.target.value
                          )
                        }
                      >
                        <option value="">
                          Select qualification
                        </option>

                        {qualifications.map(
                          (qualification) => (
                            <option
                              key={qualification}
                              value={qualification}
                            >
                              {qualification}
                            </option>
                          )
                        )}
                      </select>
                    </div>


                    <div className="vg-find-field">
                      <label>
                        Current Industry
                      </label>

                      <input
                        type="text"
                        value={
                          formData.currentIndustry
                        }
                        onChange={(event) =>
                          updateField(
                            "currentIndustry",
                            event.target.value
                          )
                        }
                        placeholder="e.g. Technology"
                      />
                    </div>

                  </div>


                  <div className="vg-find-divider" />

                  <div className="vg-find-form-section-title">
                    ABOUT YOU
                  </div>

                  <div
                    className="vg-find-field"
                    data-field="professionalSummary"
                  >
                    <label>
                      Tell us briefly about yourself
                    </label>

                    <textarea
                      value={
                        formData.professionalSummary
                      }
                      onChange={
                        handleSummaryChange
                      }
                      maxLength={500}
                      rows={3}
                      placeholder="Tell us briefly about yourself and your career."
                    />

                    <div className="vg-find-character-count">
                      {
                        formData
                          .professionalSummary
                          .length
                      }{" "}
                      / 500
                    </div>
                  </div>

                </div>
              )}


              {/* =========================================
                  STEP 2
              ========================================= */}

              {currentStep === 2 && (
                <div className="vg-find-step">

                  <div className="vg-find-form-section-title">
                    WHICH INDUSTRIES INTEREST YOU?
                  </div>

                  <p className="vg-find-helper">
                    Select one or more areas where
                    you would like your experience
                    to create impact.
                  </p>

                  <div className="vg-find-industry-grid">

                    {industries.map(
                      (industry) => {
                        const selected =
                          formData.industries.includes(
                            industry.id
                          );

                        return (
                          <button
                            type="button"
                            key={industry.id}
                            className={`vg-find-industry ${
                              selected
                                ? "selected"
                                : ""
                            }`}
                            onClick={() =>
                              toggleArrayValue(
                                "industries",
                                industry.id
                              )
                            }
                            aria-pressed={
                              selected
                            }
                          >
                            <span className="vg-find-industry-number">
                              {industry.number}
                            </span>

                            <span className="vg-find-industry-check">
                              {selected
                                ? "✓"
                                : "○"}
                            </span>

                            <strong>
                              {industry.name}
                            </strong>

                            <small>
                              {industry.description}
                            </small>
                          </button>
                        );
                      }
                    )}

                  </div>

                  {errors.industries && (
                    <div className="vg-find-error">
                      {errors.industries}
                    </div>
                  )}


                  <div className="vg-find-divider" />


                  <div className="vg-find-form-section-title">
                    WHAT DO YOU WORK WITH?
                  </div>

                  <p className="vg-find-helper">
                    Select the technologies, skills
                    and capabilities that describe
                    your experience.
                  </p>


                  <div className="vg-find-skill-search">

                    <span>⌕</span>

                    <input
                      type="text"
                      value={skillSearch}
                      onChange={(event) =>
                        setSkillSearch(
                          event.target.value
                        )
                      }
                      placeholder="Search technologies, skills or capabilities..."
                    />

                    {skillSearch && (
                      <button
                        type="button"
                        onClick={() =>
                          setSkillSearch("")
                        }
                      >
                        ×
                      </button>
                    )}

                  </div>


                  <div className="vg-find-selected-skills">

                    {formData.skills.map(
                      (skill) => (
                        <button
                          type="button"
                          key={skill}
                          className="vg-find-selected-chip"
                          onClick={() =>
                            toggleArrayValue(
                              "skills",
                              skill
                            )
                          }
                        >
                          ✓ {skill}
                          <span>×</span>
                        </button>
                      )
                    )}

                  </div>


                  <div className="vg-find-skill-scroll">

                    {technologyGroups.map(
                      (group) => (
                        <div
                          className="vg-find-skill-group"
                          key={group.title}
                        >
                          <span>
                            {group.title}
                          </span>

                          <div>
                            {group.skills
                              .filter((skill) =>
                                filteredSkills.includes(
                                  skill
                                )
                              )
                              .map((skill) => {
                                const selected =
                                  formData.skills.includes(
                                    skill
                                  );

                                return (
                                  <button
                                    type="button"
                                    key={skill}
                                    className={`vg-find-skill ${
                                      selected
                                        ? "selected"
                                        : ""
                                    }`}
                                    onClick={() =>
                                      toggleArrayValue(
                                        "skills",
                                        skill
                                      )
                                    }
                                  >
                                    {selected && (
                                      <span>
                                        ✓
                                      </span>
                                    )}

                                    {skill}
                                  </button>
                                );
                              })}
                          </div>
                        </div>
                      )
                    )}

                  </div>


                  <div className="vg-find-other-skill">

                    <label>
                      OTHER SKILL
                    </label>

                    <input
                      type="text"
                      value={
                        formData.otherSkills
                      }
                      onChange={(event) =>
                        updateField(
                          "otherSkills",
                          event.target.value
                        )
                      }
                      placeholder="Add another skill or capability"
                    />

                  </div>

                  {errors.skills && (
                    <div className="vg-find-error">
                      {errors.skills}
                    </div>
                  )}

                </div>
              )}


              {/* =========================================
                  STEP 3
              ========================================= */}

              {currentStep === 3 && (
                <div className="vg-find-step">

                  <div className="vg-find-preference-grid">

                    <div className="vg-find-preference-block">

                      <span>
                        OPPORTUNITY TYPE
                      </span>

                      <div className="vg-find-choice-grid">

                        {opportunityTypes.map(
                          (option) => (
                            <button
                              type="button"
                              key={option}
                              className={`vg-find-choice ${
                                formData.opportunityTypes.includes(
                                  option
                                )
                                  ? "selected"
                                  : ""
                              }`}
                              onClick={() =>
                                toggleArrayValue(
                                  "opportunityTypes",
                                  option
                                )
                              }
                            >
                              {formData.opportunityTypes.includes(
                                option
                              ) && (
                                <span>
                                  ✓
                                </span>
                              )}

                              {option}
                            </button>
                          )
                        )}

                      </div>

                      {errors.opportunityTypes && (
                        <small className="vg-find-inline-error">
                          {errors.opportunityTypes}
                        </small>
                      )}

                    </div>


                    <div className="vg-find-preference-block">

                      <span>
                        WORK MODE
                      </span>

                      <div className="vg-find-choice-grid">

                        {workModes.map(
                          (option) => (
                            <button
                              type="button"
                              key={option}
                              className={`vg-find-choice ${
                                formData.workModes.includes(
                                  option
                                )
                                  ? "selected"
                                  : ""
                              }`}
                              onClick={() =>
                                toggleArrayValue(
                                  "workModes",
                                  option
                                )
                              }
                            >
                              {formData.workModes.includes(
                                option
                              ) && (
                                <span>
                                  ✓
                                </span>
                              )}

                              {option}
                            </button>
                          )
                        )}

                      </div>

                      {errors.workModes && (
                        <small className="vg-find-inline-error">
                          {errors.workModes}
                        </small>
                      )}

                    </div>


                    <div className="vg-find-preference-block vg-find-country-block">

                      <span>
                        WHERE WOULD YOU LIKE TO WORK?
                      </span>

                      <div className="vg-find-country-selector">

                        <button
                          type="button"
                          className="vg-find-country-trigger"
                          onClick={() =>
                            setCountryOpen(
                              (current) =>
                                !current
                            )
                          }
                        >
                          <span>
                            {formData
                              .preferredCountries
                              .length
                              ? `${formData.preferredCountries.length} countries selected`
                              : "Select preferred countries"}
                          </span>

                          <span>⌄</span>
                        </button>


                        {countryOpen && (
                          <div className="vg-find-country-menu">

                            <div className="vg-find-country-search">
                              <input
                                autoFocus
                                type="text"
                                value={
                                  countrySearch
                                }
                                onChange={(
                                  event
                                ) =>
                                  setCountrySearch(
                                    event.target
                                      .value
                                  )
                                }
                                placeholder="Search countries..."
                              />
                            </div>

                            <div className="vg-find-country-options">

                              {filteredCountries.map(
                                (country) => {
                                  const selected =
                                    formData.preferredCountries.includes(
                                      country
                                    );

                                  return (
                                    <button
                                      type="button"
                                      key={country}
                                      className={
                                        selected
                                          ? "selected"
                                          : ""
                                      }
                                      onClick={() =>
                                        toggleArrayValue(
                                          "preferredCountries",
                                          country
                                        )
                                      }
                                    >
                                      <span>
                                        {selected
                                          ? "✓"
                                          : ""}
                                      </span>

                                      {country}
                                    </button>
                                  );
                                }
                              )}

                            </div>

                          </div>
                        )}

                      </div>


                      <div className="vg-find-selected-country-list">

                        {formData.preferredCountries.map(
                          (country) => (
                            <button
                              type="button"
                              key={country}
                              onClick={() =>
                                toggleArrayValue(
                                  "preferredCountries",
                                  country
                                )
                              }
                            >
                              {country}
                              <span>×</span>
                            </button>
                          )
                        )}

                      </div>

                      {errors.preferredCountries && (
                        <small className="vg-find-inline-error">
                          {
                            errors.preferredCountries
                          }
                        </small>
                      )}

                    </div>


                    <div className="vg-find-preference-block">

                      <span>
                        PREFERRED CITIES
                      </span>

                      <div className="vg-find-city-input">

                        <input
                          type="text"
                          placeholder="Type a city and press Enter"
                          onKeyDown={(event) => {
                            if (
                              event.key ===
                              "Enter"
                            ) {
                              event.preventDefault();

                              const city =
                                event.target.value.trim();

                              if (
                                city &&
                                !formData.preferredCities.includes(
                                  city
                                )
                              ) {
                                toggleArrayValue(
                                  "preferredCities",
                                  city
                                );
                              }

                              event.target.value =
                                "";
                            }
                          }}
                        />

                      </div>

                      <div className="vg-find-selected-country-list">

                        {formData.preferredCities.map(
                          (city) => (
                            <button
                              type="button"
                              key={city}
                              onClick={() =>
                                toggleArrayValue(
                                  "preferredCities",
                                  city
                                )
                              }
                            >
                              {city}
                              <span>×</span>
                            </button>
                          )
                        )}

                      </div>

                    </div>


                    <div className="vg-find-preference-block">

                      <span>
                        RELOCATION
                      </span>

                      <div className="vg-find-choice-grid compact">

                        {relocationOptions.map(
                          (option) => (
                            <button
                              type="button"
                              key={option}
                              className={`vg-find-choice ${
                                formData.relocation ===
                                option
                                  ? "selected"
                                  : ""
                              }`}
                              onClick={() =>
                                updateField(
                                  "relocation",
                                  option
                                )
                              }
                            >
                              {formData.relocation ===
                                option && (
                                <span>
                                  ✓
                                </span>
                              )}

                              {option}
                            </button>
                          )
                        )}

                      </div>

                    </div>


                    <div
                      className={`vg-find-preference-block ${
                        errors.availability
                          ? "has-error"
                          : ""
                      }`}
                      data-field="availability"
                    >

                      <span>
                        AVAILABILITY
                      </span>

                      <div className="vg-find-choice-grid">

                        {availabilityOptions.map(
                          (option) => (
                            <button
                              type="button"
                              key={option}
                              className={`vg-find-choice ${
                                formData.availability ===
                                option
                                  ? "selected"
                                  : ""
                              }`}
                              onClick={() =>
                                updateField(
                                  "availability",
                                  option
                                )
                              }
                            >
                              {formData.availability ===
                                option && (
                                <span>
                                  ✓
                                </span>
                              )}

                              {option}
                            </button>
                          )
                        )}

                      </div>

                      {errors.availability && (
                        <small className="vg-find-inline-error">
                          {errors.availability}
                        </small>
                      )}

                    </div>


                    <div className="vg-find-preference-block vg-find-career-block">

                      <span>
                        CAREER DIRECTION
                      </span>

                      <div className="vg-find-choice-grid">

                        {careerDirections.map(
                          (option) => (
                            <button
                              type="button"
                              key={option}
                              className={`vg-find-choice ${
                                formData.careerDirections.includes(
                                  option
                                )
                                  ? "selected"
                                  : ""
                              }`}
                              onClick={() =>
                                toggleArrayValue(
                                  "careerDirections",
                                  option
                                )
                              }
                            >
                              {formData.careerDirections.includes(
                                option
                              ) && (
                                <span>
                                  ✓
                                </span>
                              )}

                              {option}
                            </button>
                          )
                        )}

                      </div>

                    </div>

                  </div>

                </div>
              )}


              {/* =========================================
                  STEP 4
              ========================================= */}

              {currentStep === 4 && (
                <div className="vg-find-step">

                  <div className="vg-find-form-section-title">
                    RESUME
                  </div>

                  <div
                    className={`vg-find-upload ${
                      formData.resume
                        ? "has-file"
                        : ""
                    }`}
                  >

                    {!formData.resume ? (
                      <label className="vg-find-upload-inner">

                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={
                            handleResumeChange
                          }
                        />

                        <div className="vg-find-upload-icon">
                          ↑
                        </div>

                        <strong>
                          DROP YOUR RESUME HERE
                        </strong>

                        <span>
                          or choose a file
                        </span>

                        <small>
                          PDF
                          <b>•</b>
                          DOC
                          <b>•</b>
                          DOCX
                        </small>

                      </label>
                    ) : (
                      <div className="vg-find-uploaded-file">

                        <div className="vg-find-file-icon">
                          PDF
                        </div>

                        <div>
                          <strong>
                            {formData.resume.name}
                          </strong>

                          <span>
                            {(
                              formData.resume
                                .size /
                              (1024 * 1024)
                            ).toFixed(2)}{" "}
                            MB
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={
                            removeResume
                          }
                        >
                          Remove ×
                        </button>

                      </div>
                    )}

                  </div>

                  {errors.resume && (
                    <div className="vg-find-error">
                      {errors.resume}
                    </div>
                  )}


                  <div className="vg-find-divider" />


                  <div className="vg-find-form-section-title">
                    PROFESSIONAL LINKS
                  </div>

                  <div className="vg-find-field-grid">

                    <div className="vg-find-field">
                      <label>
                        LinkedIn
                      </label>

                      <input
                        type="url"
                        value={
                          formData.linkedin
                        }
                        onChange={(event) =>
                          updateField(
                            "linkedin",
                            event.target.value
                          )
                        }
                        placeholder="https://linkedin.com/in/yourprofile"
                      />
                    </div>


                    <div className="vg-find-field">
                      <label>
                        GitHub
                      </label>

                      <input
                        type="url"
                        value={
                          formData.github
                        }
                        onChange={(event) =>
                          updateField(
                            "github",
                            event.target.value
                          )
                        }
                        placeholder="https://github.com/yourprofile"
                      />
                    </div>


                    <div className="vg-find-field vg-find-field-full">
                      <label>
                        Portfolio / Website
                      </label>

                      <input
                        type="url"
                        value={
                          formData.portfolio
                        }
                        onChange={(event) =>
                          updateField(
                            "portfolio",
                            event.target.value
                          )
                        }
                        placeholder="https://yourportfolio.com"
                      />
                    </div>

                  </div>


                  <div className="vg-find-divider" />


                  <div className="vg-find-form-section-title">
                    ANYTHING ELSE?
                  </div>

                  <div className="vg-find-field">

                    <textarea
                      value={
                        formData.additionalInformation
                      }
                      onChange={(event) =>
                        updateField(
                          "additionalInformation",
                          event.target.value
                        )
                      }
                      rows={3}
                      placeholder="Tell us anything else you'd like our team to know..."
                    />

                  </div>


                  <div className="vg-find-divider" />


                  <div className="vg-find-form-section-title">
                    CONTACT PREFERENCE
                  </div>

                  <div className="vg-find-selection-row">

                    {[
                      "Email",
                      "Phone",
                      "WhatsApp",
                    ].map((option) => (
                      <button
                        type="button"
                        key={option}
                        className={`vg-find-choice ${
                          formData.contactPreference ===
                          option
                            ? "selected"
                            : ""
                        }`}
                        onClick={() =>
                          updateField(
                            "contactPreference",
                            option
                          )
                        }
                      >
                        {formData.contactPreference ===
                          option && (
                          <span>✓</span>
                        )}

                        {option}
                      </button>
                    ))}

                  </div>


                  <div
                    className={`vg-find-consent ${
                      errors.consent
                        ? "has-error"
                        : ""
                    }`}
                    data-field="consent"
                  >

                    <label>

                      <input
                        type="checkbox"
                        checked={
                          formData.consent
                        }
                        onChange={(event) =>
                          updateField(
                            "consent",
                            event.target.checked
                          )
                        }
                      />

                      <span className="vg-find-custom-checkbox">
                        {formData.consent
                          ? "✓"
                          : ""}
                      </span>

                      <span>
                        I agree to Vutkala Global
                        Technologies using the
                        information provided to
                        contact me regarding relevant
                        opportunities and services.
                        <span className="vg-find-consent-links">
                          Privacy Policy · Terms of Use
                        </span>
                      </span>

                    </label>

                    {errors.consent && (
                      <small>
                        {errors.consent}
                      </small>
                    )}

                  </div>

                </div>
              )}

            </div>


            {/* =================================================
                FORM FOOTER
            ================================================= */}

            <div className="vg-find-form-footer">

              <div className="vg-find-navigation">

                {currentStep > 1 ? (
                  <button
                    type="button"
                    className="vg-find-back-button"
                    onClick={handleBack}
                  >
                    ← BACK
                  </button>
                ) : (
                  <span />
                )}


                {currentStep < 4 ? (
                  <button
                    type="button"
                    className="vg-find-continue-button"
                    onClick={handleContinue}
                  >
                    CONTINUE
                    <span>→</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    className="vg-find-submit-button"
                    onClick={handleSubmit}
                  >
                    SUBMIT MY PROFILE
                    <span>→</span>
                  </button>
                )}

              </div>


              {/* =================================================
                  PROGRESS
              ================================================= */}

              <div className="vg-find-progress">

                {steps.map(
                  (step, index) => {
                    const stepNumber =
                      index + 1;

                    const completed =
                      stepNumber <
                      currentStep;

                    const active =
                      stepNumber ===
                      currentStep;

                    return (
                      <React.Fragment
                        key={step.number}
                      >

                        <button
                          type="button"
                          className={`vg-find-progress-step ${
                            active
                              ? "active"
                              : ""
                          } ${
                            completed
                              ? "completed"
                              : ""
                          }`}
                          onClick={() => {
                            if (
                              stepNumber <
                              currentStep
                            ) {
                              goToStep(
                                stepNumber
                              );
                            }
                          }}
                          disabled={
                            stepNumber >
                            currentStep
                          }
                        >
                          <span className="vg-find-progress-number">
                            {completed
                              ? "✓"
                              : step.number}
                          </span>

                          <span className="vg-find-progress-label">
                            {step.title}
                          </span>
                        </button>

                        {index <
                          steps.length - 1 && (
                          <span
                            className={`vg-find-progress-line ${
                              completed
                                ? "completed"
                                : ""
                            }`}
                          />
                        )}

                      </React.Fragment>
                    );
                  }
                )}

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ===================================================
          COMPACT FOOTER
      =================================================== */}


    </div>
  );
}

export default Jobs;