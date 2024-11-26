import express from "express";
import { scrapeDomains } from "./services/wrapper";
import axios from "axios";

const app = express();
app.use(express.json());

app.post("/api/process-domains", async (req, res) => {
  const {
    domains,
    companyNameDict,
    investorReferenceDict,
    companyReferenceDict,
  } = req.body;

  if (
    !Array.isArray(domains) ||
    typeof companyNameDict !== "object" ||
    typeof investorReferenceDict !== "object" ||
    typeof companyReferenceDict !== "object"
  ) {
    return;
  }

  const results = await scrapeDomains(domains);
  console.log("Passing final results to backend for conversion to CSV...");
  axios.post("http://localhost:3000/api/receiveCompanyExecutiveWSData", {
    results,
    companyNameDict,
    investorReferenceDict,
    companyReferenceDict,
  });

  res.status(200).json({
    message: "Input received and running domains through scraper...",
    domainsCount: domains.length,
    results: results,
  });
});

app.use((req, res) => {
  res.status(404).send(`Cannot ${req.method} ${req.url}`);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
