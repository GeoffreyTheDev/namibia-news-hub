import { GoogleGenAI } from '@google/genai';
import { useState } from 'react';

// Initialize Gemini (Ensure you restrict your API key in Google Cloud)
const ai = new GoogleGenAI({ apiKey: 'YOUR_GEMINI_API_KEY' });

export default function NewsAI({ currentHeadlines }) {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    setLoading(true);
    // Feed the day's headlines to the AI so it knows current events
    const context = `You are a helpful AI assistant on a Namibian news platform. 
    Here are today's top headlines: ${currentHeadlines.join(", ")}. 
    Answer the user's question based on these headlines and your general knowledge of Namibia.`;

    try {
      const result = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `${context}\n\nUser Question: ${query}`,
      });
      setResponse(result.text);
    } catch (error) {
      console.error(error);
      setResponse("I'm having trouble connecting right now.");
    }
    setLoading(false);
  };

  return (
    <div className="fixed bottom-5 right-5 w-80 p-4 bg-white border rounded-xl shadow-2xl">
      <h3 className="font-bold mb-2">Ask the News AI</h3>
      <div className="h-40 overflow-y-auto mb-2 text-sm text-gray-700">
        {response || "Ask me anything about today's news..."}
      </div>
      <input 
        type="text" 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full border p-2 rounded mb-2"
        placeholder="E.g., What happened in Windhoek today?"
      />
      <button onClick={askAI} className="w-full bg-blue-600 text-white p-2 rounded">
        {loading ? "Thinking..." : "Ask"}
      </button>
    </div>
  );
}