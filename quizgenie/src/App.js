import React, { useState } from "react";
import "./App.css";

/*
  QuizGenie Main Container
  - Automatic Question Generation from user topic/text
  - Customizable Quiz Settings (number, difficulty, etc)
  - Instant Preview
  - Export as PDF, Copy, and Share as Link

  Color theme:
    primary   : #2D6A4F
    secondary : #40916C
    accent    : #FFD166
  Light theme with clean layout.
*/

// Helper function for simple MCQ generation (placeholder)
function generateQuizQuestions(text, num, difficulty) {
  // Simulate MCQ generation based on topic/text
  if (!text || text.trim().length === 0) return [];
  const difficulties = {
    Easy: "🟢",
    Medium: "🟡",
    Hard: "🔴",
  };

  return Array.from({ length: num }, (_, i) => ({
    question: `(${difficulties[difficulty] || ""}) Question ${i + 1} about "${text.slice(
      0,
      35
    )}"?`,
    options: [
      `Correct answer for ${i + 1}`,
      `Distractor 1 for ${i + 1}`,
      `Distractor 2 for ${i + 1}`,
      `Distractor 3 for ${i + 1}`,
    ].sort(() => Math.random() - 0.5),
    answer: `Correct answer for ${i + 1}`,
  }));
}

// PUBLIC_INTERFACE
function App() {
  // State
  const [topic, setTopic] = useState("");
  const [quizSettings, setQuizSettings] = useState({
    numQuestions: 5,
    difficulty: "Medium",
  });

  const [questions, setQuestions] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [sharingUrl, setSharingUrl] = useState(null);

  // Handle input changes
  const handleTopicChange = (e) => setTopic(e.target.value);

  const handleSettingsChange = (e) => {
    const { name, value } = e.target;
    setQuizSettings((qs) => ({
      ...qs,
      [name]: name === "numQuestions" ? Number(value) : value,
    }));
  };

  // Generate quiz questions
  const handleGenerate = () => {
    const { numQuestions, difficulty } = quizSettings;
    setQuestions(generateQuizQuestions(topic, numQuestions, difficulty));
    setShowPreview(true);
    setSharingUrl(null);
  };

  // 'Export as PDF' (prints preview as PDF)
  const handleExportPDF = () => {
    window.print();
  };

  // Share link (simulate - would need backend in reality)
  const handleShare = () => {
    // This is only for demo; in real app, would upload quiz, get link.
    const quizData = {
      topic,
      settings: quizSettings,
      questions,
    };
    const fakeUrl = `${
      window.location.origin
    }/quiz/share/${btoa(JSON.stringify(quizData)).slice(0, 16)}`;
    setSharingUrl(fakeUrl);
    // Optionally select/copy
    navigator.clipboard?.writeText(fakeUrl);
  };

  // Copy quiz to clipboard as text
  const handleCopy = () => {
    let text = `Quiz: ${topic}\n`;
    questions.forEach((q, i) => {
      text += `\n${i + 1}. ${q.question}\n`;
      q.options.forEach((opt, oi) => {
        text += `   ${String.fromCharCode(65 + oi)}. ${opt}\n`;
      });
    });
    navigator.clipboard?.writeText(text);
  };

  // Theming - inline for primary/secondary/accent, but uses App.css base for overall
  const theme = {
    "--primary": "#2D6A4F",
    "--secondary": "#40916C",
    "--accent": "#FFD166",
    background: "#f7fafb",
    minHeight: "100vh"
  };

  return (
    <div className="app" style={theme}>
      {/* NavBar */}
      <nav
        className="navbar"
        style={{ background: "#fff", color: "#2D6A4F", borderBottom: "1px solid #e0e0e0" }}
      >
        <div className="container" style={{ maxWidth: 1200 }}>
          <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            <div className="logo" style={{ color: "#2D6A4F" }}>
              <span
                className="logo-symbol"
                style={{
                  color: "#FFD166",
                  fontWeight: "bold",
                  fontSize: "1.7rem",
                  marginRight: 6,
                  marginTop: 2,
                  verticalAlign: "middle",
                  filter: "drop-shadow(0 1px 2px #40916c20)",
                }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="#FFD166" style={{ marginRight: 2 }}><circle cx="12" cy="12" r="10" fill="#FFD166"/><text x="12" y="17" textAnchor="middle" fill="#2D6A4F" fontSize="16" fontWeight="bold" fontFamily="monospace">Q</text></svg>
              </span>
              QuizGenie
            </div>
            <a
              className="btn"
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: "#40916C",
                color: "white",
                textDecoration: "none",
                fontWeight: "bold"
              }}
            >
              About
            </a>
          </div>
        </div>
      </nav>

      {/* Main Body Layout */}
      <main
        style={{
          paddingTop: 96,
          background: "#f7fafb",
          minHeight: "calc(100vh - 60px)",
        }}
      >
        <div
          className="container"
          style={{
            maxWidth: 1200,
            display: "flex",
            gap: 32,
            marginTop: 24,
            flexWrap: "wrap",
            alignItems: "flex-start",
          }}
        >
          {/* Sidebar: Quiz Settings */}
          <aside
            style={{
              background: "#fff",
              borderRadius: 10,
              padding: "32px 20px",
              minWidth: 230,
              maxWidth: 300,
              boxShadow: "0 1px 8px 0 #e0e0e018",
              flex: "0 0 260px",
              border: "1px solid #e8e8e8"
            }}
          >
            <h3 style={{ color: "#2D6A4F", marginTop: 0, fontWeight: 700, fontSize: "1.12rem", letterSpacing: 0.1 }}>
              Quiz Settings
            </h3>
            <label style={{ display: "block", margin: "18px 0 7px", fontWeight: 500 }}>
              Number of Questions
              <input
                name="numQuestions"
                type="number"
                min={1}
                max={20}
                value={quizSettings.numQuestions}
                onChange={handleSettingsChange}
                style={{
                  width: "100%",
                  marginTop: 3,
                  padding: "7px",
                  fontSize: "1rem",
                  borderRadius: 5,
                  border: "1px solid #B7E4C7",
                  background: "#f7fafb",
                  color: "#277441",
                }}
              />
            </label>
            <label style={{ display: "block", margin: "18px 0 7px", fontWeight: 500 }}>
              Difficulty Level
              <select
                name="difficulty"
                value={quizSettings.difficulty}
                onChange={handleSettingsChange}
                style={{
                  width: "100%",
                  marginTop: 3,
                  padding: "7px",
                  fontSize: "1rem",
                  borderRadius: 5,
                  border: "1px solid #B7E4C7",
                  background: "#f7fafb",
                  color: "#277441",
                }}
              >
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
            </label>
            <div style={{ marginTop: 44 }}>
              <small style={{ color: "#888" }}>
                You can adjust these before generating or after editing questions below.
              </small>
            </div>
          </aside>

          {/* Main Content: Input & Quiz */}
          <section
            style={{
              flex: "1 1 400px",
              minWidth: 320,
              maxWidth: 760,
              background: "#fff",
              borderRadius: 10,
              marginBottom: 32,
              boxShadow: "0 1px 8px 0 #e0e0e01a",
              border: "1px solid #e8e8e8",
              padding: "34px 34px 24px 34px"
            }}
          >
            <div style={{ marginBottom: 24 }}>
              <div style={{ color: "#40916C", fontWeight: 600, fontSize: "1.1rem" }}>
                AI-Assisted MCQ Generator
              </div>
              <h1
                className="title"
                style={{
                  margin: "7px 0 14px",
                  fontSize: "2.1rem",
                  color: "#2D6A4F",
                  lineHeight: 1.2,
                }}
              >
                Generate Multiple-Choice Quizzes Instantly
              </h1>
              <div
                className="description"
                style={{
                  color: "#6c757d",
                  fontSize: "1.04rem",
                  marginBottom: 0,
                  maxWidth: 530,
                }}
              >
                Enter a topic or paste study text and QuizGenie will craft a set of multiple-choice questions automatically. Tweak settings, preview, export, or share.
              </div>
            </div>
            {/* Input for topic/text */}
            <div>
              <label style={{ fontWeight: 500, color: "#2D6A4F" }}>
                Enter Topic or Text:
                <textarea
                  placeholder="Type the subject, chapter, or paste study text here..."
                  rows={3}
                  value={topic}
                  onChange={handleTopicChange}
                  style={{
                    marginTop: 6,
                    width: "100%",
                    minHeight: 80,
                    border: "1.5px solid #B7E4C7",
                    borderRadius: 7,
                    fontSize: "1.06rem",
                    padding: "10px",
                    color: "#2D6A4F",
                    resize: "vertical",
                    background: "#f7fafb"
                  }}
                />
              </label>
            </div>
            {/* Action Buttons */}
            <div style={{ margin: "26px 0 10px", display: "flex", gap: 16, flexWrap: "wrap" }}>
              <button
                className="btn"
                style={{
                  backgroundColor: "#2D6A4F",
                  color: "white",
                  fontWeight: 600,
                  minWidth: 120,
                  fontSize: "1.07rem"
                }}
                disabled={topic.trim().length === 0}
                onClick={handleGenerate}
              >
                Generate Quiz
              </button>
              {questions.length > 0 && (
                <>
                  <button
                    className="btn"
                    style={{
                      backgroundColor: "#40916C",
                      color: "white",
                      fontWeight: 600,
                      minWidth: 120,
                      fontSize: "1.07rem"
                    }}
                    onClick={() => setShowPreview((v) => !v)}
                  >
                    {showPreview ? "Hide Preview" : "Preview Quiz"}
                  </button>
                  <button
                    className="btn"
                    style={{
                      backgroundColor: "#FFD166",
                      color: "#2D6A4F",
                      fontWeight: 600,
                      minWidth: 110,
                      fontSize: "1.07rem"
                    }}
                    onClick={handleExportPDF}
                  >
                    Export as PDF
                  </button>
                  <button
                    className="btn"
                    style={{
                      backgroundColor: "#FFF9EC",
                      color: "#FF8800",
                      border: "1.5px solid #FFD166",
                      fontWeight: 600,
                      fontSize: "1.07rem"
                    }}
                    onClick={handleCopy}
                  >
                    Copy Quiz
                  </button>
                  <button
                    className="btn"
                    style={{
                      backgroundColor: "#fff",
                      color: "#277441",
                      border: "1.5px solid #40916C",
                      fontWeight: 600,
                      fontSize: "1.07rem"
                    }}
                    onClick={handleShare}
                  >
                    Share Link
                  </button>
                </>
              )}
            </div>
            {/* Success message for sharing */}
            {sharingUrl && (
              <div style={{ margin: "15px 0 0", color: "#2D6A4F", fontWeight: 500, fontSize: "1.02rem" }}>
                🔗 Shareable link:{" "}
                <span
                  style={{
                    background: "#f1f8ec",
                    borderRadius: 4,
                    padding: "2px 8px",
                    fontFamily: "monospace",
                    cursor: "pointer",
                  }}
                  title="Click to copy"
                  onClick={() => {
                    navigator.clipboard?.writeText(sharingUrl);
                  }}
                >
                  {sharingUrl}
                </span>
              </div>
            )}

            {/* Quiz Preview */}
            {showPreview && (
              <div
                style={{
                  margin: "32px 0 18px",
                  background: "#fcfcff",
                  borderRadius: 10,
                  border: "1.2px solid #ECECEC",
                  padding: "23px 18px 20px 18px",
                  boxShadow: "0 1px 12px #b7e4c710",
                }}
              >
                <h3
                  style={{
                    color: "#40916C",
                    margin: 0,
                    fontSize: "1.23rem",
                    fontWeight: 600,
                  }}
                >
                  Quiz Preview ({questions.length} questions)
                </h3>
                {questions.length === 0 ? (
                  <div style={{ color: "#2D6A4F", margin: "10px 0" }}>
                    No questions generated yet. Please enter a topic and click 'Generate Quiz'.
                  </div>
                ) : (
                  <ol style={{ paddingLeft: 18, marginBottom: 0 }}>
                    {questions.map((q, i) => (
                      <li key={i} style={{ margin: "17px 0" }}>
                        <b style={{ color: "#2D6A4F" }}>{q.question}</b>
                        <ol type="A" style={{ marginLeft: 16, marginTop: 5 }}>
                          {q.options.map((opt, oi) => (
                            <li
                              key={oi}
                              style={{
                                margin: 0,
                                padding: 0,
                                color:
                                  showPreview && q.answer === opt
                                    ? "#FFD166"
                                    : "#40916C",
                                fontWeight:
                                  showPreview && q.answer === opt ? 600 : 500,
                                background:
                                  showPreview && q.answer === opt
                                    ? "#fff6da"
                                    : "",
                                borderRadius: "3px",
                                display: "inline-block",
                                marginRight: "10px",
                                padding: "1px 9px",
                                fontSize: "1.02rem",
                              }}
                            >
                              {opt}
                              {showPreview && q.answer === opt ? " ✓" : ""}
                            </li>
                          ))}
                        </ol>
                      </li>
                    ))}
                  </ol>
                )}
              </div>
            )}
            {/* Help/Tip Footer */}
            <div
              style={{
                marginTop: showPreview ? 13 : 55,
                color: "#888",
                fontSize: "0.98rem",
                textAlign: "center",
              }}
            >
              Powered by QuizGenie · Create high-quality quizzes instantly. <br />
              <span style={{ color: "#40916C" }}>🧞</span> Tip: After generating, copy or export for easy use in class or for student study.
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;