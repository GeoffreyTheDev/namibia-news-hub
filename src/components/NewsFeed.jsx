import { useState, useEffect, useRef } from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { FaRobot, FaTimes, FaPaperPlane, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// Dynamic Date Generator for Daily Updates
const getTodayDate = () => {
  return new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' });
};

// 12 Robust Mock Articles with guaranteed-to-load images
const mockArticles = [
  {
    id: 1,
    title: "IPC regional chairperson Kaufmann steps down, warns party against internal division",
    date: getTodayDate(),
    image: "https://picsum.photos/seed/namibia1/800/500",
    summary: "A major political shift in the region as Kaufmann steps down.",
    fullText: "IPC regional chairperson Kaufmann has officially stepped down from his position today, issuing a strong warning to the party against the dangers of internal division. He emphasized that unity is the only path forward for the party's success in the upcoming national elections.\n\nSpeaking at a press conference in Windhoek, Kaufmann noted that ideological factions have recently threatened the core mission of the party. 'If we cannot stand united in our own halls, we cannot expect the Namibian people to trust us with the nation,' he stated. His resignation triggers a mandatory special election within the party over the next 30 days."
  },
  {
    id: 2,
    title: "Windhoek warns defaulters of court action over N$900m debt",
    date: getTodayDate(),
    image: "https://picsum.photos/seed/namibia2/800/500",
    summary: "The City of Windhoek is cracking down on unpaid debts.",
    fullText: "The City of Windhoek has issued a final warning to residents and businesses defaulting on municipal services. With outstanding debts reaching a staggering N$900 million, the municipality announced it will commence legal proceedings and utility disconnections starting next month to recover the funds.\n\nThe municipal spokesperson explained that this debt severely limits the city's ability to maintain public infrastructure, water sanitation, and emergency services. Debt relief programs and payment plans are available for vulnerable households, provided they apply before the deadline at the end of the month."
  },
  {
    id: 3,
    title: "Economic task force calls for urgent deal with SA to rescue FMD-hit farmers",
    date: getTodayDate(),
    image: "https://picsum.photos/seed/namibia3/800/500",
    summary: "Farmers are seeking immediate relief from the ongoing crisis.",
    fullText: "An urgent economic task force has appealed to the government to broker an immediate trade agreement with South Africa. Namibian livestock farmers, severely impacted by the recent Foot and Mouth Disease (FMD) outbreak, are facing critical financial losses and require immediate border export allowances.\n\nThe agricultural sector, a massive pillar of the Namibian economy, has seen exports drop by over 40% in the affected regions. The task force is proposing a specialized quarantine and testing corridor that would allow verified healthy livestock to cross the border, ensuring farmers can maintain their livelihoods while adhering to international biosafety standards."
  },
  {
    id: 4,
    title: "NamPower announces new 50MW Solar Plant in Erongo Region",
    date: getTodayDate(),
    image: "https://picsum.photos/seed/namibia4/800/500",
    summary: "Major step forward for Namibia's renewable energy sector.",
    fullText: "In a bid to reduce reliance on imported electricity, NamPower has broken ground on a new 50-megawatt solar facility in the Erongo region. The project, funded through a public-private partnership, is expected to create over 300 jobs during its construction phase.\n\nThe plant will feature state-of-the-art battery storage capabilities, ensuring a stable power supply to the coastal towns even during peak evening hours. Operations are scheduled to begin late next year."
  },
  {
    id: 5,
    title: "Swakopmund tourism sees record numbers for summer season",
    date: getTodayDate(),
    image: "https://picsum.photos/seed/namibia5/800/500",
    summary: "Coastal hospitality sector booms as international flights resume.",
    fullText: "Hotels and guesthouses in Swakopmund are reporting 95% occupancy rates for the upcoming summer holidays. The sudden influx is attributed to the launch of direct flights from European hubs to Walvis Bay airport.\n\nLocal restaurants and tour operators are expanding their working hours to accommodate the surge. The Mayor has urged residents to welcome visitors warmly, highlighting the massive economic boost this brings to the region."
  },
  {
    id: 6,
    title: "Etosha anti-poaching unit deploys new drone surveillance",
    date: getTodayDate(),
    image: "https://picsum.photos/seed/namibia6/800/500",
    summary: "High-tech solutions aim to protect endangered rhino populations.",
    fullText: "The Ministry of Environment, Forestry and Tourism has launched a fleet of specialized night-vision drones across Etosha National Park. These quiet, high-altitude units are designed to spot poachers miles before they can approach wildlife.\n\nCombined with rapid-response ground teams, the initiative hopes to drive poaching numbers down to zero this year. The drones were acquired through an international conservation grant."
  },
  {
    id: 7,
    title: "Walvis Bay port expansion attracts major international shipping lines",
    date: getTodayDate(),
    image: "https://picsum.photos/seed/namibia7/800/500",
    summary: "Namibia positions itself as the premier logistics hub for Southern Africa.",
    fullText: "Following the completion of the new container terminal, three major global shipping conglomerates have rerouted their primary African logistics hubs to Walvis Bay. The expansion has significantly reduced offloading times compared to neighboring ports.\n\nEconomists predict this will lower the cost of imported goods across Namibia over the next six months, while boosting export capabilities for local manufacturers."
  },
  {
    id: 8,
    title: "Local tech startup wins continental innovation award",
    date: getTodayDate(),
    image: "https://picsum.photos/seed/namibia8/800/500",
    summary: "Windhoek-based developers create revolutionary agritech app.",
    fullText: "A team of young developers from Windhoek has taken first place at the African Tech Summit with their new mobile application. The app uses AI to help remote farmers diagnose crop diseases simply by taking a picture with their smartphone.\n\nThe team has received a major seed funding round and plans to roll out the application nationwide next month, offering the service free to subsistence farmers."
  },
  {
    id: 9,
    title: "Fishrot trial faces yet another postponement",
    date: getTodayDate(),
    image: "https://picsum.photos/seed/namibia9/800/500",
    summary: "Legal delays continue in the nation's most high-profile corruption case.",
    fullText: "The High Court has granted a further postponement in the ongoing Fishrot corruption trial, citing the need for the defense to review newly submitted financial documents. The delay has sparked frustration among civil society groups demanding swift justice.\n\nThe judge issued a stern warning that no further delays will be entertained, setting a firm date for proceedings to resume next month."
  },
  {
    id: 10,
    title: "Namibian dollar stabilizes against major currencies",
    date: getTodayDate(),
    image: "https://picsum.photos/seed/namibia10/800/500",
    summary: "Central Bank policies show positive results in curbing inflation.",
    fullText: "After a volatile quarter, the Namibian Dollar has stabilized against the US Dollar and the Euro. The Bank of Namibia attributes this to a tightening of monetary policy and an unexpected surplus in mining export revenues.\n\nFinancial analysts believe this stability will prevent further interest rate hikes, providing much-needed relief to homeowners and small businesses."
  },
  {
    id: 11,
    title: "Rare meteor shower visible across the Namib Desert tonight",
    date: getTodayDate(),
    image: "https://picsum.photos/seed/namibia11/800/500",
    summary: "Astronomers urge citizens to look to the skies this evening.",
    fullText: "Namibia's famously clear, dark skies will provide the perfect backdrop for the spectacular Orionid meteor shower peaking tonight. Stargazers in the Namib Desert can expect to see up to 20 meteors per hour.\n\nAstrotourism lodges are fully booked, but locals are encouraged to simply drive a few kilometers outside city limits away from light pollution for a spectacular free show."
  },
  {
    id: 12,
    title: "National sports council announces massive grassroots funding",
    date: getTodayDate(),
    image: "https://picsum.photos/seed/namibia12/800/500",
    summary: "Millions allocated to develop youth sports facilities in rural areas.",
    fullText: "In an effort to discover the next generation of Olympic athletes, the National Sports Council has unveiled a N$50 million grant program. The funds will be strictly used to build sports fields and provide equipment to schools in rural communities.\n\nThe initiative also includes a coaching certification program to ensure young athletes receive proper, professional training from an early age."
  }
];

export default function NewsFeed({ user }) {
  const [selectedArticle, setSelectedArticle] = useState(null);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = mockArticles.slice(indexOfFirstArticle, indexOfLastArticle);
  const totalPages = Math.ceil(mockArticles.length / articlesPerPage);

  // AI Chat State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { role: 'ai', text: 'Hi Geoffrey! Ask me anything about today\'s Namibian news.' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

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
      if (!apiKey) throw new Error("API Key is missing. Vercel needs to be redeployed.");

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
      setChatMessages([...newMessages, { role: 'ai', text: `Error: ${error.message}` }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    // Professional blue/white dot pattern background
    <div className="min-h-screen bg-slate-50 relative text-gray-800 font-sans">
      <div className="absolute inset-0 bg-[radial-gradient(#93c5fd_1px,transparent_1px)] [background-size:20px_20px] opacity-30 pointer-events-none fixed"></div>

      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-40 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain drop-shadow-md rounded" onError={(e) => e.target.style.display='none'} />
            <h1 className="text-2xl font-extrabold text-blue-700 tracking-tight">Namib News Hub</h1>
          </div>
          <div className="flex items-center gap-4 text-sm font-medium">
            <span className="hidden sm:inline text-gray-600">Welcome, {user?.displayName || "Geoffrey Sankandi"}</span>
            <button onClick={handleLogout} className="text-red-500 font-bold hover:text-red-700 transition-colors">
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
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
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <p className="text-xs text-blue-600 font-bold mb-3 uppercase tracking-widest">{article.date}</p>
                <h2 className="text-lg font-bold text-gray-900 leading-snug mb-4 line-clamp-3 group-hover:text-blue-700 transition-colors">
                  {article.title}
                </h2>
                <div className="mt-auto pt-4 border-t border-gray-100">
                  <span className="text-blue-600 font-semibold text-sm group-hover:underline flex items-center gap-1">
                    Read Full Article <FaChevronRight size={10}/>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
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
                  currentPage === index + 1 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-600 hover:bg-blue-50'
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
      </main>

      {/* Article Reading Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-blue-900/60 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-fade-in relative">
            <button 
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-red-500 text-white p-3 rounded-full transition-colors backdrop-blur-md"
            >
              <FaTimes size={20} />
            </button>
            <div className="h-72 relative flex-shrink-0">
               <img src={selectedArticle.image} alt={selectedArticle.title} className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
               <h2 className="absolute bottom-6 left-8 right-8 text-2xl md:text-3xl font-extrabold text-white leading-tight drop-shadow-md">
                 {selectedArticle.title}
               </h2>
            </div>
            <div className="p-8 md:p-10 overflow-y-auto text-gray-700 leading-relaxed text-lg">
               <p className="text-sm text-blue-600 font-bold mb-6 tracking-widest uppercase">{selectedArticle.date}</p>
               <p className="whitespace-pre-wrap">{selectedArticle.fullText}</p>
            </div>
          </div>
        </div>
      )}

      {/* Floating AI Chatbox */}
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
            {chatMessages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-sm ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
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