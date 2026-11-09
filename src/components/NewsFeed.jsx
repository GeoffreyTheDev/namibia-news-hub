import { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { FaTimes, FaChevronLeft, FaChevronRight, FaSpinner, FaExternalLinkAlt, FaGlobe } from 'react-icons/fa';

export default function NewsFeed({ user }) {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState(null);
  
  // Pagination State (6 articles per page, total 12 articles across 2 pages)
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);
  const totalPages = Math.ceil(articles.length / articlesPerPage);

  // Fetch live articles from your Vercel backend function
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('/api/news');
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setArticles(data);
        }
      } catch (error) {
        console.error("Error loading news:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNews();
  }, []);

  const handleLogout = () => {
    signOut(auth);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-blue-600">
        <FaSpinner className="animate-spin text-5xl mb-4" />
        <h2 className="text-xl font-bold tracking-tight">Loading today's Namibian headlines...</h2>
      </div>
    );
  }

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
            Updated Daily
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
                  onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1523995462485-3d171b5c8fa9?auto=format&fit=crop&w=800&q=80"; }}
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