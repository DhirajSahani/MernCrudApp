import React, { useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";

export default function BookCRUD() {
  const [formData, setFormData] = useState({
    id: "",
    bookName: "",
    bookAuthor: "",
    bookPrice: "",
    date: "",
  });

  const [books, setBooks] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  // Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // CREATE + UPDATE
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingIndex !== null) {
      // Update
      const updated = [...books];
      updated[editingIndex] = formData;
      setBooks(updated);
      setEditingIndex(null);
    } else {
      // Create
      setBooks([...books, formData]);
    }

    // Clear form
    setFormData({
      id: "",
      bookName: "",
      bookAuthor: "",
      bookPrice: "",
      date: "",
    });
  };

  // READ (edit fill)
  const handleEdit = (index) => {
    setFormData(books[index]);
    setEditingIndex(index);
  };

  // DELETE
  const handleDelete = (index) => {
    const filtered = books.filter((_, i) => i !== index);
    setBooks(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5 flex flex-col items-center">

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white p-6 rounded-2xl shadow-xl space-y-4"
      >
        <h1 className="text-xl font-bold text-center">
          📚 Book Management (CRUD)
        </h1>

        <div>
          <label className="font-semibold">ID</label>
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
            required
          />
        </div>

        <div>
          <label className="font-semibold">Book Name</label>
          <input
            type="text"
            name="bookName"
            value={formData.bookName}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
            required
          />
        </div>

        <div>
          <label className="font-semibold">Book Author</label>
          <input
            type="text"
            name="bookAuthor"
            value={formData.bookAuthor}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
            required
          />
        </div>

        <div>
          <label className="font-semibold">Book Price (₹)</label>
          <input
            type="number"
            name="bookPrice"
            value={formData.bookPrice}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
            required
          />
        </div>

        <div>
          <label className="font-semibold">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700"
        >
          {editingIndex !== null ? "Update Book" : "Add Book"}
        </button>
      </form>

      {/* TABLE */}
      <div className="mt-8 w-full max-w-4xl overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow-xl overflow-hidden">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Author</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {books.map((book, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-100 transition"
              >
                <td className="p-3">{book.id}</td>
                <td className="p-3">{book.bookName}</td>
                <td className="p-3">{book.bookAuthor}</td>
                <td className="p-3">₹{book.bookPrice}</td>
                <td className="p-3">{book.date}</td>

                <td className="p-3 flex justify-center gap-5">
                  <button
                    className="text-blue-600 hover:text-blue-900"
                    onClick={() => handleEdit(index)}
                  >
                    <FiEdit size={20} />
                  </button>

                  <button
                    className="text-red-600 hover:text-red-900"
                    onClick={() => handleDelete(index)}
                  >
                    <FiTrash size={20} />
                  </button>
                </td>
              </tr>
            ))}

            {books.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center p-4 text-gray-500">
                  No books added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
