import express, { Request, Response } from "express";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Render!");
});

app.post("/api/process", (req: Request, res: Response) => {
  const { message } = req.body;
  res.json({ success: true, message: `Processed: ${message}` });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
