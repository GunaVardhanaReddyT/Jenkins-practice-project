import React, { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const baseUrl = "http://localhost:2030/blogapp-b-0.0.1-SNAPSHOT/api/blogs"; // ✅ Correct URL
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(baseUrl);
      setBlogs(res.data);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const saveBlog = async () => {
    if (!title.trim() || !content.trim()) return;
    try {
      if (editId) {
        await axios.put(`${baseUrl}/${editId}`, { title, content });
        setEditId(null);
      } else {
        await axios.post(baseUrl, { title, content });
      }
      setTitle("");
      setContent("");
      fetchBlogs();
    } catch (err) {
      console.error("Error saving blog:", err);
    }
  };

  const editBlog = (b) => {
    setTitle(b.title);
    setContent(b.content);
    setEditId(b.id);
  };

  const deleteBlog = async (id) => {
    try {
      await axios.delete(`${baseUrl}/${id}`);
      fetchBlogs();
    } catch (err) {
      console.error("Error deleting blog:", err);
    }
  };

  return (
    <div
      style={{
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        maxWidth: "700px",
        margin: "50px auto",
        padding: "25px",
        borderRadius: "12px",
        background: "#fefefe",
        boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
      }}
    >
      <h2 style={{ textAlign: "center", color: "#333" }}>📝 My Blog App</h2>

      <div style={{ marginBottom: "25px" }}>
        <input
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter blog title"
        />
        <textarea
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            marginBottom: "12px",
            fontSize: "16px",
            resize: "vertical",
          }}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter blog content"
          rows={5}
        />
        <button
          style={{
            width: "100%",
            padding: "12px",
            border: "none",
            borderRadius: "6px",
            background: "#007bff",
            color: "#fff",
            fontSize: "16px",
            cursor: "pointer",
            transition: "background 0.3s",
          }}
          onClick={saveBlog}
          onMouseOver={(e) => (e.target.style.background = "#0056b3")}
          onMouseOut={(e) => (e.target.style.background = "#007bff")}
        >
          {editId ? "Update Blog" : "Add Blog"}
        </button>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {blogs.map((b) => (
          <li
            key={b.id}
            style={{
              background: "#f9f9f9",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "8px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
            }}
          >
            <h4 style={{ marginBottom: "8px", color: "#007bff" }}>{b.title}</h4>
            <p style={{ marginBottom: "12px", color: "#555" }}>{b.content}</p>
            <button
              style={{
                marginRight: "10px",
                padding: "6px 12px",
                borderRadius: "5px",
                border: "none",
                background: "#28a745",
                color: "#fff",
                cursor: "pointer",
              }}
              onClick={() => editBlog(b)}
            >
              Edit
            </button>
            <button
              style={{
                padding: "6px 12px",
                borderRadius: "5px",
                border: "none",
                background: "#dc3545",
                color: "#fff",
                cursor: "pointer",
              }}
              onClick={() => deleteBlog(b.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
