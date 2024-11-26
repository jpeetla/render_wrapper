import axios from "axios";

interface ScraperResponse {
  domain: string;
  name: string;
  position: string;
  linkedin: string;
  source: string;
}

export async function scrapeDomains(
  domains: string[]
): Promise<ScraperResponse[]> {
  const results: ScraperResponse[] = [];

  for (const domain of domains) {
    console.log(`Scraping for domain: ${domain}`);
    try {
      const response = await axios.get<ScraperResponse[]>(
        `https://companyexecutivescraper.onrender.com/scrape?company_name=${domain}`
      );

      response.data.forEach((item) => {
        results.push({ ...item, domain });
      });

      console.log(
        `Scraped ${response.data.length} results for domain: ${domain}`
      );
    } catch (error) {
      console.error(`Failed to scrape for domain: ${domain}`, error);
    }
  }

  return results;
}
