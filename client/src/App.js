import React, { useState } from "react";
import axios from "axios";

function App() {
    const [jobDescription, setJobDescription] = useState("");
    const [resume, setResume] = useState("");

    const generateResume = async () => {
        const response = await axios.post("http://localhost:5000/generate-resume", { jobDescription });
        setResume(response.data.resume);
    };

    return (
        <div>
            <h1>AI Resume Builder</h1>
            <textarea
                placeholder="Enter job description..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
            />
            <button onClick={generateResume}>Generate Resume</button>
            <pre>{resume}</pre>
        </div>
    );
}

export default App;
