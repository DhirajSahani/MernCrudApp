// index.js
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import bookRouter from "./routes/book.route.js";
import cors from "cors";
import serverless from "serverless-http";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Running...");
});

app.use("/book", bookRouter);

// Wrap Express app with serverless
export default serverless(app);
