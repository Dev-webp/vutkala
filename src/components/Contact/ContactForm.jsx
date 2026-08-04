import { useState } from "react";
import { FiSend, FiCheckCircle } from "react-icons/fi";
import "./ContactForm.css";

const initialState = {
  firstName: "",
  lastName: "",
  company: "",
  email: "",
  phone: "",
  country: "",
  service: "",
  message: "",
};

function ContactForm() {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.company.trim()) newErrors.company = "Company name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.country.trim()) newErrors.country = "Country is required";
    if (!formData.service) newErrors.service = "Please select a service";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus("loading");

    setTimeout(() => {
      setStatus("success");
      setFormData(initialState);
      setTimeout(() => setStatus("idle"), 4000);
    }, 1800);
  };

  const fields = [
    { name: "firstName", label: "First Name", type: "text" },
    { name: "lastName", label: "Last Name", type: "text" },
    { name: "company", label: "Company Name", type: "text" },
    { name: "email", label: "Email Address", type: "email" },
    { name: "phone", label: "Phone Number", type: "tel" },
    { name: "country", label: "Country", type: "text" },
  ];

  return (
    <section className="contact-form-section">
      <div className="cf-header">
        <span className="cf-badge">GET IN TOUCH</span>
        <h2>Send Us a Message</h2>
        <p>
          Fill out the form below and our team will get back to you within
          24 business hours.
        </p>
      </div>

      <form className="cf-form" onSubmit={handleSubmit} noValidate>
        <div className="cf-grid">
          {fields.map((field) => (
            <div className="cf-field" key={field.name}>
              <input
                type={field.type}
                name={field.name}
                id={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder=" "
                className={errors[field.name] ? "cf-input error" : "cf-input"}
              />
              <label htmlFor={field.name}>{field.label}</label>
              {errors[field.name] && (
                <span className="cf-error-text">{errors[field.name]}</span>
              )}
            </div>
          ))}

          <div className="cf-field">
            <select
              name="service"
              id="service"
              value={formData.service}
              onChange={handleChange}
              className={errors.service ? "cf-input cf-select error" : "cf-input cf-select"}
            >
              <option value="" disabled hidden></option>
              <option value="staffing">Staffing Solutions</option>
              <option value="executive-search">Executive Search</option>
              <option value="digital-transformation">Digital Transformation</option>
              <option value="cloud-consulting">Cloud Consulting</option>
              <option value="ai-solutions">AI Solutions</option>
              <option value="software-engineering">Software Engineering</option>
            </select>
            <label htmlFor="service" className="cf-select-label">
              Service Required
            </label>
            {errors.service && (
              <span className="cf-error-text">{errors.service}</span>
            )}
          </div>

          <div className="cf-field cf-full">
            <textarea
              name="message"
              id="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              placeholder=" "
              className={errors.message ? "cf-input cf-textarea error" : "cf-input cf-textarea"}
            ></textarea>
            <label htmlFor="message">Message</label>
            {errors.message && (
              <span className="cf-error-text">{errors.message}</span>
            )}
          </div>
        </div>

        <button
          type="submit"
          className={`cf-submit-btn ${status === "success" ? "success" : ""}`}
          disabled={status === "loading"}
        >
          {status === "loading" && <span className="cf-spinner"></span>}
          {status === "success" && (
            <>
              <FiCheckCircle /> Message Sent
            </>
          )}
          {status === "idle" && (
            <>
              Send Message <FiSend />
            </>
          )}
        </button>
      </form>
    </section>
  );
}

export default ContactForm;