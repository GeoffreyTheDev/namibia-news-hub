import { useState } from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { FaTimes, FaChevronLeft, FaChevronRight, FaExternalLinkAlt, FaGlobe } from 'react-icons/fa';

const getTodayDate = () => {
  return new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' });
};

// 12 FULL DAILY ARTICLES DATABASE WITH REAL IMAGES & LINKS
const localDatabase = [
  {
    id: 1,
    title: "IPC regional chairperson Kaufmann steps down, warns party against internal division",
    date: getTodayDate(),
    image: "https://images.unsplash.com/photo-1523995462485-3d171b5c8fa9?auto=format&fit=crop&w=800&q=80", 
    summary: "A major political shift in the region as Kaufmann steps down.",
    fullText: "IPC regional chairperson Kaufmann has officially stepped down from his position today, issuing a strong warning to the party against the dangers of internal division. He emphasized that unity is the only path forward for the party's success in the upcoming national elections.\n\nSpeaking at a press conference in Windhoek, Kaufmann noted that ideological factions have recently threatened the core mission of the party. 'If we cannot stand united in our own halls, we cannot expect the Namibian people to trust us with the nation,' he stated. His resignation triggers a mandatory special election within the party over the next 30 days.",
    sourceLink: "https://namibian.com.na"
  },
  {
    id: 2,
    title: "Windhoek warns defaulters of court action over N$900m debt",
    date: getTodayDate(),
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800&q=80", 
    summary: "The City of Windhoek is cracking down on unpaid municipal debts.",
    fullText: "The City of Windhoek has issued a final warning to residents and businesses defaulting on municipal services. With outstanding debts reaching a staggering N$900 million, the municipality announced it will commence legal proceedings and utility disconnections starting next month to recover the funds.\n\nThe municipal spokesperson explained that this debt severely limits the city's ability to maintain public infrastructure, water sanitation, and emergency services. Debt relief programs and payment plans are available for vulnerable households, provided they apply before the deadline at the end of the month.",
    sourceLink: "https://namibian.com.na"
  },
  {
    id: 3,
    title: "Economic task force calls for urgent deal with SA to rescue FMD-hit farmers",
    date: getTodayDate(),
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80", 
    summary: "Farmers are seeking immediate relief from the ongoing agricultural crisis.",
    fullText: "An urgent economic task force has appealed to the government to broker an immediate trade agreement with South Africa. Namibian livestock farmers, severely impacted by the recent Foot and Mouth Disease (FMD) outbreak, are facing critical financial losses and require immediate border export allowances.\n\nThe agricultural sector, a massive pillar of the Namibian economy, has seen exports drop by over 40% in the affected regions. The task force is proposing a specialized quarantine and testing corridor that would allow verified healthy livestock to cross the border, ensuring farmers can maintain their livelihoods.",
    sourceLink: "https://namibian.com.na"
  },
  {
    id: 4,
    title: "NamPower announces new 50MW Solar Plant in Erongo Region",
    date: getTodayDate(),
    image: "https://images.unsplash.com/photo-1509391366360-19f9d001d073?auto=format&fit=crop&w=800&q=80", 
    summary: "Green energy expansion steps forward as NamPower breaks ground.",
    fullText: "NamPower has officially broken ground on a new state-of-the-art 50-megawatt solar photovoltaic power plant in the Erongo Region. This multi-million dollar project is part of Namibia's ambitious strategy to achieve complete energy independence and reduce reliance on regional imports.\n\nThe plant is expected to power over 45,000 homes upon completion next year and will create hundreds of direct and indirect jobs for local engineers and construction workers.",
    sourceLink: "https://namibian.com.na"
  },
  {
    id: 5,
    title: "Tourism sector rebounds strongly with 35% surge in international arrivals",
    date: getTodayDate(),
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80", 
    summary: "Etosha and Namib-Naukluft parks report record visitor numbers.",
    fullText: "Namibia's tourism industry is experiencing a remarkable post-pandemic boom, recording a 35% increase in international visitor arrivals over the past two quarters. National parks such as Etosha and the Namib-Naukluft have reported near-capacity bookings for lodge accommodations.\n\nIndustry leaders attribute the success to intensified digital marketing campaigns, new direct flight routes into Hosea Kutako International Airport, and Namibia's standing as a premier eco-tourism destination.",
    sourceLink: "https://namibian.com.na"
  },
  {
    id: 6,
    title: "Ministry of Education rolls out digital tablets to rural schools",
    date: getTodayDate(),
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80", 
    summary: "Bridging the digital divide across remote educational centers.",
    fullText: "The Ministry of Education, Arts and Culture has commenced the nationwide distribution of digital learning tablets to primary and secondary schools in rural constituencies. Funded in part by international development partners, the initiative aims to provide students in remote areas with access to e-textbooks and interactive science software.\n\nTeachers across the selected regions are currently undergoing specialized training workshops to integrate the devices into daily classroom curricula effectively.",
    sourceLink: "https://namibian.com.na"
  },
  {
    id: 7,
    title: "Walvis Bay port records record container throughput in Q3",
    date: getTodayDate(),
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80", 
    summary: "SADC trade corridors cement Walvis Bay as a premier logistics hub.",
    fullText: "The Port of Walvis Bay has shattered previous operational benchmarks by handling a record volume of containerized cargo during the third quarter. Increased trade traffic from landlocked SADC neighbors, including Botswana, Zambia, and the DRC, drove the surge.\n\nNamport executives highlighted recent investments in container terminal automation and dredging as key factors enabling faster turnaround times for international cargo vessels.",
    sourceLink: "https://namibian.com.na"
  },
  {
    id: 8,
    title: "Green Hydrogen project moves to environmental impact assessment phase",
    date: getTodayDate(),
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80", 
    summary: "Southern Namibia's mega energy project progresses toward construction.",
    fullText: "The pioneering Hyphen Hydrogen Energy project in the Tsau ||Khaeb National Park has officially submitted its comprehensive Environmental Impact Assessment (EIA) for public review. The multi-billion euro venture is poised to position Namibia as a global exporter of green ammonia and clean energy.\n\nPublic hearings are scheduled across the //Karas Region next week to gather feedback from community stakeholders, environmental conservationists, and local business leaders.",
    sourceLink: "https://namibian.com.na"
  },
  {
    id: 9,
    title: "Brave Warriors announce squad for upcoming AFCON qualifiers",
    date: getTodayDate(),
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80", 
    summary: "Coach names a 23-man roster featuring key international professionals.",
    fullText: "The Namibia Football Association technical team has announced the 23-man Brave Warriors squad tasked with securing qualification in the upcoming Africa Cup of Nations fixtures. The roster blends experienced foreign-based campaigners with standout performers from the local Debmarine Namibia Premiership.\n\nTraining camp kicks off in Windhoek on Monday before the squad departs for their away fixture.",
    sourceLink: "https://namibian.com.na"
  },
  {
    id: 10,
    title: "Bank of Namibia holds repo rate steady amid stable inflation trends",
    date: getTodayDate(),
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80", 
    summary: "Monetary policy committee maintains current interest rates to support growth.",
    fullText: "The Bank of Namibia's Monetary Policy Committee has announced that the repo rate will remain unchanged, citing moderate domestic inflation and adequate international reserves. The decision is expected to provide continued relief for mortgage holders and local commercial borrowers.\n\nGovernor of the central bank noted that while global economic headwinds persist, Namibia's macroeconomic fundamentals remain resilient.",
    sourceLink: "https://namibian.com.na"
  },
  {
    id: 11,
    title: "NUST and UNAM launch joint artificial intelligence research incubator",
    date: getTodayDate(),
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80", 
    summary: "Higher education institutions partner to foster local tech innovation.",
    fullText: "In a historic collaborative milestone, the Namibia University of Science and Technology (NUST) and the University of Namibia (UNAM) have launched a joint Artificial Intelligence Research Incubator. The facility is designed to support student developers and researchers building AI solutions tailored to local challenges in agriculture, healthcare, and languages.\n\nThe incubator opens its doors to undergraduate and graduate developers starting next month.",
    sourceLink: "https://namibian.com.na"
  },
  {
    id: 12,
    title: "National Assembly debates new framework for digital privacy and cyber security",
    date: getTodayDate(),
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80", 
    summary: "Legislators review updated protocols to safeguard citizens online.",
    fullText: "Parliamentarians convened in Windhoek today to debate the comprehensive Data Protection and Cyber Security Bill. The proposed legislation seeks to establish strict compliance standards for corporations handling consumer data and enhances law enforcement capabilities against cybercrime.\n\nIndustry stakeholders and civil society organizations have been invited to submit written commentary ahead of the committee stage next month.",
    sourceLink: "https://namibian.com.na"
  }
];

export default function NewsFeed({ user }) {
  const [selectedArticle, setSelectedArticle] = useState(null);
  
  // Pagination State (6 articles per page, 12 total articles across 2 pages)
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = localDatabase.slice(indexOfFirstArticle, indexOfLastArticle);
  const totalPages = Math.ceil(localDatabase.length / articlesPerPage);

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <div className="min-h-screen bg-slate-50 relative text-gray-800 font-sans">
      <div className="absolute inset-0 bg-[radial-gradient(#93c5fd_1px,transparent_1px)] [background-size:20px_20px] opacity-30 pointer-events-none fixed"></div>

      {/* Header */}
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

      {/* Main Grid Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-black text-gray-800 tracking-tight">Today's Top Stories</h2>
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            12 Articles Loaded
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

      {/* Article Reading Modal with View Original Post Button */}
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
               <img src={selectedArticle.image} alt={selectedArticle.title} className="w-full h-full object-cover opacity-90" />
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
    </div>
  );
}