import React from "react";

export default function About(props) {
  return (
    <div
      className="about-container p-4"
      style={{ color: props.mode === "dark" ? "white" : "black" }}
    >
      <h1 className="mb-4">About TextUtils</h1>
      <p className="lead">
        TextUtils is a comprehensive text manipulation suite designed for speed,
        efficiency, and advanced AI integration.
      </p>

      <div className="row mt-4">
        <div className="col-md-6">
          <ul
            className="list-group list-group-flush"
            style={{ background: "transparent" }}
          >
            <li
              className="list-group-item bg-transparent"
              style={{ color: props.mode === "dark" ? "white" : "black" }}
            >
              <strong>✨ AI Integration:</strong> Generate high-quality content,
              essays, and summaries instantly using Llama 3.3.
            </li>
            <li
              className="list-group-item bg-transparent"
              style={{ color: props.mode === "dark" ? "white" : "black" }}
            >
              <strong>🎙️ Talk to Type:</strong> Use your voice to dictate text
              directly into the editor with our real-time mic feature.
            </li>
            <li
              className="list-group-item bg-transparent"
              style={{ color: props.mode === "dark" ? "white" : "black" }}
            >
              <strong>🔄 History Management:</strong> Never lose progress with
              built-in Undo and Redo capabilities.
            </li>
            <li
              className="list-group-item bg-transparent"
              style={{ color: props.mode === "dark" ? "white" : "black" }}
            >
              <strong>📥 Document Export:</strong> Download your work in PDF,
              TXT, or DOCX formats with a single click.
            </li>
          </ul>
        </div>

        <div className="col-md-6">
          <ul
            className="list-group list-group-flush"
            style={{ background: "transparent" }}
          >
            <li
              className="list-group-item bg-transparent"
              style={{ color: props.mode === "dark" ? "white" : "black" }}
            >
              <strong>🔠 Case Manipulation:</strong> Switch between Uppercase,
              Lowercase, Capitalize, and CamelCase formats.
            </li>
            <li
              className="list-group-item bg-transparent"
              style={{ color: props.mode === "dark" ? "white" : "black" }}
            >
              <strong>🧹 Efficiency Tools:</strong> Remove extra spaces, bold
              important text, and check your reading time.
            </li>
            <li
              className="list-group-item bg-transparent"
              style={{ color: props.mode === "dark" ? "white" : "black" }}
            >
              <strong>🌙 Premium Design:</strong> A fully responsive dark mode
              experience with smooth animations.
            </li>
            <li
              className="list-group-item bg-transparent"
              style={{ color: props.mode === "dark" ? "white" : "black" }}
            >
              <strong>🖨️ Print Ready:</strong> Format and print your documents
              directly from the interface.
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-5">
        <h4>Tech Stack Used:</h4>
        <div className="badge bg-primary m-1 p-2">React.js</div>
        <div className="badge bg-info m-1 p-2">Bootstrap 5</div>
        <div className="badge bg-success m-1 p-2">Groq AI API</div>
        <div className="badge bg-secondary m-1 p-2">Web Speech API</div>
      </div>
    </div>
  );
}
