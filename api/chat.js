import Groq from "groq-sdk";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const apiKey = process.env.VITE_GROQ_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'Groq API key not configured on server' });
    }

    const groq = new Groq({ apiKey });
    const { prompt } = req.body;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful AI news assistant." },
        { role: "user", content: prompt }
      ],
      // THIS IS THE CRITICAL LINE:
      model: "llama-3.1-8b-instant", 
    });

    res.status(200).json({ reply: chatCompletion.choices[0]?.message?.content || "No response generated." });
  } catch (error) {
    console.error("Groq AI Error:", error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}