import axios from 'axios';
import * as cheerio from 'cheerio';

export default async function handler(req, res) {
  // Allow CORS so your frontend can talk to it smoothly on Vercel
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  try {
    // Fetching from a reliable public aggregator feed tracking Namibian current events
    const response = await axios.get('https://news.google.com/rss/search?q=Namibia+news&hl=en-US&gl=US&ceid=US:en', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });

    const $ = cheerio.load(response.data, { xmlMode: true });
    const articles = [];

    // Parse the RSS items
    $('item').each((i, el) => {
      if (i >= 12) return false; // Grab up to 12 articles for pagination (Pages 1 and 2)

      const title = $(el).find('title').text().trim();
      const link = $(el).find('link').text().trim();
      const pubDate = $(el).find('pubDate').text().trim();
      const source = $(el).find('source').text().trim() || "Namibian Media";
      
      const descriptionHtml = $(el).find('description').text();
      const descCheerio = cheerio.load(descriptionHtml);
      
      // Extract the real image if embedded in the RSS description
      let image = descCheerio('img').attr('src');
      
      // Fallback to high-quality professional imagery relevant to Namibia if none embedded
      if (!image) {
        const fallbacks = [
          "https://images.unsplash.com/photo-1523995462485-3d171b5c8fa9?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1509391366360-19f9d001d073?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1536421469767-80559bb6f5f1?auto=format&fit=crop&w=800&q=80"
        ];
        image = fallbacks[i % fallbacks.length];
      }

      const cleanSummary = descCheerio('p').text().trim() || descCheerio('div').text().trim() || title;

      articles.push({
        id: i + 1,
        title,
        date: pubDate ? new Date(pubDate).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' }) : new Date().toLocaleDateString(),
        image,
        summary: cleanSummary.slice(0, 150) + "...",
        fullText: `${cleanSummary}\n\nPublished by ${source}. Read the full breaking coverage and view original media directly on the publisher's platform.`,
        sourceLink: link
      });
    });

    res.status(200).json(articles);
  } catch (error) {
    console.error("Backend Error:", error);
    res.status(500).json({ error: 'Failed to fetch live news feed.' });
  }
}