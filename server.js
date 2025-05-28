require("dotenv").config(); // Load environment variables first

const OpenAI = require("openai");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/generate-resume", async (req, res) => {
    try {
        const { jobDescription } = req.body;
        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [{ role: "user", content: `Generate an ATS-friendly resume for: ${jobDescription}` }],
        });
        res.json({ resume: response.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.get("/", (req, res) => {
    res.send("Welcome to AI Resume Builder!");
});

app.listen(5000, () => console.log("Server running on port 5000"));

console.log("API Key:", process.env.OPENAI_API_KEY); // Debugging check
