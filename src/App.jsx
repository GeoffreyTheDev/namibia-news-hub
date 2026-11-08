import { useState } from 'react';
import Login from './components/Login';
import NewsFeed from './components/NewsFeed';
import NewsAI from './components/NewsAI';

export default function App() {
  const [user, setUser] = useState(null);
  
  // We'll pass these headlines to the AI later so it knows the daily news
  const [currentHeadlines, setCurrentHeadlines] = useState([]);

  if (!user) {
    return <Login onLogin={(loggedInUser) => setUser(loggedInUser)} />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-10">
        <h1 className="text-xl font-bold text-blue-600">Namibia News Hub</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">Welcome, {user.displayName || user.email}</span>
          <button 
            onClick={() => setUser(null)}
            className="text-sm text-red-500 hover:underline"
          >
            Sign Out
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 pt-8">
        <NewsFeed setHeadlines={setCurrentHeadlines} />
      </main>

      <NewsAI currentHeadlines={currentHeadlines} />
    </div>
  );
}