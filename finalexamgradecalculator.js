import React, { useState } from "react";
import ReactDOM from "react-dom";

// Card Component (No need for external imports)
const Card = ({ title, children }) => {
  return (
    <div style={{
      border: "1px solid #ddd",
      borderRadius: "10px",
      padding: "20px",
      maxWidth: "400px",
      margin: "20px auto",
      boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
      backgroundColor: "#fff"
    }}>
      <h2 style={{ textAlign: "center", marginBottom: "10px" }}>{title}</h2>
      {children}
    </div>
  );
};

// Final Exam Grade Calculator Component
const FinalExamGradeCalculator = () => {
  const [currentGrade, setCurrentGrade] = useState("");
  const [desiredGrade, setDesiredGrade] = useState("");
  const [finalExamWeight, setFinalExamWeight] = useState("");
  const [finalExamGradeNeeded, setFinalExamGradeNeeded] = useState(null);
  const [letterGrade, setLetterGrade] = useState("");

  // Convert percentage to letter grade
  const getLetterGrade = (percentage) => {
    if (percentage >= 90) return "A+";
    if (percentage >= 80) return "A";
    if (percentage >= 70) return "B";
    if (percentage >= 60) return "C";
    if (percentage >= 50) return "D";
    return "F";
  };

  // Calculate Final Exam Grade Needed
  const calculateFinalExamGrade = () => {
    const currentGradeNum = Number(currentGrade);
    const desiredGradeNum = Number(desiredGrade);
    const finalExamWeightNum = Number(finalExamWeight);

    if (finalExamWeightNum <= 0 || finalExamWeightNum > 100) {
      alert("Final exam weight must be between 1 and 100");
      return;
    }

    const requiredFinalExamGrade = (
      (desiredGradeNum - (currentGradeNum * (100 - finalExamWeightNum) / 100)) /
      (finalExamWeightNum / 100)
    ).toFixed(2);

    setFinalExamGradeNeeded(requiredFinalExamGrade);
    setLetterGrade(getLetterGrade(Number(requiredFinalExamGrade)));
  };

  return (
    <Card title="Final Exam Grade Calculator">
      <input
        type="number"
        placeholder="Current Grade (%)"
        value={currentGrade}
        onChange={(e) => setCurrentGrade(e.target.value)}
        style={{ display: "block", width: "100%", padding: "10px", marginBottom: "10px" }}
      />
      <input
        type="number"
        placeholder="Desired Grade (%)"
        value={desiredGrade}
        onChange={(e) => setDesiredGrade(e.target.value)}
        style={{ display: "block", width: "100%", padding: "10px", marginBottom: "10px" }}
      />
      <input
        type="number"
        placeholder="Final Exam Weight (%)"
        value={finalExamWeight}
        onChange={(e) => setFinalExamWeight(e.target.value)}
        style={{ display: "block", width: "100%", padding: "10px", marginBottom: "10px" }}
      />
      <button
        onClick={calculateFinalExamGrade}
        style={{
          backgroundColor: "blue",
          color: "white",
          padding: "10px",
          width: "100%",
          border: "none",
          cursor: "pointer"
        }}
      >
        Calculate
      </button>
      {finalExamGradeNeeded !== null && (
        <div style={{
          marginTop: "10px",
          padding: "10px",
          backgroundColor: "#f8f8f8",
          borderRadius: "5px",
          textAlign: "center"
        }}>
          <p><strong>Final Exam Grade Needed:</strong> {finalExamGradeNeeded}%</p>
          <p><strong>Letter Grade:</strong> {letterGrade}</p>
        </div>
      )}
    </Card>
  );
};

// Render the component in React
ReactDOM.render(<FinalExamGradeCalculator />, document.getElementById("root"));
