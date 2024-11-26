"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrapeDomains = scrapeDomains;
const axios_1 = __importDefault(require("axios"));
function scrapeDomains(domains) {
    return __awaiter(this, void 0, void 0, function* () {
        const results = [];
        for (const domain of domains) {
            console.log(`Scraping for domain: ${domain}`);
            try {
                const response = yield axios_1.default.get(`https://companyexecutivescraper.onrender.com/scrape?company_name=${domain}`);
                response.data.forEach((item) => {
                    results.push(Object.assign(Object.assign({}, item), { domain }));
                });
                console.log(`Scraped ${response.data.length} results for domain: ${domain}`);
            }
            catch (error) {
                console.error(`Failed to scrape for domain: ${domain}`, error);
            }
        }
        return results;
    });
}
