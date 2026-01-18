import React, { useState } from "react";
import PropTypes from "prop-types";
import { jsPDF } from "jspdf";
import { saveAs } from "file-saver";
import htmlDocx from "html-docx-js/dist/html-docx";

export default function TextForm(props) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const [history, setHistory] = useState([""]);
  const [historyStep, setHistoryStep] = useState(0);

  // Talk to Type Logic
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  if (recognition) {
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";
    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      setText(transcript);
    };
    recognition.onend = () => setIsListening(false);
  }

  const handleVoiceClick = () => {
    if (!recognition)
      return alert("Your browser does not support Speech Recognition.");
    isListening ? recognition.stop() : recognition.start();
    setIsListening(!isListening);
  };

  const updateTextAndHistory = (newText) => {
    const newHistory = history.slice(0, historyStep + 1);
    setHistory([...newHistory, newText]);
    setHistoryStep(newHistory.length);
    setText(newText);
  };

  const handleUpClick = () => updateTextAndHistory(text.toUpperCase());
  const handleLoClick = () => updateTextAndHistory(text.toLowerCase());
  const handleCamelCase = () => {
    let newText = text
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
        index === 0 ? word.toLowerCase() : word.toUpperCase()
      )
      .replace(/\s+/g, "");
    updateTextAndHistory(newText);
  };
  const handleBoldClick = () => setIsBold(!isBold);
  const handleExtraSpaces = () =>
    updateTextAndHistory(text.split(/\s+/).join(" "));
  const handleClearClick = () => updateTextAndHistory("");
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };
  const handleCapitalize = () => {
    const newText = text
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    updateTextAndHistory(newText);
  };

  // More Menu Actions
  const handleUndo = () => {
    if (historyStep > 0) {
      setHistoryStep(historyStep - 1);
      setText(history[historyStep - 1]);
    }
  };
  const handleRedo = () => {
    if (historyStep < history.length - 1) {
      setHistoryStep(historyStep + 1);
      setText(history[historyStep + 1]);
    }
  };
  const handleDownload = (type) => {
    if (type === "txt")
      saveAs(
        new Blob([text], { type: "text/plain;charset=utf-8" }),
        "textutils.txt"
      );
    else if (type === "pdf") {
      const doc = new jsPDF();
      doc.text(text, 10, 10);
      doc.save("textutils.pdf");
    } else if (type === "doc")
      saveAs(
        htmlDocx.asBlob(`<!DOCTYPE html><html><body>${text}</body></html>`),
        "textutils.docx"
      );
  };

  const handleAiGenerate = async () => {
    if (!text) return alert("Please enter a prompt first!");
    setLoading(true);
    try {
      const apiKey = "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";
      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [
              { role: "system", content: "You are a helpful assistant." },
              { role: "user", content: text },
            ],
          }),
        }
      );
      const data = await response.json();
      updateTextAndHistory(data.choices[0].message.content);
    } catch (error) {
      alert(`AI Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleOnChange = (e) => setText(e.target.value);
  const wordCount = text
    .split(/\s+/)
    .filter((element) => element.length !== 0).length;

  return (
    <div style={{ color: props.mode === "dark" ? "white" : "black" }}>
      <h1 className="mb-3">{props.heading}</h1>
      <textarea
        className="form-control"
        rows="8"
        value={text}
        onChange={handleOnChange}
        placeholder="Enter your text here...."
        style={{
          backgroundColor: props.mode === "dark" ? "#0d1117" : "white",
          color: props.mode === "dark" ? "white" : "black",
          fontWeight: isBold ? "bold" : "normal",
        }}
      ></textarea>
      <div className="mt-3">
        <button
          className={`btn btn-danger mx-1 my-1 ${
            isListening ? "blink-mic" : ""
          }`}
          onClick={handleVoiceClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z" />
            <path d="M11 8a3 3 0 0 1-6 0V4a3 3 0 1 1 6 0v4z" />
          </svg>
        </button>
        <button
          className="btn btn-primary mx-1 my-1"
          onClick={handleUpClick}
          disabled={!text}
        >
          Uppercase
        </button>
        <button
          className="btn btn-primary mx-1 my-1"
          onClick={handleLoClick}
          disabled={!text}
        >
          Lowercase
        </button>
        {/* Changed warning to primary */}
        <button
          className="btn btn-primary mx-1 my-1"
          onClick={handleCamelCase}
          disabled={!text}
        >
          CamelCase
        </button>
        <button
          className="btn btn-primary mx-1 my-1"
          onClick={handleCapitalize}
          disabled={!text}
        >
          Capitalize
        </button>
        {/* Changed secondary to primary */}
        <button
          className="btn btn-primary mx-1 my-1"
          onClick={handleBoldClick}
          disabled={!text}
        >
          Bold
        </button>
        <button
          className="btn btn-primary mx-1 my-1"
          onClick={handleExtraSpaces}
          disabled={!text}
        >
          Remove Spaces
        </button>
        {/* Changed success to primary */}
        <button
          className="btn btn-primary mx-1 my-1"
          onClick={handleCopy}
          disabled={!text}
        >
          Copy
        </button>
        <button
          className="btn btn-primary mx-1 my-1"
          onClick={handleClearClick}
          disabled={!text}
        >
          Clear
        </button>
        <div className="btn-group mx-1 my-1">
          {/* Changed info to danger */}
          <button
            type="button"
            className="btn btn-danger dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            More
          </button>
          <ul className="dropdown-menu shadow">
            <li>
              <button className="dropdown-item" onClick={handleUndo}>
                Undo
              </button>
            </li>
            <li>
              <button className="dropdown-item" onClick={handleRedo}>
                Redo
              </button>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => handleDownload("pdf")}
              >
                Download PDF
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => handleDownload("txt")}
              >
                Download TXT
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => handleDownload("doc")}
              >
                Download DOC
              </button>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <button className="dropdown-item" onClick={() => window.print()}>
                Print Document
              </button>
            </li>
          </ul>
        </div>
        <button
          className="btn btn-ai mx-1 my-1"
          onClick={handleAiGenerate}
          disabled={loading || !text}
        >
          {loading ? "Generating..." : "✨ Generate with AI"}
        </button>
      </div>
      <div className="my-3">
        <h2>Your Text Summary</h2>
        <p>
          <b>{wordCount}</b> words and <b>{text.length}</b> characters
        </p>
        <p>
          <b>{(0.008 * wordCount).toFixed(2)}</b> Minutes read
        </p>
      </div>
    </div>
  );
}
