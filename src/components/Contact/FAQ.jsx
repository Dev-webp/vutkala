import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import "./FAQ.css";

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(0);

  const faqs = [
    {
      question: "How quickly will you respond?",
      answer:
        "Our team responds to all inquiries within 24 business hours. Urgent enterprise requests are typically addressed the same day by a dedicated account manager.",
    },
    {
      question: "What industries do you serve?",
      answer:
        "We serve enterprises across technology, healthcare, finance, retail, and manufacturing, delivering tailored staffing and digital transformation solutions for each sector.",
    },
    {
      question: "Do you provide offshore staffing?",
      answer:
        "Yes. We provide dedicated offshore and hybrid staffing models across our Hyderabad and Bangalore delivery centers, fully integrated with your USA teams.",
    },
    {
      question: "Can you help with AI projects?",
      answer:
        "Absolutely. Our AI and data engineering teams support everything from proof-of-concept builds to production-grade machine learning and generative AI systems.",
    },
    {
      question: "Do you provide cloud consulting?",
      answer:
        "Yes, we offer end-to-end cloud consulting across AWS, Azure, and GCP, including migration strategy, architecture design, and managed cloud operations.",
    },
  ];

  const toggleIndex = (index) => {
    setActiveIndex(activeIndex === index ? -1 : index);
  };

  return (
    <section className="faq-section">
      <div className="faq-header">
        <span className="faq-badge">FAQ</span>
        <h2>Frequently Asked Questions</h2>
        <p>Answers to the questions we hear most from our clients.</p>
      </div>

      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div
            className={`faq-item ${activeIndex === index ? "open" : ""}`}
            key={index}
          >
            <button className="faq-question" onClick={() => toggleIndex(index)}>
              <span>{faq.question}</span>
              <span className="faq-icon">
                <FiPlus />
              </span>
            </button>

            <div className="faq-answer-wrapper">
              <p className="faq-answer">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FAQ;