import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./ContactCandidate.css";

/*
|--------------------------------------------------------------------------
| API
|--------------------------------------------------------------------------
| Candidate profile:
| GET /api/candidates/:id
|
| EMAIL:
| Change ONLY the sendCandidateEmail() function below if your existing
| Nodemailer endpoint uses a different URL/payload.
|--------------------------------------------------------------------------
*/

const candidatesApi = axios.create({
  baseURL: "/api/candidates",
  withCredentials: true,
});


/* =========================================================
   SEND EMAIL
   ========================================================= */

const sendCandidateEmail = async ({
  candidateId,
  candidateEmail,
  candidateName,
  subject,
  message,
}) => {
  /*
   * IMPORTANT:
   *
   * Replace this endpoint with your existing Nodemailer
   * recruiter-email endpoint if it has a different path.
   *
   * Example expected backend:
   *
   * POST /api/candidates/:id/contact
   *
   * {
   *   candidate_id,
   *   candidate_email,
   *   candidate_name,
   *   subject,
   *   message
   * }
   */

  return axios.post(
    `/api/candidates/${candidateId}/contact`,
    {
      candidate_id: candidateId,
      candidate_email: candidateEmail,
      candidate_name: candidateName,
      subject,
      message,
    },
    {
      withCredentials: true,
    }
  );
};


/* =========================================================
   COMPONENT
   ========================================================= */

export default function ContactCandidate() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [candidate, setCandidate] = useState(null);

  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [subject, setSubject] = useState("");

  const [message, setMessage] = useState("");


  /* =======================================================
     LOAD CANDIDATE
     ======================================================= */

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

      const candidateData =
        response.data.candidate;

      setCandidate(candidateData);

      /*
       * Professional default subject
       */

      const candidateName =
        candidateData?.full_name ||
        candidateData?.name ||
        "Candidate";

      const jobTitle =
        candidateData?.current_job_title ||
        "an opportunity";

      setSubject(
        `Career Opportunity – ${jobTitle}`
      );

      setMessage(
        `Hi ${candidateName},

I came across your profile and was impressed by your background.

We currently have an opportunity that may be a good fit for your experience and skills.

I would be happy to discuss the role and provide more details.

Please let me know if you would be interested in having a conversation.

Best regards`
      );

    } catch (err) {
      console.error(
        "Contact candidate fetch error:",
        err
      );

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to load candidate."
      );
    } finally {
      setLoading(false);
    }
  };


  /* =======================================================
     SEND EMAIL
     ======================================================= */

  const handleSendEmail = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!candidate) {
      setError("Candidate information is unavailable.");
      return;
    }

    const candidateEmail =
      candidate.email;

    const candidateName =
      candidate.full_name ||
      candidate.name ||
      "Candidate";

    if (!candidateEmail) {
      setError(
        "This candidate has not provided an email address."
      );
      return;
    }

    if (!subject.trim()) {
      setError("Please enter an email subject.");
      return;
    }

    if (!message.trim()) {
      setError("Please enter your message.");
      return;
    }

    try {
      setSending(true);

      await sendCandidateEmail({
        candidateId: id,
        candidateEmail,
        candidateName,
        subject: subject.trim(),
        message: message.trim(),
      });

      setSuccess(
        `Your email has been sent successfully to ${candidateEmail}.`
      );

      /*
       * Don't immediately navigate away.
       * Recruiter can see confirmation.
       */

    } catch (err) {
      console.error(
        "Send candidate email error:",
        err
      );

      setError(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          "Unable to send email. Please try again."
      );
    } finally {
      setSending(false);
    }
  };


  /* =======================================================
     LOADING
     ======================================================= */

  if (loading) {
    return (
      <main className="contact-candidate-page">

        <div className="contact-candidate-loading">

          <div className="contact-candidate-spinner" />

          <h2>
            Loading candidate...
          </h2>

          <p>
            Preparing the contact form.
          </p>

        </div>

      </main>
    );
  }


  /* =======================================================
     ERROR
     ======================================================= */

  if (error && !candidate) {
    return (
      <main className="contact-candidate-page">

        <div className="contact-candidate-error">

          <div className="contact-error-icon">
            !
          </div>

          <h2>
            Unable to load candidate
          </h2>

          <p>
            {error}
          </p>

          <button
            type="button"
            onClick={() =>
              navigate(
                `/recruiter/candidates/${id}`
              )
            }
          >
            Back to Profile
          </button>

        </div>

      </main>
    );
  }


  const candidateName =
    candidate?.full_name ||
    candidate?.name ||
    "Candidate";

  const candidateEmail =
    candidate?.email ||
    "";

  const candidateLocation =
    candidate?.location ||
    "Location not specified";

  const candidateHeadline =
    candidate?.headline ||
    candidate?.current_job_title ||
    "Job Seeker";

  const candidateImage =
    candidate?.profile_image;


  /* =======================================================
     PAGE
     ======================================================= */

  return (
    <main className="contact-candidate-page">

      {/* =====================================================
          BREADCRUMB
          ===================================================== */}

      <div className="contact-candidate-breadcrumb">

        <button
          type="button"
          onClick={() =>
            navigate(
              `/recruiter/candidates/${id}`
            )
          }
        >
          ← Candidate Profile
        </button>

        <span>
          / Contact Candidate
        </span>

      </div>


      {/* =====================================================
          PAGE HEADER
          ===================================================== */}

      <div className="contact-candidate-header">

        <div>

          <span className="contact-header-label">
            RECRUITER COMMUNICATION
          </span>

          <h1>
            Contact Candidate
          </h1>

          <p>
            Start a professional conversation with
            this candidate directly through email.
          </p>

        </div>

      </div>


      {/* =====================================================
          SUCCESS MESSAGE
          ===================================================== */}

      {success && (
        <div className="contact-success-message">

          <div className="contact-success-icon">
            ✓
          </div>

          <div>

            <strong>
              Email sent successfully
            </strong>

            <p>
              {success}
            </p>

          </div>

          <button
            type="button"
            onClick={() => setSuccess("")}
          >
            ×
          </button>

        </div>
      )}


      {/* =====================================================
          ERROR MESSAGE
          ===================================================== */}

      {error && candidate && (
        <div className="contact-error-message">

          <span>
            !
          </span>

          <p>
            {error}
          </p>

          <button
            type="button"
            onClick={() => setError("")}
          >
            ×
          </button>

        </div>
      )}


      {/* =====================================================
          CONTENT
          ===================================================== */}

      <div className="contact-candidate-grid">


        {/* ===================================================
            LEFT — EMAIL FORM
        =================================================== */}

        <section className="contact-email-card">

          <div className="contact-card-header">

            <div className="contact-card-icon">
              ✉
            </div>

            <div>

              <h2>
                Compose Email
              </h2>

              <p>
                Write a professional message to
                the candidate.
              </p>

            </div>

          </div>


          <form
            onSubmit={handleSendEmail}
            className="contact-email-form"
          >

            {/* TO */}

            <div className="contact-form-group">

              <label>
                To
              </label>

              <div className="contact-recipient">

                {candidateImage ? (
                  <img
                    src={candidateImage}
                    alt={candidateName}
                  />
                ) : (
                  <div className="contact-recipient-avatar">
                    {candidateName
                      .charAt(0)
                      .toUpperCase()}
                  </div>
                )}

                <div>

                  <strong>
                    {candidateName}
                  </strong>

                  <span>
                    {candidateEmail ||
                      "No email available"}
                  </span>

                </div>

                <div className="contact-verified">
                  ✓
                </div>

              </div>

            </div>


            {/* SUBJECT */}

            <div className="contact-form-group">

              <label htmlFor="candidate-subject">
                Subject
              </label>

              <input
                id="candidate-subject"
                type="text"
                value={subject}
                onChange={(event) =>
                  setSubject(event.target.value)
                }
                placeholder="Enter email subject"
                maxLength={200}
                disabled={sending}
              />

            </div>


            {/* MESSAGE */}

            <div className="contact-form-group">

              <div className="contact-message-label">

                <label htmlFor="candidate-message">
                  Message
                </label>

                <span>
                  {message.length} characters
                </span>

              </div>

              <textarea
                id="candidate-message"
                value={message}
                onChange={(event) =>
                  setMessage(event.target.value)
                }
                placeholder="Write your message..."
                rows={13}
                maxLength={5000}
                disabled={sending}
              />

            </div>


            {/* FOOTER */}

            <div className="contact-form-footer">

              <span>
                Your email will be sent from your
                registered recruiter account.
              </span>

              <button
                type="submit"
                className="contact-send-button"
                disabled={
                  sending ||
                  !candidateEmail
                }
              >

                {sending ? (
                  <>
                    <span className="contact-button-spinner" />
                    Sending...
                  </>
                ) : (
                  <>
                    ✈ Send Email
                  </>
                )}

              </button>

            </div>

          </form>

        </section>


        {/* ===================================================
            RIGHT — CANDIDATE SUMMARY
        =================================================== */}

        <aside className="contact-candidate-sidebar">


          {/* CANDIDATE CARD */}

          <div className="contact-sidebar-card">

            <span className="contact-sidebar-label">
              CANDIDATE
            </span>

            <div className="contact-candidate-mini">

              {candidateImage ? (
                <img
                  src={candidateImage}
                  alt={candidateName}
                />
              ) : (
                <div className="contact-mini-avatar">
                  {candidateName
                    .charAt(0)
                    .toUpperCase()}
                </div>
              )}

              <div>

                <h3>
                  {candidateName}
                </h3>

                <p>
                  {candidateHeadline}
                </p>

              </div>

            </div>

            <div className="contact-mini-details">

              <div>
                <span>📍</span>
                <p>
                  {candidateLocation}
                </p>
              </div>

              <div>
                <span>✉</span>
                <p>
                  {candidateEmail ||
                    "Email unavailable"}
                </p>
              </div>

            </div>

            <Link
              to={`/recruiter/candidates/${id}`}
              className="contact-view-profile"
            >
              View Full Profile →
            </Link>

          </div>


          {/* EMAIL TIPS */}

          <div className="contact-sidebar-card contact-tips-card">

            <span className="contact-sidebar-label">
              COMMUNICATION TIPS
            </span>

            <h3>
              Make a strong first impression
            </h3>

            <div className="contact-tip">

              <span>
                01
              </span>

              <p>
                Introduce yourself and your
                company clearly.
              </p>

            </div>

            <div className="contact-tip">

              <span>
                02
              </span>

              <p>
                Mention why you think the
                candidate could be a good fit.
              </p>

            </div>

            <div className="contact-tip">

              <span>
                03
              </span>

              <p>
                Keep the message concise and
                professional.
              </p>

            </div>

            <div className="contact-tip">

              <span>
                04
              </span>

              <p>
                End with a clear next step.
              </p>

            </div>

          </div>


          {/* PRIVACY */}

          <div className="contact-privacy-card">

            <span>
              🔒
            </span>

            <p>
              Candidate contact information is
              intended only for legitimate
              recruitment communication.
            </p>

          </div>

        </aside>

      </div>

    </main>
  );
}