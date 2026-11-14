
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://127.0.0.1:5173"
  ]
}));

app.use(express.json({ limit: "20kb" }));

if (!process.env.GEMINI_API_KEY) {
  console.error("GEMINI_API_KEY is missing in backend/.env");
  process.exit(1);
}

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

const portfolioContext = `
You are the AI portfolio assistant for Yuvarna V.

ABOUT YUV​​ARNA:
- B.Sc. Computer Science student.
- Full Stack Development Intern at Luisant Software Solutions.
- Skills: React.js, JavaScript, HTML, CSS, Node.js,
  Express.js, PostgreSQL, MongoDB and Prisma ORM.
- Interested in full-stack and web development.

PROJECTS:
1. Royal Jewels:
   Jewellery shop management website built using
   React.js, Node.js, Express.js and PostgreSQL.

2. Ever Smile Dental Clinic:
   Dental clinic website built with React.
   Includes clinic information, services and appointment pages.

3. MarketoCRM:
   Marketing and Campaign CRM built using React.js,
   Node.js, Express.js, Prisma and PostgreSQL.

4. Developer Portfolio:
   An animated portfolio using React, Three.js and GSAP.

INTERNSHIP:
Full Stack Development Intern at Luisant Software Solutions.


YOUR CONVERSATION STYLE:

- Speak like a friendly, confident female personal assistant.
- Use natural, everyday English.
- Sound warm, human and conversational, never robotic.
- Use simple sentences that are easy to understand.
- Give short answers, usually 2–4 sentences.
- Use contractions naturally, such as "I'm", "she's" and "I've".
- Avoid formal words and complicated technical explanations.
- Don't repeat Yuvarna's name unnecessarily.
- Don't start every answer with "Yuvarna".
- When explaining projects, describe them naturally.
- When recruiters ask questions, answer professionally but naturally.
- Never use Markdown formatting, asterisks, hashtags or bullet symbols.
- Never read formatting symbols aloud.
- Do not invent information or achievements.
- If information is unavailable, say so honestly.
- Make every answer sound like a real conversation.

`;

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Yuvarna Portfolio AI Backend is running!"
  });
});

app.post("/api/chat", async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please enter a message."
      });
    }

    if (message.length > 2000) {
      return res.status(400).json({
        success: false,
        message: "Message is too long."
      });
    }

    const safeHistory = Array.isArray(history)
      ? history.slice(-8).filter(
          item =>
            item &&
            ["user", "model"].includes(item.role) &&
            typeof item.text === "string"
        )
      : [];

    const conversation = safeHistory
      .map(item => `${item.role}: ${item.text.slice(0, 2000)}`)
      .join("\n");

    const prompt = `
${portfolioContext}

Previous conversation:
${conversation}

Visitor: ${message.trim()}

AI Assistant:
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: prompt,
      config: {
        temperature: 0.7,
        maxOutputTokens: 500
      }
    });

    const reply = response.text?.trim();

    if (!reply) {
      throw new Error("Gemini returned an empty response.");
    }

    res.json({
      success: true,
      reply
    });

  } catch (error) {
    console.error("Gemini API error:", error.message);

    res.status(500).json({
      success: false,
      message: "AI assistant is temporarily unavailable. Please try again."
    });
  }
});

app.listen(PORT, () => {
  console.log(`Portfolio backend running at http://localhost:${PORT}`);
});
