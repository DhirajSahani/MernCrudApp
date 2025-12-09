import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import bookRouter from "./routes/book.routes.js";
import cors from "cors";

dotenv.config();
connectDB();

const app = express();



// IMPORTANT 🔥: Fix Server Error
app.use(cors());
app.use(express.json()); // <-- Without this req.body is EMPTY

app.get("/", (req, res) => {
  res.send("API Running...");
});

// Use book routes
app.use("/book", bookRouter);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

