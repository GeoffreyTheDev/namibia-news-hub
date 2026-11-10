import { useState, useEffect, useRef } from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { FaRobot, FaTimes, FaPaperPlane, FaChevronLeft, FaChevronRight, FaPlayCircle, FaGlobe, FaMagic } from 'react-icons/fa';

const getTodayDate = () => {
  return new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' });
};

// NBC DIGITAL NEWS DATABASE
const nbcDatabase = [
  {
    id: 1,
    title: "LPM criticises government's economic management",
    date: getTodayDate(),
    videoId: "6ebkQmUL-dE", 
    image: "https://img.youtube.com/vi/6ebkQmUL-dE/hqdefault.jpg",
    summary: "Landless People's Movement (LPM) raises severe concerns regarding national economic policies.",
    fullText: "The Landless People's Movement has strongly criticized the government's handling of the national economy, pointing to rising living costs, unemployment, and allocation inefficiencies. Party leadership outlined alternative fiscal proposals during a national media briefing in Windhoek.",
    sourceLink: "https://www.youtube.com/@nbcdigitalnews"
  },
  {
    id: 2,
    title: "Parents urge faster construction of Augustinus Maashika hostel",
    date: getTodayDate(),
    videoId: "cIBjIRYdPTM",
    image: "https://img.youtube.com/vi/cIBjIRYdPTM/hqdefault.jpg",
    summary: "Community members call on regional authorities to expedite educational infrastructure development.",
    fullText: "Frustrated parents and school board members have stepped up calls for the speedy completion of the Augustinus Maashika hostel facilities. Delays have left numerous learners commuting long distances or staying in substandard makeshift shelters.",
    sourceLink: "https://www.youtube.com/@nbcdigitalnews"
  },
  {
    id: 3,
    title: "Opuwo scales up basic service delivery",
    date: getTodayDate(),
    videoId: "lVc6-cdZBGo",
    image: "https://img.youtube.com/vi/lVc6-cdZBGo/hqdefault.jpg",
    summary: "Town council initiates infrastructure upgrades to improve water and sanitation access.",
    fullText: "The Opuwo Town Council has launched a comprehensive initiative to scale up municipal service delivery across informal settlements, focusing specifically on clean water accessibility, waste management, and solar-powered lighting grids.",
    sourceLink: "https://www.youtube.com/@nbcdigitalnews"
  },
  {
    id: 4,
    title: "Nandi-Ndaitwah urges action on Africa's climate action goals",
    date: getTodayDate(),
    videoId: "WAbQ9TazRUU",
    image: "https://img.youtube.com/vi/WAbQ9TazRUU/hqdefault.jpg",
    summary: "Namibian leadership calls for robust international backing for sustainable green projects.",
    fullText: "At the continental climate dialogue, national leaders emphasized that African nations require immediate, unhindered access to climate adaptation funding to safeguard agricultural sectors against recurring droughts and environmental shifts.",
    sourceLink: "https://www.youtube.com/@nbcdigitalnews"
  },
  {
    id: 5,
    title: "Memorial service honours late former First Lady Pohamba",
    date: getTodayDate(),
    videoId: "cIBjIRYdPTM",
    image: "https://img.youtube.com/vi/cIBjIRYdPTM/hqdefault.jpg",
    summary: "Nation gathers in Windhoek to pay final respects and celebrate her enduring legacy.",
    fullText: "Dignitaries, family members, and citizens gathered at a solemn state memorial service to honor the life and humanitarian contributions of the late former First Lady, Mme Penehupifo Pohamba, remembering her dedication to maternal health and education.",
    sourceLink: "https://www.youtube.com/@nbcdigitalnews"
  },
  {
    id: 6,
    title: "Russia sounds alarm on Africa's 'debt abyss' risk",
    date: getTodayDate(),
    videoId: "6ebkQmUL-dE",
    image: "https://img.youtube.com/vi/6ebkQmUL-dE/hqdefault.jpg",
    summary: "International financial forum highlights sustainable loan structuring for developing nations.",
    fullText: "Global financial analysts meeting in regional forums have discussed structural debt adjustments across developing economies, warning against high-interest borrowing burdens that constrain infrastructure budgets.",
    sourceLink: "https://www.youtube.com/@nbcdigitalnews"
  },
  {
    id: 7,
    title: "Walvis Bay port records record container throughput in Q3",
    date: getTodayDate(),
    videoId: "lVc6-cdZBGo",
    image: "https://img.youtube.com/vi/lVc6-cdZBGo/hqdefault.jpg",
    summary: "Logistics corridors expand as SADC trade volume increases substantially.",
    fullText: "Namport has registered historic container movement figures, reinforcing Walvis Bay's strategic standing as the primary trade gateway linking landlocked Southern African Development Community markets to international shipping lanes.",
    sourceLink: "https://www.youtube.com/@nbcdigitalnews"
  },
  {
    id: 8,
    title: "Green Hydrogen project moves to environmental impact assessment phase",
    date: getTodayDate(),
    videoId: "WAbQ9TazRUU",
    image: "https://img.youtube.com/vi/WAbQ9TazRUU/hqdefault.jpg",
    summary: "Tsau ||Khaeb national park initiative opens public consultation meetings.",
    fullText: "The multi-billion euro green hydrogen venture has entered its formal environmental vetting stage, with local stakeholders participating in public hearings covering ecological preservation, job quotas, and regional development.",
    sourceLink: "https://www.youtube.com/@nbcdigitalnews"
  },
  {
    id: 9,
    title: "Brave Warriors announce squad for upcoming AFCON qualifiers",
    date: getTodayDate(),
    videoId: "6ebkQmUL-dE",
    image: "https://img.youtube.com/vi/6ebkQmUL-dE/hqdefault.jpg",
    summary: "Technical team reveals 23-man roster combining domestic league stars and international pros.",
    fullText: "The Namibia Football Association announced the national team squad scheduled to report for training camp ahead of crucial continental qualifiers, aiming for a strong showing on the international stage.",
    sourceLink: "https://www.youtube.com/@nbcdigitalnews"
  },
  {
    id: 10,
    title: "Bank of Namibia holds repo rate steady amid stable inflation trends",
    date: getTodayDate(),
    videoId: "cIBjIRYdPTM",
    image: "https://img.youtube.com/vi/cIBjIRYdPTM/hqdefault.jpg",
    summary: "Monetary policy committee maintains current interest rates to support economic stability.",
    fullText: "The central bank announced that interest rates will remain unchanged, citing moderate domestic price pressures and healthy foreign reserve buffers designed to protect commercial borrowers.",
    sourceLink: "https://www.youtube.com/@nbcdigitalnews"
  },
  {
    id: 11,
    title: "NUST and UNAM launch joint artificial intelligence research incubator",
    date: getTodayDate(),
    videoId: "lVc6-cdZBGo",
    image: "https://img.youtube.com/vi/lVc6-cdZBGo/hqdefault.jpg",
    summary: "Higher education institutions partner to foster homegrown technological solutions.",
    fullText: "In a landmark academic partnership, NUST and UNAM have inaugurated a shared AI laboratory focused on developing localized language models, agricultural tech automation, and smart security frameworks.",
    sourceLink: "https://www.youtube.com/@nbcdigitalnews"
  },
  {
    id: 12,
    title: "National Assembly debates new framework for digital privacy and cyber security",
    date: getTodayDate(),
    videoId: "WAbQ9TazRUU",
    image: "https://img.youtube.com/vi/WAbQ9TazRUU/hqdefault.jpg",
    summary: "Legislators review updated protocols to safeguard citizens and corporate data online.",
    fullText: "Parliament has commenced formal readings on the cyber security legislation package, setting compliance benchmarks for corporate data handlers and reinforcing legal safeguards against digital fraud.",
    sourceLink: "https://www.youtube.com/@nbcdigitalnews"
  }
];

export default function NewsFeed({ user }) {
  const [articles, setArticles] = useState(nbcDatabase);
  const [selectedArticle, setSelectedArticle] = useState(null);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);
  const totalPages = Math.ceil(articles.length / articlesPerPage);

  // AI Chat State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { role: 'ai', text: 'Hi Geoffrey! I am your NBC News AI. Ask me anything about today\'s video reports!' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  
  const modalMessagesEndRef = useRef(null);
  const floatingMessagesEndRef = useRef(null);

  useEffect(() => {
    modalMessagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    floatingMessagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isTyping, selectedArticle]);

  const handleLogout = () => {
    signOut(auth);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput.trim();
    setChatMessages(prev => [...prev, { role: 'user', text: userText }, { role: 'ai', text: '' }]);
    setChatInput('');
    setIsTyping(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) throw new Error("API Key is missing from Vercel.");

      const cleanApiKey = apiKey.trim();
      const newsContext = articles.map(a => `- ${a.title}: ${a.summary}`).join('\n');
      
      const conversationHistory = chatMessages.slice(1)
        .filter(msg => msg.text && !msg.text.includes("AI Error"))
        .map(msg => `${msg.role === 'user' ? 'User' : 'AI'}: ${msg.text}`)
        .join('\n\n');

      let systemPrompt = `You are a helpful NBC News AI assistant.\n\nTODAY'S NEWS:\n${newsContext}\n\n`;
      if (selectedArticle) {
        systemPrompt = `You are a helpful NBC News AI assistant. The user is currently watching this video report:\nTitle: ${selectedArticle.title}\nFull Text: ${selectedArticle.fullText}\n\nOTHER HEADLINES:\n${newsContext}\n\n`;
      }

      const finalPrompt = `${systemPrompt}CONVERSATION HISTORY:\n${conversationHistory}\n\nUser: ${userText}\nAI:`;

      const payload = {
        contents: [{ role: 'user', parts: [{ text: finalPrompt }] }]
      };

      // FIXED: Restored to v1beta which Google requires for gemini-1.5-flash
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:streamGenerateContent?alt=sse&key=${cleanApiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error?.message || "API Request Failed");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let aiText = "";

      setIsTyping(false);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const dataStr = line.replace('data: ', '').trim();
            if (!dataStr || dataStr === 'null') continue; 
            
            try {
              const parsed = JSON.parse(dataStr);
              const textPart = parsed.candidates?.[0]?.content?.parts?.[0]?.text || "";
              aiText += textPart;
              
              setChatMessages(prev => {
                const updated = [...prev];
                updated[updated.length - 1].text = aiText;
                return updated;
              });
            } catch (err) {}
          }
        }
      }
    } catch (error) {
      console.error("AI Error:", error);
      setChatMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1].text = `AI Error: ${error.message}`;
        return updated;
      });
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 relative text-gray-800 font-sans pb-24">
      <div className="absolute inset-0 bg-[radial-gradient(#93c5fd_1px,transparent_1px)] [background-size:20px_20px] opacity-30 pointer-events-none fixed"></div>

      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-40 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain drop-shadow-md rounded" onError={(e) => e.target.style.display='none'} />
            <h1 className="text-2xl font-extrabold text-blue-700 tracking-tight flex items-center gap-2">
              <FaGlobe className="text-blue-500" /> Namib News Hub <span className="text-xs bg-red-600 text-white px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">NBC News</span>
            </h1>
          </div>
          <div className="flex items-center gap-4 text-sm font-medium">
            <span className="hidden sm:inline text-gray-600">Welcome, {user?.displayName || "Geoffrey Sankandi"}</span>
            <button onClick={handleLogout} className="text-red-500 font-bold hover:text-red-700 transition-colors">
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Grid Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-black text-gray-800 tracking-tight">Today's Broadcast Bulletins</h2>
          <span className="text-xs font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full border border-red-200 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span> NBC Digital News Feed
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentArticles.map((article) => (
            <div 
              key={article.id} 
              className="group bg-white rounded-2xl shadow-sm border border-blue-100 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer flex flex-col"
              onClick={() => setSelectedArticle(article)}
            >
              <div className="h-52 overflow-hidden relative bg-gray-900">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover opacity-90 group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-125 transition-transform">
                    <FaPlayCircle size={24} />
                  </div>
                </div>
                <span className="absolute top-3 left-3 bg-black/70 text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider backdrop-blur-sm">
                  Video Report
                </span>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <p className="text-xs text-blue-600 font-bold mb-3 uppercase tracking-widest">{article.date}</p>
                <h3 className="text-lg font-bold text-gray-900 leading-snug mb-4 line-clamp-3 group-hover:text-blue-700 transition-colors">
                  {article.title}
                </h3>
                <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-red-600 font-bold text-sm group-hover:underline flex items-center gap-1.5">
                    <FaPlayCircle size={14}/> Watch & Explore Report
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-12 mb-8">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-3 rounded-full bg-white shadow-md text-blue-600 disabled:opacity-30 hover:bg-blue-50 transition-colors"
            >
              <FaChevronLeft />
            </button>
            <div className="flex gap-2">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`w-10 h-10 rounded-full font-bold shadow-sm transition-colors ${
                    currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-blue-50'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-3 rounded-full bg-white shadow-md text-blue-600 disabled:opacity-30 hover:bg-blue-50 transition-colors"
            >
              <FaChevronRight />
            </button>
          </div>
        )}
      </main>

      {/* SIDE-BY-SIDE VIDEO & AI MODAL */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-blue-900/80 backdrop-blur-md transition-opacity">
          <div className="bg-white rounded-2xl w-full max-w-7xl max-h-[95vh] overflow-hidden flex flex-col lg:flex-row shadow-2xl animate-fade-in relative">
            
            <button 
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 z-50 bg-black/70 hover:bg-red-500 text-white p-3 rounded-full transition-colors backdrop-blur-md lg:hidden"
            >
              <FaTimes size={18} />
            </button>

            {/* LEFT COLUMN: Video Player & Highlighted Text */}
            <div className="w-full lg:w-2/3 flex flex-col overflow-y-auto bg-gray-100 border-r border-gray-200">
              <div className="w-full aspect-video bg-black flex-shrink-0 sticky top-0 z-20 shadow-md">
                <iframe 
                  src={`https://www.youtube.com/embed/${selectedArticle.videoId}?autoplay=1`} 
                  title={selectedArticle.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              <div className="p-6 md:p-10 flex-grow bg-slate-50">
                 <div className="bg-white border-l-4 border-red-600 p-8 rounded-xl shadow-md relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                       <FaGlobe size={150} />
                    </div>
                    
                    <div className="flex items-center justify-between mb-4 relative z-10">
                      <p className="text-xs text-red-600 font-extrabold tracking-widest uppercase flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span> NBC Digital News
                      </p>
                      <span className="text-sm font-bold text-gray-400">{selectedArticle.date}</span>
                    </div>
                    
                    <h2 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight mb-6 relative z-10">
                      {selectedArticle.title}
                    </h2>
                    
                    <p className="whitespace-pre-wrap text-lg md:text-xl text-gray-700 leading-relaxed font-medium relative z-10">
                      {selectedArticle.fullText}
                    </p>
                 </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Dedicated Embedded AI Chat Sidebar */}
            <div className="w-full lg:w-1/3 flex flex-col h-[50vh] lg:h-auto bg-white">
              <div className="bg-gradient-to-r from-blue-700 to-blue-600 p-5 text-white flex justify-between items-center shadow-md z-10">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2.5 rounded-xl backdrop-blur-sm shadow-inner">
                    <FaRobot size={22} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg leading-tight flex items-center gap-1.5">
                      News AI <FaMagic size={12} className="text-yellow-300" />
                    </h3>
                    <p className="text-xs text-blue-100 font-medium">Ask about this video report</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedArticle(null)}
                  className="hidden lg:flex bg-blue-800/50 hover:bg-red-500 hover:scale-110 text-white p-2.5 rounded-full transition-all shadow-sm"
                >
                  <FaTimes size={16} />
                </button>
              </div>
              
              <div className="flex-1 p-5 overflow-y-auto bg-slate-50 flex flex-col gap-4">
                {chatMessages.map((msg, idx) => {
                  if (!msg.text) return null;
                  return (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] p-3.5 rounded-2xl text-sm shadow-sm leading-relaxed ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none whitespace-pre-wrap'}`}>
                        {msg.text}
                      </div>
                    </div>
                  );
                })}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white text-gray-400 border border-gray-200 p-4 rounded-2xl rounded-bl-none text-sm shadow-sm flex gap-1.5 items-center">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                )}
                <div ref={modalMessagesEndRef} />
              </div>
              
              <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-10">
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Type to ask AI about this news..."
                    className="flex-1 bg-slate-100 text-sm font-medium rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow border border-transparent focus:border-blue-300"
                  />
                  <button 
                    type="submit" 
                    disabled={isTyping || !chatInput.trim()}
                    className="bg-blue-600 text-white p-2 w-12 rounded-xl flex items-center justify-center hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-md hover:shadow-lg"
                  >
                    <FaPaperPlane size={16} />
                  </button>
                </div>
                <p className="text-center text-[10px] text-gray-400 mt-2 font-medium">Powered by Gemini AI</p>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Floating AI Chatbox (Hidden when Article Modal is Open) */}
      {!selectedArticle && (
        <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
          <div className={`bg-white rounded-2xl shadow-2xl border border-blue-100 overflow-hidden transition-all duration-300 transform origin-bottom-right mb-4 flex flex-col w-80 sm:w-96 ${isChatOpen ? 'scale-100 opacity-100 h-[28rem]' : 'scale-0 opacity-0 h-0'}`}>
            <div className="bg-blue-600 p-4 text-white flex justify-between items-center shadow-md">
              <div className="flex items-center gap-2">
                <FaRobot size={20} />
                <h3 className="font-bold">Ask the News AI</h3>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="hover:text-blue-200 transition-colors">
                <FaTimes />
              </button>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto bg-slate-50 flex flex-col gap-3">
              {chatMessages.map((msg, idx) => {
                if (!msg.text) return null;
                return (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-sm ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none whitespace-pre-wrap'}`}>
                      {msg.text}
                    </div>
                  </div>
                );
              })}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white text-gray-400 border border-gray-200 p-3 rounded-2xl rounded-bl-none text-sm shadow-sm flex gap-1 items-center">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              )}
              <div ref={floatingMessagesEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-gray-100 flex gap-2">
              <input 
                type="text" 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask about NBC reports..."
                className="flex-1 bg-slate-100 text-sm rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
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

          <div className={`flex items-center gap-4 transition-all duration-300 ${isChatOpen ? 'opacity-0 translate-y-10 pointer-events-none' : 'opacity-100 translate-y-0'}`}>
            <div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white px-5 py-3 rounded-full font-black shadow-2xl text-sm flex items-center gap-2 animate-bounce border-2 border-white cursor-pointer" onClick={() => setIsChatOpen(true)}>
              CLICK HERE FOR AI 
              <FaChevronRight size={12} />
            </div>
            <button 
              onClick={() => setIsChatOpen(!isChatOpen)}
              className="bg-gradient-to-br from-blue-600 to-blue-800 text-white p-5 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center border-4 border-white"
            >
              <FaRobot size={32} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}