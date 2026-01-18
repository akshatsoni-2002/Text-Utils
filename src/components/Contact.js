import React, { useState } from "react";

export default function Contact(props) {
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const response = await fetch("https://formspree.io/f/meolpygl", {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      form.reset();
      setStatus("SUCCESS");
    } else {
      setStatus("ERROR");
    }
  };

  // Dynamic styles to force white placeholder in dark mode
  const inputStyle = {
    backgroundColor: props.mode === "dark" ? "#0d1117" : "white",
    color: props.mode === "dark" ? "white" : "black",
    border: props.mode === "dark" ? "1px solid #30363d" : "none",
  };

  return (
    <div className="contact-wrapper">
      <h1 style={{ color: props.mode === "dark" ? "#2bd7ee" : "#494b4b" }}>
        Let's Connect
      </h1>

      <div className="buttons-wrap">
        <a
          href="https://wa.me/919660640140"
          target="_blank"
          rel="noreferrer"
          className="social-btn whatsapp"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
            alt="WhatsApp"
          />
          WhatsApp
        </a>

        <a
          href="https://www.linkedin.com/in/akshat-soni-421646119"
          target="_blank"
          rel="noreferrer"
          className="social-btn linkedin"
        >
          <img
            src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg"
            alt="LinkedIn"
          />
          LinkedIn
        </a>

        <a
          href="https://www.instagram.com/_akshat.soni"
          target="_blank"
          rel="noreferrer"
          className="social-btn instagram"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
            alt="Instagram"
          />
          Instagram
        </a>
      </div>

      <div className="query-section">
        <h2 style={{ color: props.mode === "dark" ? "#2bd7ee" : "#494b4b" }}>
          Have a Query? Contact Me
        </h2>

        {/* The query-form-dark class in App.css will handle the white placeholder */}
        <form
          id="query-form"
          onSubmit={handleSubmit}
          className={`query-form ${
            props.mode === "dark" ? "query-form-dark" : ""
          }`}
        >
          <input
            type="text"
            name="first-name"
            placeholder="First Name"
            required
            style={inputStyle}
          />
          <input
            type="text"
            name="last-name"
            placeholder="Last Name"
            required
            style={inputStyle}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            style={inputStyle}
          />
          <textarea
            name="query"
            placeholder="Your Query..."
            rows="4"
            required
            style={inputStyle}
          ></textarea>
          <button type="submit">Submit</button>
        </form>

        {status === "SUCCESS" && (
          <p
            id="form-success"
            style={{
              display: "block",
              color: props.mode === "dark" ? "#00ff7f" : "#494b4b",
            }}
          >
            ✅ Thanks for your query! I will get back to you soon.
          </p>
        )}
      </div>
    </div>
  );
}
