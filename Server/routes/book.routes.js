import express from "express";
import { 
  handleBookStoreController, 
  getAllBooksController, 
  deleteBookController,
  updateBookController 
} from "../controller/book.controller.js";

const router = express.Router();

router.post("/addbook", handleBookStoreController);
router.get("/", getAllBooksController);
router.delete("/:id", deleteBookController);
router.put("/:id", updateBookController);

export default router;
