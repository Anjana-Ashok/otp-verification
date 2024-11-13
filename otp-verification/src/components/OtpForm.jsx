import { useState } from "react";
import axios from "axios";

function OtpForm({ setStep }) {
  const [otp, setOtp] = useState("");

  const formStyle = {
    background: "#ffffff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    width: "300px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    border: "1px solid #ddd",
    borderRadius: "4px",
  };

  const buttonStyle = {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#4CAF50",
    color: "white",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  };

  return (
    <form style={formStyle} onSubmit={handleOtpSubmit}>
      <label>Enter OTP:</label>
      <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        required
        style={inputStyle}
      />
      <button type="submit" style={buttonStyle}>Submit</button>
    </form>
  );

  async function handleOtpSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/verify-otp", { otp });
      if (response.data.success) {
        setStep("welcome");
      } else {
        alert("Invalid OTP. Please try again.");
      }
    } catch (error) {
      alert("Error verifying OTP. Please try again.");
    }
  }
}

export default OtpForm;


