import React, { useState } from "react";

const MatchOrgan = () => {
  const [organType, setOrganType] = useState("");
  const [matchResult, setMatchResult] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  const matchDonorRecipient = async () => {
    if (!organType) {
      setMatchResult("Please enter an organ type.");
      return;
    }

    setIsLoading(true); // Set loading to true
    try {
      const response = await fetch("http://localhost:5000/api/match", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ organNeeded: organType }),
      });

      const data = await response.json();

      if (data.error) {
        setMatchResult(data.error);
      } else {
        const matchesFormatted = data.map(
          (match) => `Donor: ${match.donor}, Recipient: ${match.recipient}`
        ).join("\n");

        setMatchResult(`Matches found for ${organType}:\n${matchesFormatted}`);
      }
    } catch (error) {
      setMatchResult(`Error finding match: ${error.message}`);
      console.error(error);
    } finally {
      setIsLoading(false); // Set loading to false
    }
  };

  return (
    <div>
      <h2>Find Organ Match</h2>
      <input
        type="text"
        placeholder="Enter Organ Type"
        value={organType}
        onChange={(e) => setOrganType(e.target.value)}
      />
      <button onClick={matchDonorRecipient} disabled={isLoading}>
        {isLoading ? "Finding match..." : "Find Match"}
      </button>
      <p style={{ whiteSpace: "pre-line" }}>{matchResult}</p>
    </div>
  );
};

export default MatchOrgan;
