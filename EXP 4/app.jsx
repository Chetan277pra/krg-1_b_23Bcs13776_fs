import React, { useState, useEffect } from "react";

const API = "http://localhost:3001/books";

export default function App() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ title: "", author: "", year: "" });
  const [search, setSearch] = useState("");
  const [edit, setEdit] = useState(null);

  useEffect(() => { fetchBooks(); }, []);

  async function fetchBooks() {
    const res = await fetch(API);
    const data = await res.json();
    setBooks(data);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const method = edit ? "PUT" : "POST";
    const url = edit ? `${API}/${edit.id}` : API;
    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setForm({ title: "", author: "", year: "" });
    setEdit(null);
    fetchBooks();
  }

  async function handleDelete(id) {
    if (confirm("Delete this book?")) {
      await fetch(`${API}/${id}`, { method: "DELETE" });
      fetchBooks();
    }
  }

  const filtered = books.filter(b => b.title.toLowerCase().includes(search.toLowerCase()) || b.author.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", fontFamily: "Arial" }}>
      <h2>Library Management</h2>

      <input
        placeholder="Search by title or author..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ width: "100%", padding: 8, marginBottom: 10 }}
      />

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 8, marginBottom: 20 }}>
        <input placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
        <input placeholder="Author" value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} required />
        <input placeholder="Year" type="number" value={form.year} onChange={e => setForm({ ...form, year: e.target.value })} required />
        <button>{edit ? "Update" : "Add"} Book</button>
      </form>

      <table width="100%" border="1" cellPadding="6">
        <thead>
          <tr><th>ID</th><th>Title</th><th>Author</th><th>Year</th><th>Action</th></tr>
        </thead>
        <tbody>
          {filtered.map(b => (
            <tr key={b.id}>
              <td>{b.id}</td>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>{b.year}</td>
              <td>
                <button onClick={() => { setEdit(b); setForm({ title: b.title, author: b.author, year: b.year }); }}>Edit</button>
                <button onClick={() => handleDelete(b.id)} style={{ marginLeft: 6 }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
