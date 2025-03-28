import React, { useState } from "react";

const RecipientForm = () => {
  const [name, setName] = useState("");
  const [organNeeded, setOrganNeeded] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  const registerRecipient = async () => {
    if (!name || !organNeeded) {
      setMessage("Please fill out all fields.");
      return;
    }

    setIsLoading(true); // Start loading

    try {
      // Send data to your Python backend or any other server
      const response = await fetch("http://localhost:5000/api/registerRecipient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, organNeeded }),
      });

      const data = await response.json();
      if (data.error) {
        setMessage(data.error);
      } else {
        setMessage(`Recipient registered successfully! ID: ${data.recipientId}`);
        
        // Now register on the blockchain, if needed
        const agent = new HttpAgent();
        const actor = Actor.createActor(idlFactory, { agent, canisterId });
        await actor.registerRecipient(name, organNeeded);
      }

      // Clear input fields after submission
      setName("");
      setOrganNeeded("");
    } catch (error) {
      setMessage(`Error registering recipient: ${error.message}`);
      console.error(error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div>
      <h2>Register as a Recipient</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Organ Needed"
        value={organNeeded}
        onChange={(e) => setOrganNeeded(e.target.value)}
      />
      <button onClick={registerRecipient} disabled={isLoading}>
        {isLoading ? "Registering..." : "Register"}
      </button>
      <p>{message}</p>
    </div>
  );
};

export default RecipientForm;
