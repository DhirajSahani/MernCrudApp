import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  BookName: { type: String, required: true },
  BookAuthor: { type: String, required: true },
  BookPrice: { type: Number, required: true },
  SellingPrice: { type: Number, required: true },
  PurchageDate: { type: Date, required: true }
});

export default mongoose.model("Book", bookSchema);
