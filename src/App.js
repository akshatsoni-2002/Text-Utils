import "./App.css";
import Navbar from "./components/Navbar";
import TextForm from "./components/TextForm";
import About from "./components/About";
import Contact from "./components/Contact";
import { useState, useEffect } from "react";

function App() {
  const [mode, setMode] = useState("light");
  const [view, setView] = useState("home");

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
    } else {
      setMode("light");
    }
  };

  useEffect(() => {
    if (mode === "dark") {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [mode]);

  return (
    <>
      <Navbar
        title="TextUtils"
        mode={mode}
        toggleMode={toggleMode}
        setView={setView}
      />

      <div className="container my-3">
        {view === "home" && (
          <TextForm heading="Enter the text to analyze" mode={mode} />
        )}
        {view === "about" && <About mode={mode} />}
        {view === "contact" && <Contact mode={mode} />}
      </div>
    </>
  );
}

export default App;
