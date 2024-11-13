import { useState } from "react";
import EmailForm from "./components/EmailForm";
import OtpForm from "./components/OtpForm";
import WelcomePage from "./components/WelcomePage";

function App() {
  const [step, setStep] = useState("email");

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100vw", // Ensure full viewport width
    backgroundColor: "#f4f4f4",
    margin: "0", // Remove any default margin
    padding: "0", // Remove any default padding
  };

  return (
    <div style={containerStyle}>
      {step === "email" && <EmailForm setStep={setStep} />}
      {step === "otp" && <OtpForm setStep={setStep} />}
      {step === "welcome" && <WelcomePage />}
    </div>
  );
}

export default App;
