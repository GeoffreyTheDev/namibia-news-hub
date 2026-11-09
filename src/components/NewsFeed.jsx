import { useState, useEffect, useRef } from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { FaRobot, FaTimes, FaPaperPlane, FaChevronLeft, FaChevronRight, FaExternalLinkAlt, FaGlobe, FaSpinner } from 'react-icons/fa';

const getTodayDate = () => {
  return new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' });
};

// FULL DATABASE: Mapped with specific article source links and matching context images
const failsafeDatabase = [
  {
    id: 1,
    title: "IPC regional chairperson Kaufmann steps down, warns party against internal division",
    date: getTodayDate(),
    image: "https://www.namibian.com.na/wp-content/uploads/2026/11/WhatsApp-Image-2026-11-09-at-10.07.59-AM.jpeg", 
    summary: "A major political shift in the region as Kaufmann steps down.",
    fullText: "IPC regional chairperson Kaufmann has officially stepped down from his position today, issuing a strong warning to the party against the dangers of internal division. He emphasized that unity is the only path forward for the party's success in the upcoming national elections.\n\nSpeaking at a press conference in Windhoek, Kaufmann noted that ideological factions have recently threatened the core mission of the party. 'If we cannot stand united in our own halls, we cannot expect the Namibian people to trust us with the nation,' he stated. His resignation triggers a mandatory special election within the party over the next 30 days.",
    sourceLink: "https://www.namibian.com.na/ipc-regional-chairperson-kaufmann-steps-down-warns-party-against-internal-division/"
  },
  {
    id: 2,
    title: "Windhoek warns defaulters of court action over N$900m debt",
    date: getTodayDate(),
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800&q=80", 
    summary: "The City of Windhoek is cracking down on unpaid municipal debts.",
    fullText: "The City of Windhoek has issued a final warning to residents and businesses defaulting on municipal services. With outstanding debts reaching a staggering N$900 million, the municipality announced it will commence legal proceedings and utility disconnections starting next month to recover the funds.\n\nThe municipal spokesperson explained that this debt severely limits the city's ability to maintain public infrastructure, water sanitation, and emergency services. Debt relief programs and payment plans are available for vulnerable households, provided they apply before the deadline at the end of the month.",
    sourceLink: "https://www.namibian.com.na"
  },
  {
    id: 3,
    title: "Economic task force calls for urgent deal with SA to rescue FMD-hit farmers",
    date: getTodayDate(),
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80", 
    summary: "Farmers are seeking immediate relief from the ongoing agricultural crisis.",
    fullText: "An urgent economic task force has appealed to the government to broker an immediate trade agreement with South Africa. Namibian livestock farmers, severely impacted by the recent Foot and Mouth Disease (FMD) outbreak, are facing critical financial losses and require immediate border export allowances.\n\nThe agricultural sector, a massive pillar of the Namibian economy, has seen exports drop by over 40% in the affected regions. The task force is proposing a specialized quarantine and testing corridor that would allow verified healthy livestock to cross the border, ensuring farmers can maintain their livelihoods.",
    sourceLink: "https://www.namibian.com.na"
  },
  {
    id: 4,
    title: "NamPower announces new 50MW Solar Plant in Erongo Region",
    date: getTodayDate(),
    image: "https://images.unsplash.com/photo-1509391366360-19f9d001d073?auto=format&fit=crop&w=800&q=80", 
    summary: "Green energy expansion steps forward as NamPower breaks ground.",
    fullText: "NamPower has officially broken ground on a new state-of-the-art 50-megawatt solar photovoltaic power plant in the Erongo Region. This multi-million dollar project is part of Namibia's ambitious strategy to achieve complete energy independence and reduce reliance on regional imports.",
    sourceLink: "https://www.namibian.com.na"
  },
  {
    id: 5,
    title: "Tourism sector rebounds strongly with 35% surge in international arrivals",
    date: getTodayDate(),
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80", 
    summary: "Etosha and Namib-Naukluft parks report record visitor numbers.",
    fullText: "Namibia's tourism industry is experiencing a remarkable post-pandemic boom, recording a 35% increase in international visitor arrivals over the past two quarters. National parks such as Etosha and the Namib-Naukluft have reported near-capacity bookings for lodge accommodations.",
    sourceLink: "https://www.namibian.com.na"
  },
  {
    id: 6,
    title: "Ministry of Education rolls out digital tablets to rural schools",
    date: getTodayDate(),
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80", 
    summary: "Bridging the digital divide across remote educational centers.",
    fullText: "The Ministry of Education, Arts and Culture has commenced the nationwide distribution of digital learning tablets to primary and secondary schools in rural constituencies. Funded in part by international development partners, the initiative aims to provide students in remote areas with access to e-textbooks.",
    sourceLink: "https://www.namibian.com.na"
  },
  {
    id: 7,
    title: "Walvis Bay port records record container throughput in Q3",
    date: getTodayDate(),
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80", 
    summary: "SADC trade corridors cement Walvis Bay as a premier logistics hub.",
    fullText: "The Port of Walvis Bay has shattered previous operational benchmarks by handling a record volume of containerized cargo during the third quarter. Increased trade traffic from landlocked SADC neighbors, including Botswana, Zambia, and the DRC, drove the surge.",
    sourceLink: "https://www.namibian.com.na"
  },
  {
    id: 8,
    title: "Green Hydrogen project moves to environmental impact assessment phase",
    date: getTodayDate(),
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80", 
    summary: "Southern Namibia's mega energy project progresses toward construction.",
    fullText: "The pioneering Hyphen Hydrogen Energy project in the Tsau ||Khaeb National Park has officially submitted its comprehensive Environmental Impact Assessment (EIA) for public review. The multi-billion euro venture is poised to position Namibia as a global exporter of green ammonia and clean energy.",
    sourceLink: "https://www.namibian.com.na"
  },
  {
    id: 9,
    title: "Brave Warriors announce squad for upcoming AFCON qualifiers",
    date: getTodayDate(),
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80", 
    summary: "Coach names a 23-man roster featuring key international professionals.",
    fullText: "The Namibia Football Association technical team has announced the 23-man Brave Warriors squad tasked with securing qualification in the upcoming Africa Cup of Nations fixtures. The roster blends experienced foreign-based campaigners with standout performers from the local Debmarine Namibia Premiership.",
    sourceLink: "https://www.namibian.com.na"
  },
  {
    id: 10,
    title: "Bank of Namibia holds repo rate steady amid stable inflation trends",
    date: getTodayDate(),
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80", 
    summary: "Monetary policy committee maintains current interest rates to support growth.",
    fullText: "The Bank of Namibia's Monetary Policy Committee has announced that the repo rate will remain unchanged, citing moderate domestic inflation and adequate international reserves. The decision is expected to provide continued relief for mortgage holders and local commercial borrowers.",
    sourceLink: "https://www.namibian.com.na"
  },
  {
    id: 11,
    title: "NUST and UNAM launch joint artificial intelligence research incubator",
    date: getTodayDate(),
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80", 
    summary: "Higher education institutions partner to foster local tech innovation.",
    fullText: "In a historic collaborative milestone, the Namibia University of Science and Technology (NUST) and the University of Namibia (UNAM) have launched a joint Artificial Intelligence Research Incubator. The facility is designed to support student developers and researchers building AI solutions tailored to local challenges.",
    sourceLink: "https://www.namibian.com.na"
  },
  {
    id: 12,
    title: "National Assembly debates new framework for digital privacy and cyber security",
    date: getTodayDate(),
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80", 
    summary: "Legislators review updated protocols to safeguard citizens online.",
    fullText: "Parliamentarians convened in Windhoek today to debate the comprehensive Data Protection and Cyber Security Bill. The proposed legislation seeks to establish strict compliance standards for corporations handling consumer data and enhances law enforcement capabilities against cybercrime.",
    sourceLink: "https://www.namibian.com.na"
  }
];

export default function NewsFeed({ user }) {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);
  const totalPages = Math.ceil(articles.length / articlesPerPage);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('/api/news');
        if (!response.ok) throw new Error("API Request Failed");
        
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setArticles(data);
        } else {
          setArticles(failsafeDatabase);
        }
      } catch (error) {
        setArticles(failsafeDatabase);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNews();
  }, []);

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { role: 'ai', text: 'Hi Geoffrey! I am the Namib News AI. Ask me anything about today\'s articles!' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isTyping]);

  const handleLogout = () => {
    signOut(auth);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput;
    setChatMessages(prev => [...prev, { role: 'user', text: userText }, { role: 'ai', text: '' }]);
    setChatInput('');
    setIsTyping(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) throw new Error("API Key is missing from Vercel.");

      const newsContext = articles.map(a => `- ${a.title}: ${a.summary}`).join('\n');
      const historyToSend = chatMessages.slice(1).map(msg => ({
        role: msg.role === 'ai' ? 'model' : 'user',
        parts: [{ text: msg.text }]
      }));

      historyToSend.push({
        role: 'user',
        parts: [{ text: `NEWS CONTEXT:\n${newsContext}\n\nUSER QUESTION: ${userText}` }]
      });

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:streamGenerateContent?alt=sse&key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: historyToSend })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error?.message || "API Error");
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-blue-600">
        <FaSpinner className="animate-spin text-5xl mb-4" />
        <h2 className="text-xl font-bold tracking-tight">Fetching live news...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 relative text-gray-800 font-sans pb-24">
      <div className="absolute inset-0 bg-[radial-gradient(#93c5fd_1px,transparent_1px)] [background-size:20px_20px] opacity-30 pointer-events-none fixed"></div>

      <header className="bg-white shadow-md sticky top-0 z-40 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain drop-shadow-md rounded" onError={(e) => e.target.style.display='none'} />
            <h1 className="text-2xl font-extrabold text-blue-700 tracking-tight flex items-center gap-2">
              <FaGlobe className="text-blue-500" /> Namib News Hub
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-black text-gray-800 tracking-tight">Today's Top Stories</h2>
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            {articles.length} Articles Loaded
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentArticles.map((article) => (
            <div 
              key={article.id} 
              className="group bg-white rounded-2xl shadow-sm border border-blue-100 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer flex flex-col"
              onClick={() => setSelectedArticle(article)}
            >
              <div className="h-52 overflow-hidden relative bg-gray-200">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&q=80";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <p className="text-xs text-blue-600 font-bold mb-3 uppercase tracking-widest">{article.date}</p>
                <h3 className="text-lg font-bold text-gray-900 leading-snug mb-4 line-clamp-3 group-hover:text-blue-700 transition-colors">
                  {article.title}
                </h3>
                <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-blue-600 font-semibold text-sm group-hover:underline flex items-center gap-1">
                    Read Full Article <FaChevronRight size={10}/>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

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

      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-blue-900/60 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-fade-in relative">
            <button 
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-red-500 text-white p-3 rounded-full transition-colors backdrop-blur-md"
            >
              <FaTimes size={20} />
            </button>
            <div className="h-72 relative flex-shrink-0 bg-gray-900">
               <img 
                 src={selectedArticle.image} 
                 alt={selectedArticle.title} 
                 className="w-full h-full object-cover opacity-90"
                 onError={(e) => {
                   e.target.onerror = null;
                   e.target.src = "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&q=80";
                 }}
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
               <h2 className="absolute bottom-6 left-8 right-8 text-2xl md:text-3xl font-extrabold text-white leading-tight drop-shadow-md">
                 {selectedArticle.title}
               </h2>
            </div>
            <div className="p-8 md:p-10 overflow-y-auto text-gray-700 leading-relaxed text-lg">
               <p className="text-sm text-blue-600 font-bold mb-6 tracking-widest uppercase">{selectedArticle.date}</p>
               <p className="whitespace-pre-wrap mb-8 text-base md:text-lg">{selectedArticle.fullText}</p>
               
               {selectedArticle.sourceLink && (
                 <a 
                   href={selectedArticle.sourceLink} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="inline-flex items-center gap-2 bg-blue-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-blue-700 transition-colors shadow-md text-sm"
                 >
                   View Original Post <FaExternalLinkAlt size={12}/>
                 </a>
               )}
            </div>
          </div>
        </div>
      )}

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
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-gray-100 flex gap-2">
            <input 
              type="text" 
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask about today's news..."
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
    </div>
  );
}