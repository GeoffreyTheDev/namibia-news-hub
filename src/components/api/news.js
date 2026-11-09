import axios from 'axios';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  try {
    const apiKey = process.env.GNEWS_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'GNews API Key is missing in Vercel.' });
    }

    // Fetch the 12 latest news articles about Namibia in English
    const response = await axios.get(`https://gnews.io/api/v4/search?q=Namibia&lang=en&max=12&apikey=${apiKey}`);
    
    // Format them exactly how your frontend expects them
    const articles = response.data.articles.map((article, index) => ({
      id: index + 1,
      title: article.title,
      date: new Date(article.publishedAt).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' }),
      // Uses the real image from the publisher, with a safe fallback just in case
      image: article.image || "https://images.unsplash.com/photo-1523995462485-3d171b5c8fa9?auto=format&fit=crop&w=800&q=80",
      summary: article.description,
      fullText: `${article.content}\n\nPublished by ${article.source.name}.`,
      sourceLink: article.url
    }));

    res.status(200).json(articles);
  } catch (error) {
    console.error("Backend Error:", error);
    res.status(500).json({ error: 'Failed to fetch live news feed.' });
  }
}