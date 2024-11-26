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
const express_1 = __importDefault(require("express"));
const wrapper_1 = require("./services/wrapper");
const axios_1 = __importDefault(require("axios"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post("/api/process-domains", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { domains, companyNameDict, investorReferenceDict, companyReferenceDict, } = req.body;
    if (!Array.isArray(domains) ||
        typeof companyNameDict !== "object" ||
        typeof investorReferenceDict !== "object" ||
        typeof companyReferenceDict !== "object") {
        return;
    }
    const results = yield (0, wrapper_1.scrapeDomains)(domains);
    console.log("Passing final results to backend for conversion to CSV...");
    axios_1.default.post("http://localhost:3000/api/receiveCompanyExecutiveWSData", {
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
}));
app.use((req, res) => {
    res.status(404).send(`Cannot ${req.method} ${req.url}`);
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
exports.default = app;
