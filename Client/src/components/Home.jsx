import React, { useState, useEffect } from "react";

const Home = () => {
  const [formData, setFormData] = useState({
    BookName: "",
    BookAuthor: "",
    BookPrice: "",
    SellingPrice: "",
    PurchageDate: "",
  });
  const [books, setBooks] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // Input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Fetch books
  const fetchBooks = async () => {
    try {
      const res = await fetch("http://localhost:5000/book");
      if (!res.ok) throw new Error("Failed to fetch books");
      const data = await res.json();
      setBooks(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Submit / Update
  const handleSubmit = async () => {
    try {
      const url = editingId
        ? `http://localhost:5000/book/${editingId}`
        : "http://localhost:5000/book/addbook";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Error");
        return;
      }

      setFormData({
        BookName: "",
        BookAuthor: "",
        BookPrice: "",
        SellingPrice: "",
        PurchageDate: "",
      });
      setEditingId(null);

      await fetchBooks();

      alert(editingId ? "Book updated!" : "Book added!");
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  // Delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        const res = await fetch(`http://localhost:5000/book/${id}`, {
          method: "DELETE",
        });
        if (!res.ok) throw new Error("Failed to delete");
        await fetchBooks();
      } catch (error) {
        console.error(error);
      }
    }
  };

  // Edit
  const handleEdit = (book) => {
    setFormData({
      BookName: book.BookName,
      BookAuthor: book.BookAuthor,
      BookPrice: book.BookPrice,
      SellingPrice: book.SellingPrice,
      PurchageDate: book.PurchageDate.split("T")[0],
    });
    setEditingId(book._id);
  };

  return (
    <div className="w-full mt-10 px-4 min-h-screen">
      {/* Form */}
      <div className="bg-white p-6 shadow-lg rounded-xl">
        <h2 className="text-xl font-semibold mb-4">📘 {editingId ? "Update Book" : "Add New Book"}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { label: "Book Name", name: "BookName", type: "text" },
            { label: "Book Author", name: "BookAuthor", type: "text" },
            { label: "Book Price", name: "BookPrice", type: "number" },
            { label: "Selling Price", name: "SellingPrice", type: "number" },
            { label: "Purchase Date", name: "PurchageDate", type: "date" },
          ].map((field) => (
            <div key={field.name} className="flex flex-col">
              <label className="mb-1 font-medium">{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>

        {/* Submit button */}
        <div className="w-full flex justify-end mt-6">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg shadow-md cursor-pointer"
          >
            {editingId ? "Update Book" : "Submit Book"}
          </button>
        </div>
      </div>

      {/* Table / Card List */}
      <div className="w-full mt-10">
        <h2 className="text-xl font-semibold mb-4">📚 Book List</h2>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full table-auto shadow-lg rounded-xl overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                {[
                  "Book Name",
                  "Book Author",
                  "Book Price",
                  "Selling Price",
                  "Purchase Date",
                  "Action",
                ].map((head) => (
                  <th key={head} className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {books.map((book) => (
                <tr key={book._id} className="hover:bg-gray-50">
                  <td className="px-6 py-3">{book.BookName}</td>
                  <td className="px-6 py-3">{book.BookAuthor}</td>
                  <td className="px-6 py-3">{book.BookPrice}</td>
                  <td className="px-6 py-3">{book.SellingPrice}</td>
                  <td className="px-6 py-3">{new Date(book.PurchageDate).toLocaleDateString()}</td>
                  <td className="px-6 py-3 space-x-2">
                    <button onClick={() => handleEdit(book)} className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(book._id)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {books.map((book) => (
            <div key={book._id} className="bg-white p-4 shadow-md rounded-lg">
              <p><strong>Name:</strong> {book.BookName}</p>
              <p><strong>Author:</strong> {book.BookAuthor}</p>
              <p><strong>Price:</strong> ₹{book.BookPrice}</p>
              <p><strong>Selling:</strong> ₹{book.SellingPrice}</p>
              <p><strong>Date:</strong> {new Date(book.PurchageDate).toLocaleDateString()}</p>

              <div className="flex justify-end gap-3 mt-3">
                <button onClick={() => handleEdit(book)} className="bg-yellow-500 text-white px-4 py-1 rounded">
                  Edit
                </button>
                <button onClick={() => handleDelete(book._id)} className="bg-red-500 text-white px-4 py-1 rounded">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Home;
