import React, { useState, useEffect } from "react";

function App() {
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:5000/match?recipient_id=101")
        .then(res => res.json())
        .then(data => setMatches(data));
    }, []);

    return (
        <div>
            <h1>PranSetu: Organ Donation Matching</h1>
            {matches.donor_id ? (
                <p>Matched Donor ID: {matches.donor_id}</p>
            ) : (
                <p>No Match Found</p>
            )}
        </div>
    );
}

export default App;
