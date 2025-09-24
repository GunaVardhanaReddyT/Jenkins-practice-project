import React, { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const baseUrl = "http://localhost:2030/blog-backend/api/blogs";
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchBlogs = async () => {
    const res = await axios.get(baseUrl);
    setBlogs(res.data);
  };

  useEffect(() => { fetchBlogs(); }, []);

  const saveBlog = async () => {
    if (!title || !content) return;
    if (editId) {
      await axios.put(`${baseUrl}/${editId}`, { title, content });
      setEditId(null);
    } else {
      await axios.post(baseUrl, { title, content });
    }
    setTitle(""); setContent("");
    fetchBlogs();
  };

  const editBlog = (b) => { setTitle(b.title); setContent(b.content); setEditId(b.id); };
  const deleteBlog = async (id) => { await axios.delete(`${baseUrl}/${id}`); fetchBlogs(); };

  return (
    <div style={{ fontFamily: "Arial", maxWidth: "600px", margin: "50px auto", padding: "20px",
                  borderRadius: "10px", background: "#f0f4f8", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
      <h2 style={{ textAlign: "center" }}>Simple Blog</h2>

      <div style={{ marginBottom: "20px" }}>
        <input
          style={{ width: "100%", padding: "8px", marginBottom: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
          value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Title" />
        <textarea
          style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc", marginBottom: "8px" }}
          value={content} onChange={(e)=>setContent(e.target.value)} placeholder="Content" rows={4} />
        <button
          style={{ width: "100%", padding: "10px", border: "none", borderRadius: "5px", background: "#007bff", color: "#fff" }}
          onClick={saveBlog}>{editId?"Update":"Add"} Blog</button>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {blogs.map((b) => (
          <li key={b.id} style={{ background: "#fff", padding: "10px", marginBottom: "10px",
                                   borderRadius: "5px", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}>
            <h4>{b.title}</h4>
            <p>{b.content}</p>
            <button style={{ marginRight: "10px", padding: "5px 10px", borderRadius: "5px", border: "none",
                             background: "#28a745", color: "#fff" }} onClick={()=>editBlog(b)}>Edit</button>
            <button style={{ padding: "5px 10px", borderRadius: "5px", border: "none",
                             background: "#dc3545", color: "#fff" }} onClick={()=>deleteBlog(b.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
