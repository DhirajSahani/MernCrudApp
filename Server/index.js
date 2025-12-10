import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import bookRouter from "./routes/book.routes.js";
import cors from "cors";

dotenv.config();
connectDB();

const app = express();

// Fix server error
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Running...");
});

app.use("/book", bookRouter);

// ❗ REQUIRED FOR VERCEL:
export default app;
