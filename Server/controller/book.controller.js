import Book from "../model/book.model.js";

// Add Book
export const handleBookStoreController = async (req, res) => {
  try {
    const { BookName, BookAuthor, BookPrice, SellingPrice, PurchageDate } = req.body;

    if (!BookName || !BookAuthor || !BookPrice || !SellingPrice || !PurchageDate) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const BookAdd = await Book.create({
      BookName,
      BookAuthor,
      BookPrice,
      SellingPrice,
      PurchageDate,
    });

    console.log("Book Added:", BookAdd);

    return res.status(201).json({
      message: "Book added successfully!",
      data: BookAdd,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

// Get All Books
export const getAllBooksController = async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};
// Delete a book
export const deleteBookController = async (req, res) => {
  try {
    const { id } = req.params;
    await Book.findByIdAndDelete(id);
    return res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Update a book
export const updateBookController = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true });
    return res.status(200).json({ message: "Book updated successfully", data: updatedBook });
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};

