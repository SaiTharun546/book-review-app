"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link"; // Import Next.js Link
import { api } from '../services/api'; 

export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  api.get("/api/books")
    .then(res => { setBooks(res.data); setLoading(false); })
    .catch(err => { console.error("Error fetching books:", err); setLoading(false); });
}, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Book Review App</h1>

      {loading ? (
        <p className="text-center text-gray-600">Loading books...</p>
      ) : books.length === 0 ? (
        <p className="text-center text-gray-600">No books available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {books.map((book) => (
            <Link key={book.id} href={`/book/${book.id}`} passHref>
              <div className="bg-white p-4 shadow-md rounded-lg cursor-pointer hover:shadow-lg transition duration-200">
                <h2 className="text-xl font-semibold">{book.title}</h2>
                <p className="text-gray-600">by {book.author}</p>
                <p className="text-sm mt-2">⭐ {book.rating}/5</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
