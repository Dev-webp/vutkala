import React, { useState } from "react";
import { submitHiringRequest } from "../../services/hiringService";
import "./Hire.css";

/* ============================================================
   STATIC OPTIONS
   ============================================================ */

const INDUSTRY_OPTIONS = [
  "Information Technology",
  "Healthcare",
  "Finance & Banking",
  "Education",
  "Engineering",
  "Construction",
  "Manufacturing",
  "Retail",
  "Hospitality",
  "Logistics & Supply Chain",
  "Human Resources",
  "Sales & Marketing",
  "Legal",
  "Real Estate",
  "Media & Entertainment",
  "Other",
];

const COMPANY_SIZE_OPTIONS = ["1-10", "11-50", "51-200", "201-500", "501-1000", "1000+"];

const HIRING_TYPE_OPTIONS = ["Permanent", "Contract", "Temporary", "Internship", "Freelance"];

const EMPLOYMENT_TYPE_OPTIONS = ["Full Time", "Part Time"];

const EXPERIENCE_OPTIONS = ["Fresher", "0-1 Years", "1-3 Years", "3-5 Years", "5-8 Years", "8+ Years"];

const SALARY_PERIOD_OPTIONS = ["Annual", "Monthly", "Hourly"];

const WORK_MODE_OPTIONS = ["On-site", "Hybrid", "Remote"];

const HIRING_URGENCY_OPTIONS = ["Immediately", "Within 2 weeks", "Within 1 month", "1-3 months", "Flexible"];

const INTERVIEW_PROCESS_OPTIONS = [
  { value: "vutkal", label: "VUTKAL manages initial screening" },
  { value: "company", label: "Company manages interviews" },
  { value: "both", label: "Both" },
];

const STEP_META = [
  { id: 1, label: "Company & Hiring" },
  { id: 2, label: "Role & Candidate" },
  { id: 3, label: "Submit" },
];

const EMPTY_FORM = {
  companyName: "",
  companyEmail: "",
  phone: "",
  industry: "",
  companySize: "",
  website: "",

  position: "",
  numberOfPositions: 1,
  hiringType: "",
  employmentType: "",

  jobDescription: "",
  responsibilities: "",
  requiredSkills: "",
  preferredSkills: "",

  experience: "",
  education: "",
  industryExperience: "",
  certifications: "",
  languages: "",

  salaryMin: "",
  salaryMax: "",
  salaryPeriod: "",
  workMode: "",
  location: "",
  preferredCandidateLocation: "",

  hiringUrgency: "",
  expectedJoiningDate: "",
  interviewProcess: "",

  contactPerson: "",
  designation: "",
  contactEmail: "",
  contactPhone: "",

  additionalInformation: "",
  consent: false,
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+]?[\d\s()-]{7,20}$/;

function Hire() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState("");

  /* -------------------- Field helpers -------------------- */

  const setField = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setField(name, type === "checkbox" ? checked : value);
  };

  /* -------------------- Validation -------------------- */

  const validateStep1 = () => {
    const next = {};
    if (!formData.companyName.trim()) next.companyName = "Please enter your company name.";
    if (!formData.companyEmail.trim()) {
      next.companyEmail = "Please enter your company email.";
    } else if (!EMAIL_REGEX.test(formData.companyEmail.trim())) {
      next.companyEmail = "Please enter a valid email address.";
    }
    if (!formData.phone.trim()) {
      next.phone = "Please enter a phone number.";
    } else if (!PHONE_REGEX.test(formData.phone.trim())) {
      next.phone = "Please enter a valid phone number.";
    }
    if (!formData.industry) next.industry = "Please select an industry.";
    if (!formData.position.trim()) next.position = "Please enter the position or role.";
    if (!formData.numberOfPositions || Number(formData.numberOfPositions) < 1) {
      next.numberOfPositions = "Number of positions must be at least 1.";
    }
    if (!formData.hiringType) next.hiringType = "Please select a hiring type.";
    if (!formData.employmentType) next.employmentType = "Please select an employment type.";
    return next;
  };

  const validateStep2 = () => {
    const next = {};
    if (!formData.jobDescription.trim()) next.jobDescription = "Please provide a job description.";
    if (!formData.experience) next.experience = "Please select the required experience level.";
    return next;
  };

  const validateStep3 = () => {
    const next = {};
    if (!formData.workMode) next.workMode = "Please select a work mode.";
    if (!formData.location.trim()) next.location = "Please enter a job location.";
    if (!formData.hiringUrgency) next.hiringUrgency = "Please select your hiring urgency.";

    if (formData.salaryMin !== "" && Number(formData.salaryMin) < 0) {
      next.salaryMin = "Minimum salary cannot be negative.";
    }
    if (formData.salaryMax !== "" && Number(formData.salaryMax) < 0) {
      next.salaryMax = "Maximum salary cannot be negative.";
    }
    if (
      formData.salaryMin !== "" &&
      formData.salaryMax !== "" &&
      Number(formData.salaryMax) < Number(formData.salaryMin)
    ) {
      next.salaryMax = "Maximum salary cannot be lower than minimum salary.";
    }

    if (!formData.contactPerson.trim()) next.contactPerson = "Please enter a contact person.";
    if (!formData.contactEmail.trim()) {
      next.contactEmail = "Please enter a contact email.";
    } else if (!EMAIL_REGEX.test(formData.contactEmail.trim())) {
      next.contactEmail = "Please enter a valid email address.";
    }
    if (!formData.contactPhone.trim()) {
      next.contactPhone = "Please enter a contact phone number.";
    } else if (!PHONE_REGEX.test(formData.contactPhone.trim())) {
      next.contactPhone = "Please enter a valid phone number.";
    }
    if (!formData.consent) next.consent = "Please agree to be contacted regarding this hiring requirement.";
    return next;
  };

  const focusFirstError = (errObj) => {
    const firstKey = Object.keys(errObj)[0];
    if (!firstKey) return;
    requestAnimationFrame(() => {
      const el = document.querySelector('[data-field="' + firstKey + '"]');
      if (el && el.scrollIntoView) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      if (el && el.focus) {
        try {
          el.focus({ preventScroll: true });
        } catch (e) {
          el.focus();
        }
      }
    });
  };

  /* -------------------- Navigation -------------------- */

  const goNext = () => {
    let stepErrors = {};
    if (currentStep === 1) stepErrors = validateStep1();
    if (currentStep === 2) stepErrors = validateStep2();

    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      focusFirstError(stepErrors);
      return;
    }

    setErrors({});
    setCurrentStep((s) => Math.min(s + 1, 3));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goBack = () => {
    setErrors({});
    setCurrentStep((s) => Math.max(s - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* -------------------- Submit -------------------- */

  const handleSubmit = async () => {
    const stepErrors = validateStep3();
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      focusFirstError(stepErrors);
      return;
    }

    setSubmitError("");
    setLoading(true);

    try {
      const response = await submitHiringRequest(formData);
      const data = response && response.data ? response.data : {};

      if (data.success) {
        setReferenceNumber(data.referenceNumber || "");
        setSubmitted(true);
      } else {
        setSubmitError(
          data.message || "Unable to submit your hiring request. Please try again."
        );
      }
    } catch (err) {
      setSubmitError("Unable to submit your hiring request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData(EMPTY_FORM);
    setErrors({});
    setSubmitError("");
    setSubmitted(false);
    setReferenceNumber("");
    setCurrentStep(1);
  };

  /* -------------------- Shared render helpers -------------------- */

  const renderError = (name) =>
    errors[name] ? (
      <p className="vh-error" role="alert">
        {errors[name]}
      </p>
    ) : null;

  const fieldClass = (name) => "vh-field" + (errors[name] ? " vh-field--error" : "");

  /* ============================================================
     STEP 1 — COMPANY & HIRING
     ============================================================ */

  const renderStep1 = () => (
    <>
      <div className="vh-section">
        <div className="vh-section-heading">
          <span className="vh-section-icon" aria-hidden="true">
            &#127970;
          </span>
          <div>
            <p className="vh-section-title">Company Information</p>
            <p className="vh-section-hint">Please provide your organization details.</p>
          </div>
        </div>

        <div className="vh-grid-2">
          <div className={fieldClass("companyName")}>
            <label htmlFor="companyName">
              1. Company Name <span className="vh-required">*</span>
            </label>
            <input
              id="companyName"
              name="companyName"
              data-field="companyName"
              type="text"
              placeholder="Enter your company name"
              value={formData.companyName}
              onChange={handleChange}
            />
            {renderError("companyName")}
          </div>

          <div className={fieldClass("companyEmail")}>
            <label htmlFor="companyEmail">
              2. Company Email <span className="vh-required">*</span>
            </label>
            <input
              id="companyEmail"
              name="companyEmail"
              data-field="companyEmail"
              type="email"
              placeholder="Enter your work email"
              value={formData.companyEmail}
              onChange={handleChange}
            />
            {renderError("companyEmail")}
          </div>

          <div className={fieldClass("phone")}>
            <label htmlFor="phone">
              3. Phone <span className="vh-required">*</span>
            </label>
            <input
              id="phone"
              name="phone"
              data-field="phone"
              type="tel"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
            />
            {renderError("phone")}
          </div>

          <div className={fieldClass("industry")}>
            <label htmlFor="industry">
              4. Industry <span className="vh-required">*</span>
            </label>
            <select
              id="industry"
              name="industry"
              data-field="industry"
              value={formData.industry}
              onChange={handleChange}
            >
              <option value="">Select your industry</option>
              {INDUSTRY_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            {renderError("industry")}
          </div>

          <div className="vh-field">
            <label htmlFor="companySize">5. Company Size</label>
            <select
              id="companySize"
              name="companySize"
              value={formData.companySize}
              onChange={handleChange}
            >
              <option value="">Select company size</option>
              {COMPANY_SIZE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div className="vh-field">
            <label htmlFor="website">6. Website</label>
            <input
              id="website"
              name="website"
              type="text"
              placeholder="Enter your website (optional)"
              value={formData.website}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="vh-divider" />

      <div className="vh-section">
        <div className="vh-section-heading">
          <span className="vh-section-icon" aria-hidden="true">
            &#128188;
          </span>
          <div>
            <p className="vh-section-title">Hiring Requirement</p>
            <p className="vh-section-hint">Tell us about the role you are hiring for.</p>
          </div>
        </div>

        <div className="vh-grid-2">
          <div className={fieldClass("position") + " vh-field--full"}>
            <label htmlFor="position">
              7. Position / Role <span className="vh-required">*</span>
            </label>
            <input
              id="position"
              name="position"
              data-field="position"
              type="text"
              placeholder="e.g. Senior Accountant, Registered Nurse, Sales Executive"
              value={formData.position}
              onChange={handleChange}
            />
            {renderError("position")}
          </div>

          <div className={fieldClass("numberOfPositions")}>
            <label htmlFor="numberOfPositions">
              8. Number of Positions <span className="vh-required">*</span>
            </label>
            <input
              id="numberOfPositions"
              name="numberOfPositions"
              data-field="numberOfPositions"
              type="number"
              min="1"
              value={formData.numberOfPositions}
              onChange={handleChange}
            />
            {renderError("numberOfPositions")}
          </div>

          <div className={fieldClass("hiringType")}>
            <label htmlFor="hiringType">
              9. Hiring Type <span className="vh-required">*</span>
            </label>
            <select
              id="hiringType"
              name="hiringType"
              data-field="hiringType"
              value={formData.hiringType}
              onChange={handleChange}
            >
              <option value="">Select hiring type</option>
              {HIRING_TYPE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            {renderError("hiringType")}
          </div>

          <div className={fieldClass("employmentType")}>
            <label htmlFor="employmentType">
              10. Employment Type <span className="vh-required">*</span>
            </label>
            <select
              id="employmentType"
              name="employmentType"
              data-field="employmentType"
              value={formData.employmentType}
              onChange={handleChange}
            >
              <option value="">Select employment type</option>
              {EMPLOYMENT_TYPE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            {renderError("employmentType")}
          </div>
        </div>
      </div>
    </>
  );

  /* ============================================================
     STEP 2 — ROLE & CANDIDATE
     ============================================================ */

  const renderStep2 = () => (
    <>
      <div className="vh-section">
        <div className="vh-section-heading">
          <span className="vh-section-icon" aria-hidden="true">
            &#128221;
          </span>
          <div>
            <p className="vh-section-title">Role Details</p>
            <p className="vh-section-hint">
              Describe the role in your own words &mdash; any profession, any industry.
            </p>
          </div>
        </div>

        <div className={fieldClass("jobDescription") + " vh-field--full"}>
          <label htmlFor="jobDescription">
            1. Job Description <span className="vh-required">*</span>
          </label>
          <textarea
            id="jobDescription"
            name="jobDescription"
            data-field="jobDescription"
            rows={5}
            placeholder="Describe the role, its purpose and what success looks like."
            value={formData.jobDescription}
            onChange={handleChange}
          />
          {renderError("jobDescription")}
        </div>

        <div className="vh-field vh-field--full">
          <label htmlFor="responsibilities">2. Key Responsibilities</label>
          <textarea
            id="responsibilities"
            name="responsibilities"
            rows={4}
            placeholder="List the main day-to-day responsibilities for this role."
            value={formData.responsibilities}
            onChange={handleChange}
          />
        </div>

        <div className="vh-grid-2">
          <div className="vh-field">
            <label htmlFor="requiredSkills">3. Required Skills</label>
            <input
              id="requiredSkills"
              name="requiredSkills"
              type="text"
              placeholder="e.g. React, Patient Care, Taxation, AutoCAD, Sales Forecasting"
              value={formData.requiredSkills}
              onChange={handleChange}
            />
          </div>

          <div className="vh-field">
            <label htmlFor="preferredSkills">4. Preferred Skills</label>
            <input
              id="preferredSkills"
              name="preferredSkills"
              type="text"
              placeholder="Nice-to-have skills or experience"
              value={formData.preferredSkills}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="vh-divider" />

      <div className="vh-section">
        <div className="vh-section-heading">
          <span className="vh-section-icon" aria-hidden="true">
            &#127891;
          </span>
          <div>
            <p className="vh-section-title">Candidate Requirements</p>
            <p className="vh-section-hint">Help us understand who you're looking for.</p>
          </div>
        </div>

        <div className={fieldClass("experience") + " vh-field--full"}>
          <label htmlFor="experience">
            5. Experience <span className="vh-required">*</span>
          </label>
          <div className="vh-pill-row" data-field="experience">
            {EXPERIENCE_OPTIONS.map((opt) => (
              <button
                type="button"
                key={opt}
                className={"vh-pill" + (formData.experience === opt ? " vh-pill--selected" : "")}
                aria-pressed={formData.experience === opt}
                onClick={() => setField("experience", opt)}
              >
                {opt}
              </button>
            ))}
          </div>
          {renderError("experience")}
        </div>

        <div className="vh-grid-2">
          <div className="vh-field">
            <label htmlFor="education">6. Education</label>
            <input
              id="education"
              name="education"
              type="text"
              placeholder="e.g. Bachelor's in Commerce, B.Sc. Nursing"
              value={formData.education}
              onChange={handleChange}
            />
          </div>

          <div className="vh-field">
            <label htmlFor="industryExperience">7. Industry Experience</label>
            <input
              id="industryExperience"
              name="industryExperience"
              type="text"
              placeholder="e.g. 3+ years in Healthcare"
              value={formData.industryExperience}
              onChange={handleChange}
            />
          </div>

          <div className="vh-field">
            <label htmlFor="certifications">8. Certifications</label>
            <input
              id="certifications"
              name="certifications"
              type="text"
              placeholder="e.g. PMP, CPA, RN License"
              value={formData.certifications}
              onChange={handleChange}
            />
          </div>

          <div className="vh-field">
            <label htmlFor="languages">9. Languages</label>
            <input
              id="languages"
              name="languages"
              type="text"
              placeholder="e.g. English, Hindi, Spanish"
              value={formData.languages}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </>
  );

  /* ============================================================
     STEP 3 — COMPENSATION, TIMELINE & SUBMIT
     ============================================================ */

  const renderStep3 = () => (
    <>
      <div className="vh-section">
        <div className="vh-section-heading">
          <span className="vh-section-icon" aria-hidden="true">
            &#128176;
          </span>
          <div>
            <p className="vh-section-title">Compensation & Location</p>
            <p className="vh-section-hint">Optional salary details help us match faster.</p>
          </div>
        </div>

        <div className="vh-grid-2">
          <div className={fieldClass("salaryMin")}>
            <label htmlFor="salaryMin">1. Minimum Salary</label>
            <input
              id="salaryMin"
              name="salaryMin"
              data-field="salaryMin"
              type="number"
              min="0"
              placeholder="Minimum salary"
              value={formData.salaryMin}
              onChange={handleChange}
            />
            {renderError("salaryMin")}
          </div>

          <div className={fieldClass("salaryMax")}>
            <label htmlFor="salaryMax">2. Maximum Salary</label>
            <input
              id="salaryMax"
              name="salaryMax"
              data-field="salaryMax"
              type="number"
              min="0"
              placeholder="Maximum salary"
              value={formData.salaryMax}
              onChange={handleChange}
            />
            {renderError("salaryMax")}
          </div>

          <div className="vh-field">
            <label htmlFor="salaryPeriod">3. Salary Period</label>
            <select
              id="salaryPeriod"
              name="salaryPeriod"
              value={formData.salaryPeriod}
              onChange={handleChange}
            >
              <option value="">Select salary period</option>
              {SALARY_PERIOD_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div className={fieldClass("workMode")}>
            <label htmlFor="workMode">
              4. Work Mode <span className="vh-required">*</span>
            </label>
            <select
              id="workMode"
              name="workMode"
              data-field="workMode"
              value={formData.workMode}
              onChange={handleChange}
            >
              <option value="">Select work mode</option>
              {WORK_MODE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            {renderError("workMode")}
          </div>

          <div className={fieldClass("location")}>
            <label htmlFor="location">
              5. Location <span className="vh-required">*</span>
            </label>
            <input
              id="location"
              name="location"
              data-field="location"
              type="text"
              placeholder="e.g. Hyderabad, India"
              value={formData.location}
              onChange={handleChange}
            />
            {renderError("location")}
          </div>

          <div className="vh-field">
            <label htmlFor="preferredCandidateLocation">6. Preferred Candidate Location</label>
            <input
              id="preferredCandidateLocation"
              name="preferredCandidateLocation"
              type="text"
              placeholder="Where should candidates be based?"
              value={formData.preferredCandidateLocation}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="vh-divider" />

      <div className="vh-section">
        <div className="vh-section-heading">
          <span className="vh-section-icon" aria-hidden="true">
            &#128197;
          </span>
          <div>
            <p className="vh-section-title">Hiring Timeline</p>
            <p className="vh-section-hint">Let us know how soon you need this role filled.</p>
          </div>
        </div>

        <div className="vh-grid-2">
          <div className={fieldClass("hiringUrgency") + " vh-field--full"}>
            <label htmlFor="hiringUrgency">
              7. Hiring Urgency <span className="vh-required">*</span>
            </label>
            <div className="vh-pill-row" data-field="hiringUrgency">
              {HIRING_URGENCY_OPTIONS.map((opt) => (
                <button
                  type="button"
                  key={opt}
                  className={
                    "vh-pill" + (formData.hiringUrgency === opt ? " vh-pill--selected" : "")
                  }
                  aria-pressed={formData.hiringUrgency === opt}
                  onClick={() => setField("hiringUrgency", opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
            {renderError("hiringUrgency")}
          </div>

          <div className="vh-field">
            <label htmlFor="expectedJoiningDate">8. Expected Joining Date</label>
            <input
              id="expectedJoiningDate"
              name="expectedJoiningDate"
              type="date"
              value={formData.expectedJoiningDate}
              onChange={handleChange}
            />
          </div>

          <div className="vh-field">
            <label>9. Interview Process</label>
            <div className="vh-radio-group" role="radiogroup" aria-label="Interview process">
              {INTERVIEW_PROCESS_OPTIONS.map((opt) => (
                <label className="vh-radio" key={opt.value}>
                  <input
                    type="radio"
                    name="interviewProcess"
                    value={opt.value}
                    checked={formData.interviewProcess === opt.value}
                    onChange={handleChange}
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="vh-divider" />

      <div className="vh-section">
        <div className="vh-section-heading">
          <span className="vh-section-icon" aria-hidden="true">
            &#128100;
          </span>
          <div>
            <p className="vh-section-title">Contact Person</p>
            <p className="vh-section-hint">Who should our recruitment team reach out to?</p>
          </div>
        </div>

        <div className="vh-grid-2">
          <div className={fieldClass("contactPerson")}>
            <label htmlFor="contactPerson">
              10. Contact Person <span className="vh-required">*</span>
            </label>
            <input
              id="contactPerson"
              name="contactPerson"
              data-field="contactPerson"
              type="text"
              placeholder="Full name"
              value={formData.contactPerson}
              onChange={handleChange}
            />
            {renderError("contactPerson")}
          </div>

          <div className="vh-field">
            <label htmlFor="designation">11. Designation</label>
            <input
              id="designation"
              name="designation"
              type="text"
              placeholder="e.g. HR Manager"
              value={formData.designation}
              onChange={handleChange}
            />
          </div>

          <div className={fieldClass("contactEmail")}>
            <label htmlFor="contactEmail">
              12. Email <span className="vh-required">*</span>
            </label>
            <input
              id="contactEmail"
              name="contactEmail"
              data-field="contactEmail"
              type="email"
              placeholder="Enter contact email"
              value={formData.contactEmail}
              onChange={handleChange}
            />
            {renderError("contactEmail")}
          </div>

          <div className={fieldClass("contactPhone")}>
            <label htmlFor="contactPhone">
              13. Phone <span className="vh-required">*</span>
            </label>
            <input
              id="contactPhone"
              name="contactPhone"
              data-field="contactPhone"
              type="tel"
              placeholder="Enter contact phone number"
              value={formData.contactPhone}
              onChange={handleChange}
            />
            {renderError("contactPhone")}
          </div>
        </div>
      </div>

      <div className="vh-divider" />

      <div className="vh-section">
        <div className="vh-field vh-field--full">
          <label htmlFor="additionalInformation">14. Additional Information</label>
          <textarea
            id="additionalInformation"
            name="additionalInformation"
            rows={3}
            placeholder="Anything else we should know about this hiring requirement?"
            value={formData.additionalInformation}
            onChange={handleChange}
          />
        </div>

        <div className={fieldClass("consent") + " vh-field--full"}>
          <label className="vh-checkbox" data-field="consent">
            <input
              type="checkbox"
              name="consent"
              checked={formData.consent}
              onChange={handleChange}
            />
            <span>I agree to be contacted by VUTKAL regarding this hiring requirement.</span>
          </label>
          {renderError("consent")}
        </div>
      </div>

      {submitError && (
        <div className="vh-error-banner" role="alert">
          {submitError}
        </div>
      )}
    </>
  );

  const stepTitles = {
    1: {
      number: "01",
      title: "Company & Hiring",
      sub: "Tell us about your organization and the talent you are looking to hire.",
    },
    2: {
      number: "02",
      title: "Role & Candidate",
      sub: "Tell us what the role requires and what kind of candidate you're looking for.",
    },
    3: {
      number: "03",
      title: "Compensation & Next Steps",
      sub: "Tell us about compensation, location and your hiring timeline.",
    },
  };

  const stepContent = { 1: renderStep1, 2: renderStep2, 3: renderStep3 }[currentStep];

  /* ============================================================
     SUCCESS SCREEN
     ============================================================ */

  if (submitted) {
    return (
      <div className="vh-page">
        <div className="vh-success">
          <div className="vh-success-card">
            <span className="vh-success-check" aria-hidden="true">
              &#10003;
            </span>
            <h1 className="vh-success-title">Hiring Request Received</h1>
            <p className="vh-success-copy">
              Thank you for contacting VUTKAL Global. We&apos;ve received your hiring
              requirement. Our recruitment team will review the details and contact you
              shortly.
            </p>

            <div className="vh-reference">
              <span>Reference</span>
              <strong>{referenceNumber || "Pending"}</strong>
            </div>

            <div className="vh-next-steps">
              <p className="vh-next-steps-title">What happens next?</p>
              <div className="vh-next-steps-grid">
                <div className="vh-next-step">
                  <span>01</span>
                  <p>Our team reviews your requirement.</p>
                </div>
                <div className="vh-next-step">
                  <span>02</span>
                  <p>A recruitment specialist contacts you.</p>
                </div>
                <div className="vh-next-step">
                  <span>03</span>
                  <p>We discuss your hiring requirement.</p>
                </div>
                <div className="vh-next-step">
                  <span>04</span>
                  <p>Candidate sourcing begins.</p>
                </div>
              </div>
            </div>

            <div className="vh-success-actions">
              <a href="/" className="vh-btn-primary">
                Back to VUTKAL
              </a>
              <button type="button" className="vh-btn-text" onClick={resetForm}>
                Submit another request
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ============================================================
     MAIN RENDER
     ============================================================ */

  return (
    <div className="vh-page">
      <div className="vh-layout">
        <aside className="vh-aside">
          <div className="vh-aside-top">
            <div className="vh-logo">
              <span className="vh-logo-mark" aria-hidden="true">
                V
              </span>
              <span className="vh-logo-text">
                VUTKAL <strong>GLOBAL</strong>
                <small>TECHNOLOGIES</small>
              </span>
            </div>

            <span className="vh-aside-rule" aria-hidden="true" />

            <h2 className="vh-aside-title">
              Let&apos;s build the right team, <span>together.</span>
            </h2>
            <p className="vh-aside-copy">
              Fill in the details and our team will connect with you shortly.
            </p>
          </div>

          <div className="vh-aside-visual" aria-hidden="true">
            <svg viewBox="0 0 400 220" className="vh-skyline-svg">
              <rect x="10" y="90" width="30" height="130" />
              <rect x="50" y="60" width="26" height="160" />
              <rect x="86" y="110" width="24" height="110" />
              <rect x="120" y="40" width="30" height="180" />
              <rect x="160" y="80" width="22" height="140" />
              <rect x="192" y="20" width="34" height="200" />
              <rect x="236" y="70" width="24" height="150" />
              <rect x="270" y="100" width="28" height="120" />
              <rect x="308" y="50" width="26" height="170" />
              <rect x="344" y="95" width="30" height="125" />
            </svg>
          </div>

          <div className="vh-aside-badge">
            <span className="vh-aside-badge-icon" aria-hidden="true">
              &#128737;
            </span>
            <div>
              <p className="vh-aside-badge-title">Your hiring partner for growth and success.</p>
              <p className="vh-aside-badge-copy">
                We connect great companies with exceptional talent.
              </p>
            </div>
          </div>
        </aside>

        <main className="vh-main">
          <div className="vh-progress" role="tablist" aria-label="Hiring request steps">
            {STEP_META.map((step, index) => {
              const state =
                step.id < currentStep ? "done" : step.id === currentStep ? "active" : "upcoming";
              return (
                <React.Fragment key={step.id}>
                  <div className={"vh-progress-item vh-progress-item--" + state}>
                    <span className="vh-progress-dot">
                      {state === "done" ? "\u2713" : String(step.id).padStart(2, "0")}
                    </span>
                    <span className="vh-progress-label">{step.label}</span>
                  </div>
                  {index < STEP_META.length - 1 && (
                    <span
                      className={
                        "vh-progress-line " + (step.id < currentStep ? "vh-progress-line--done" : "")
                      }
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>

          <div className="vh-step-header">
            <span className="vh-step-number">{stepTitles[currentStep].number}</span>
            <div>
              <h1 className="vh-step-title">{stepTitles[currentStep].title}</h1>
              <p className="vh-step-sub">{stepTitles[currentStep].sub}</p>
            </div>
          </div>

          <div className="vh-form-body">{stepContent()}</div>

          <div className="vh-nav">
            {currentStep > 1 ? (
              <button type="button" className="vh-btn-outline" onClick={goBack}>
                <span aria-hidden="true">&#8592;</span> Back
              </button>
            ) : (
              <span />
            )}

            {currentStep < 3 ? (
              <button type="button" className="vh-btn-primary" onClick={goNext}>
                Continue <span aria-hidden="true">&#8594;</span>
              </button>
            ) : (
              <button
                type="button"
                className="vh-btn-primary"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Submitting Request..." : "Submit Hiring Request \u2192"}
              </button>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Hire;