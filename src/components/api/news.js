import axios from 'axios';
import * as cheerio from 'cheerio';

export default async function handler(req, res) {
  try {
    // 1. Visit The Namibian's National News page
    const targetUrl = 'https://namibian.com.na/category/national/';
    
    // 2. Disguise the scraper as a regular web browser so it doesn't get blocked
    const { data } = await axios.get(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
      }
    });

    // 3. Load the HTML into Cheerio to search for elements
    const $ = cheerio.load(data);
    const articles = [];

    // 4. Find the article cards (Targeting standard WordPress/news article wrappers)
    // Note: If the Namibian changes their website layout, these CSS class names (e.g., '.tdb_module_loop') might need updating.
    $('.tdb_module_loop, .type-post').each((i, el) => {
      if (i >= 12) return false; // Stop after grabbing 12 articles

      // Extract data using CSS selectors
      const title = $(el).find('.entry-title a, h3 a').text().trim();
      const link = $(el).find('.entry-title a, h3 a').attr('href');
      
      // Look for the image in various standard formats
      let image = $(el).find('.entry-thumb').attr('data-img-url') || 
                  $(el).find('img').attr('src') || 
                  $(el).find('img').attr('data-src');

      const summary = $(el).find('.td-excerpt, .entry-content').text().trim() || "Click the link below to read the full article on The Namibian.";
      const date = $(el).find('.entry-date, .published').text().trim() || new Date().toLocaleDateString();

      // Only add to our list if it successfully found a title and a link
      if (title && link) {
        articles.push({
          id: i + 1,
          title,
          date,
          // Fallback to a placeholder if the scraper couldn't find the image
          image: image || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&q=80',
          summary,
          fullText: summary + "\n\n(Because this is copyrighted material, please read the rest of the story directly on the publisher's website using the button below.)",
          sourceLink: link
        });
      }
    });

    // 5. Send the scraped articles to your frontend
    res.status(200).json(articles);

  } catch (error) {
    console.error("Backend Scraping Error:", error);
    res.status(500).json({ error: 'Failed to scrape news data.' });
  }
}