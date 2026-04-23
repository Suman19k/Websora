import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// 🔑 OpenAI setup
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 💬 Chat endpoint
app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
You are Websora AI Assistant.

About Websora:
- A software and web development company
- Services: Web development, UI/UX design, data analytics, custom software
- Tone: Professional, friendly, slightly sales-focused
- Goal: Convert visitors into clients

Rules:
- Keep answers short and clear
- Suggest services when relevant
- If user asks pricing → say “contact us for quote”
- If user is interested → ask for name/email
          `,
        },
        { role: "user", content: userMessage },
      ],
    });

    res.json({
      reply: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ reply: "Something went wrong" });
  }
});

// 🚀 Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});