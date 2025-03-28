import React, { useState } from "react";

function RegisterDonor() {
    const [name, setName] = useState("");
    const [bloodType, setBloodType] = useState("");
    const [organ, setOrgan] = useState("");

    const registerDonor = async () => {
        console.log("Donor Registered:", { name, bloodType, organ });
    };

    return (
        <div>
            <h2>Register as a Donor</h2>
            <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder="Blood Type" onChange={(e) => setBloodType(e.target.value)} />
            <input type="text" placeholder="Organ" onChange={(e) => setOrgan(e.target.value)} />
            <button onClick={registerDonor}>Submit</button>
        </div>
    );
}
export default RegisterDonor;