import { useEffect, useState } from 'react';

export default function NewsFeed() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // Using an RSS-to-JSON service to parse a Namibian news RSS feed
    const fetchNews = async () => {
      const rssUrl = 'https://namibian.com.na/feed/'; 
      const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}`;
      
      const response = await fetch(apiUrl);
      const data = await response.json();
      setArticles(data.items || []);
    };
    
    fetchNews();
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article, index) => (
        <div key={index} className="p-4 border rounded shadow hover:shadow-lg">
          <h2 className="text-xl font-bold">{article.title}</h2>
          <p className="text-sm text-gray-500">{new Date(article.pubDate).toDateString()}</p>
          <a href={article.link} target="_blank" className="text-blue-500 mt-2 block">
            Read Full Article
          </a>
        </div>
      ))}
    </div>
  );
}