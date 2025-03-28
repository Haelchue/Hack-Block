import React from "react";
import DonorForm from "./components/DonorForm";
import RecipientForm from "./components/RecipientForm";
import MatchOrgan from "./components/MatchOrgan";

function App() {
  return (
    <div>
      <h1>Organ Donation System</h1>
      <DonorForm />
      <RecipientForm />
      <MatchOrgan />
    </div>
  );
}

export default App;
