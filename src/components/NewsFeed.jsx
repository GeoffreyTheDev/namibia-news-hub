import { useState, useEffect, useRef } from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { FaRobot, FaTimes, FaPaperPlane, FaUserCircle } from 'react-icons/fa';

// Mock data updated with working image thumbnails and full article text with paragraphs
const mockArticles = [
  {
    id: 1,
    title: "IPC regional chairperson Kaufmann steps down, warns party against internal division",
    date: "Sun Nov 08 2026",
    image: "https://images.unsplash.com/photo-1541872511211-137bc0f828ce?auto=format&fit=crop&w=800&q=80",
    summary: "A major political shift in the region as Kaufmann steps down.",
    fullText: "IPC regional chairperson Kaufmann has officially stepped down from his position today, issuing a strong warning to the party against the dangers of internal division. He emphasized that unity is the only path forward for the party's success in the upcoming national elections.\n\nSpeaking at a press conference in Windhoek, Kaufmann noted that ideological factions have recently threatened the core mission of the party. 'If we cannot stand united in our own halls, we cannot expect the Namibian people to trust us with the nation,' he stated. His resignation triggers a mandatory special election within the party over the next 30 days."
  },
  {
    id: 2,
    title: "Windhoek warns defaulters of court action over N$900m debt",
    date: "Sun Nov 08 2026",
    image: "https://images.unsplash.com/photo-1577908906967-0e6203cf7316?auto=format&fit=crop&w=800&q=80",
    summary: "The City of Windhoek is cracking down on unpaid debts.",
    fullText: "The City of Windhoek has issued a final warning to residents and businesses defaulting on municipal services. With outstanding debts reaching a staggering N$900 million, the municipality announced it will commence legal proceedings and utility disconnections starting next month to recover the funds.\n\nThe municipal spokesperson explained that this debt severely limits the city's ability to maintain public infrastructure, water sanitation, and emergency services. Debt relief programs and payment plans are available for vulnerable households, provided they apply before the deadline at the end of the month."
  },
  {
    id: 3,
    title: "Economic task force calls for urgent deal with SA to rescue FMD-hit farmers",
    date: "Sun Nov 08 2026",
    image: "https://images.unsplash.com/photo-1599839619722-39751411ea63?auto=format&fit=crop&w=800&q=80",
    summary: "Farmers are seeking immediate relief from the ongoing crisis.",
    fullText: "An urgent economic task force has appealed to the government to broker an immediate trade agreement with South Africa. Namibian livestock farmers, severely impacted by the recent Foot and Mouth Disease (FMD) outbreak, are facing critical financial losses and require immediate border export allowances.\n\nThe agricultural sector, a massive pillar of the Namibian economy, has seen exports drop by over 40% in the affected regions. The task force is proposing a specialized quarantine and testing corridor that would allow verified healthy livestock to cross the border, ensuring farmers can maintain their livelihoods while adhering to international biosafety standards."
  }
];

export default function NewsFeed({ user }) {
  const [selectedArticle, setSelectedArticle] = useState(null);
  
  // AI Chat State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { role: 'ai', text: 'Hi Geoffrey! Ask me anything about today\'s Namibian news.' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleLogout = () => {
    signOut(auth);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newMessages = [...chatMessages, { role: 'user', text: chatInput }];
    setChatMessages(newMessages);
    setChatInput('');
    setIsTyping(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `You are a helpful AI news assistant for Namib News Hub. Keep answers concise. User asks: ${chatInput}` }] }]
        })
      });
      
      const data = await response.json();
      const aiReply = data.candidates[0].content.parts[0].text;
      setChatMessages([...newMessages, { role: 'ai', text: aiReply }]);
    } catch (error) {
      console.error("AI Error:", error);
      setChatMessages([...newMessages, { role: 'ai', text: "Sorry, I'm having trouble connecting to the network right now." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            {/* Logo goes here */}
            <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain drop-shadow-md rounded" onError={(e) => e.target.style.display='none'} />
            <h1 className="text-2xl font-extrabold text-blue-700 tracking-tight">Namib News Hub</h1>
          </div>
          <div className="flex items-center gap-4 text-sm font-medium">
            <span className="hidden sm:inline text-gray-600">Welcome, {user?.displayName || "Geoffrey Sankandi"}</span>
            <button onClick={handleLogout} className="text-red-500 hover:text-red-700 transition-colors">
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockArticles.map((article) => (
            <div 
              key={article.id} 
              className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col"
              onClick={() => setSelectedArticle(article)}
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <p className="text-xs text-blue-600 font-bold mb-2 uppercase tracking-wider">{article.date}</p>
                <h2 className="text-lg font-bold text-gray-900 leading-tight mb-3 line-clamp-3 group-hover:text-blue-700 transition-colors">
                  {article.title}
                </h2>
                <div className="mt-auto">
                  <span className="text-blue-600 font-semibold text-sm group-hover:underline">Read Full Article →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Article Reading Modal (In-App) */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-fade-in relative">
            <button 
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-red-500 text-white p-2 rounded-full transition-colors backdrop-blur-md"
            >
              <FaTimes size={18} />
            </button>
            <div className="h-64 relative flex-shrink-0">
               <img src={selectedArticle.image} alt={selectedArticle.title} className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
               <h2 className="absolute bottom-4 left-6 right-6 text-2xl md:text-3xl font-extrabold text-white leading-tight drop-shadow-md">
                 {selectedArticle.title}
               </h2>
            </div>
            <div className="p-6 md:p-8 overflow-y-auto text-gray-700 leading-relaxed text-lg">
               <p className="text-sm text-blue-600 font-bold mb-6">{selectedArticle.date}</p>
               {/* whitespace-pre-wrap ensures the \n\n paragraphs display correctly */}
               <p className="whitespace-pre-wrap">{selectedArticle.fullText}</p>
            </div>
          </div>
        </div>
      )}

      {/* Floating AI Chatbox */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
        {/* Chat Window */}
        <div className={`bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden transition-all duration-300 transform origin-bottom-right mb-4 flex flex-col w-80 sm:w-96 ${isChatOpen ? 'scale-100 opacity-100 h-[28rem]' : 'scale-0 opacity-0 h-0'}`}>
          <div className="bg-blue-600 p-4 text-white flex justify-between items-center shadow-md">
            <div className="flex items-center gap-2">
              <FaRobot size={20} />
              <h3 className="font-bold">Ask the News AI</h3>
            </div>
            <button onClick={() => setIsChatOpen(false)} className="hover:text-gray-200 transition-colors">
              <FaTimes />
            </button>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 flex flex-col gap-3">
            {chatMessages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-sm ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-400 border border-gray-100 p-3 rounded-2xl rounded-bl-none text-sm shadow-sm flex gap-1 items-center">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-gray-100 flex gap-2">
            <input 
              type="text" 
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask about today's news..."
              className="flex-1 bg-gray-100 text-sm rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
            />
            <button 
              type="submit" 
              disabled={isTyping || !chatInput.trim()}
              className="bg-blue-600 text-white p-2 w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              <FaPaperPlane size={14} />
            </button>
          </form>
        </div>

        {/* Toggle Button */}
        <button 
          onClick={() => setIsChatOpen(!isChatOpen)}
          className={`bg-blue-600 text-white p-4 rounded-full shadow-xl hover:bg-blue-700 hover:scale-110 transition-all duration-300 flex items-center justify-center ${isChatOpen ? 'hidden' : 'flex'}`}
        >
          <FaRobot size={24} />
        </button>
      </div>

    </div>
  );
}