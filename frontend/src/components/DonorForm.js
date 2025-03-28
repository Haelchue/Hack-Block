import React, { useState } from "react";
import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory, canisterId } from "../../declarations/organ_donation";

const DonorForm = () => {
    const [name, setName] = useState("");
    const [organ, setOrgan] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false); // Add loading state

    const registerDonor = async () => {
        if (!name || !organ) {
            setMessage("Please fill out all fields.");
            return;
        }

        setIsLoading(true); // Set loading to true
        try {
            const agent = new HttpAgent({ host: "http://127.0.0.1:8000" }); // Configure for local replica if needed
            const actor = Actor.createActor(idlFactory, { agent, canisterId });

            const donorId = await actor.registerDonor(name, organ);
            setMessage(`Donor registered successfully! ID: ${donorId}`);
            setName("");
            setOrgan("");
        } catch (error) {
            setMessage(`Error registering donor: ${error.message}`);
            console.error(error);
        } finally {
            setIsLoading(false); // Set loading to false
        }
    };

    return (
        <div>
            <h2>Register as a Donor</h2>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Organ"
                value={organ}
                onChange={(e) => setOrgan(e.target.value)}
            />
            <button onClick={registerDonor} disabled={isLoading}>
                {isLoading ? "Registering..." : "Register"}
            </button>
            <p>{message}</p>
        </div>
    );
};

export default DonorForm;