import React, { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const baseUrl = "http://localhost:2030/blogapp-b-0.0.1-SNAPSHOT/api/blogs";
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editId, setEditId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(baseUrl);
      setBlogs(res.data);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const saveBlog = async () => {
    if (!title.trim() || !content.trim()) return;
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  const editBlog = (b) => {
    setTitle(b.title);
    setContent(b.content);
    setEditId(b.id);
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteBlog = async (id) => {
    setIsLoading(true);
    try {
      await axios.delete(`${baseUrl}/${id}`);
      fetchBlogs();
    } catch (err) {
      console.error("Error deleting blog:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "20px",
        fontFamily:
          "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(20px)",
          borderRadius: "24px",
          padding: "40px",
          boxShadow:
            "0 20px 60px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h1
            style={{
              background: "linear-gradient(135deg, #667eea, #764ba2)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontSize: "3rem",
              fontWeight: "800",
              margin: "0",
              letterSpacing: "-1px",
            }}
          >
            ✨ BlogCraft
          </h1>
          <p
            style={{
              color: "#6b7280",
              fontSize: "1.1rem",
              margin: "10px 0 0 0",
              fontWeight: "400",
            }}
          >
            Share your thoughts with the world
          </p>
        </div>

        {/* Form Section */}
        <div
          style={{
            background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
            padding: "32px",
            borderRadius: "20px",
            marginBottom: "40px",
            border: "1px solid rgba(148, 163, 184, 0.1)",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
          }}
        >
          <div style={{ marginBottom: "24px" }}>
            <label
              style={{
                display: "block",
                color: "#374151",
                fontSize: "14px",
                fontWeight: "600",
                marginBottom: "8px",
                letterSpacing: "0.5px",
              }}
            >
              TITLE
            </label>
            <input
              style={{
                width: "100%",
                padding: "16px 20px",
                borderRadius: "12px",
                border: "2px solid #e5e7eb",
                fontSize: "16px",
                fontWeight: "500",
                background: "#ffffff",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                outline: "none",
                boxSizing: "border-box",
              }}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your blog title..."
              onFocus={(e) => {
                e.target.style.borderColor = "#667eea";
                e.target.style.boxShadow = "0 0 0 4px rgba(102, 126, 234, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e5e7eb";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label
              style={{
                display: "block",
                color: "#374151",
                fontSize: "14px",
                fontWeight: "600",
                marginBottom: "8px",
                letterSpacing: "0.5px",
              }}
            >
              CONTENT
            </label>
            <textarea
              style={{
                width: "100%",
                padding: "16px 20px",
                borderRadius: "12px",
                border: "2px solid #e5e7eb",
                fontSize: "16px",
                fontWeight: "400",
                background: "#ffffff",
                resize: "vertical",
                minHeight: "120px",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                outline: "none",
                boxSizing: "border-box",
                lineHeight: "1.6",
              }}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share your thoughts..."
              rows={5}
              onFocus={(e) => {
                e.target.style.borderColor = "#667eea";
                e.target.style.boxShadow = "0 0 0 4px rgba(102, 126, 234, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e5e7eb";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          <button
            style={{
              width: "100%",
              padding: "16px 24px",
              border: "none",
              borderRadius: "12px",
              background: editId
                ? "linear-gradient(135deg, #f59e0b, #d97706)"
                : "linear-gradient(135deg, #667eea, #764ba2)",
              color: "#ffffff",
              fontSize: "16px",
              fontWeight: "600",
              cursor: isLoading ? "not-allowed" : "pointer",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              letterSpacing: "0.5px",
              opacity: isLoading ? 0.7 : 1,
              transform: "translateY(0)",
              boxShadow: "0 4px 20px rgba(102, 126, 234, 0.3)",
            }}
            onClick={saveBlog}
            disabled={isLoading}
            onMouseOver={(e) => {
              if (!isLoading) {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow =
                  "0 8px 30px rgba(102, 126, 234, 0.4)";
              }
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 20px rgba(102, 126, 234, 0.3)";
            }}
          >
            {isLoading ? (
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    width: "16px",
                    height: "16px",
                    border: "2px solid rgba(255,255,255,0.3)",
                    borderTop: "2px solid #ffffff",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite",
                    marginRight: "8px",
                  }}
                />
                Processing...
              </span>
            ) : editId ? (
              "🔄 Update Blog"
            ) : (
              "✨ Publish Blog"
            )}
          </button>
        </div>

        {/* Blog List */}
        <div>
          <h3
            style={{
              color: "#374151",
              fontSize: "1.5rem",
              fontWeight: "700",
              marginBottom: "24px",
              display: "flex",
              alignItems: "center",
            }}
          >
            📚 Your Stories
            <span
              style={{
                background: "linear-gradient(135deg, #667eea, #764ba2)",
                color: "#ffffff",
                fontSize: "12px",
                fontWeight: "600",
                padding: "4px 12px",
                borderRadius: "20px",
                marginLeft: "12px",
              }}
            >
              {blogs.length}
            </span>
          </h3>

          {blogs.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "60px 20px",
                color: "#6b7280",
                background: "linear-gradient(135deg, #f9fafb, #f3f4f6)",
                borderRadius: "16px",
                border: "2px dashed #d1d5db",
              }}
            >
              <div style={{ fontSize: "3rem", marginBottom: "16px" }}>📝</div>
              <h4 style={{ margin: "0 0 8px 0", fontWeight: "600" }}>
                No blogs yet
              </h4>
              <p style={{ margin: "0", fontSize: "14px" }}>
                Create your first blog post above!
              </p>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gap: "24px",
              }}
            >
              {blogs.map((b, index) => (
                <div
                  key={b.id}
                  style={{
                    background: "#ffffff",
                    padding: "24px",
                    borderRadius: "16px",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                    border: "1px solid rgba(226, 232, 240, 0.8)",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow =
                      "0 12px 40px rgba(0, 0, 0, 0.15)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 20px rgba(0, 0, 0, 0.08)";
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "0",
                      left: "0",
                      width: "4px",
                      height: "100%",
                      background: `linear-gradient(135deg, #667eea, #764ba2)`,
                    }}
                  />

                  <div style={{ marginBottom: "16px" }}>
                    <h4
                      style={{
                        margin: "0 0 8px 0",
                        fontSize: "1.25rem",
                        fontWeight: "700",
                        color: "#1f2937",
                        lineHeight: "1.4",
                      }}
                    >
                      {b.title}
                    </h4>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        color: "#6b7280",
                        fontSize: "12px",
                        fontWeight: "500",
                      }}
                    >
                      <span>#{index + 1}</span>
                      <span>•</span>
                      <span>{new Date().toLocaleDateString()}</span>
                    </div>
                  </div>

                  <p
                    style={{
                      margin: "0 0 20px 0",
                      color: "#4b5563",
                      lineHeight: "1.6",
                      fontSize: "15px",
                    }}
                  >
                    {b.content}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      gap: "12px",
                      alignItems: "center",
                    }}
                  >
                    <button
                      style={{
                        padding: "8px 16px",
                        borderRadius: "8px",
                        border: "none",
                        background: "linear-gradient(135deg, #10b981, #059669)",
                        color: "#ffffff",
                        cursor: "pointer",
                        fontSize: "14px",
                        fontWeight: "600",
                        transition: "all 0.2s ease",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                      onClick={() => editBlog(b)}
                      onMouseOver={(e) => {
                        e.target.style.background =
                          "linear-gradient(135deg, #059669, #047857)";
                        e.target.style.transform = "translateY(-1px)";
                      }}
                      onMouseOut={(e) => {
                        e.target.style.background =
                          "linear-gradient(135deg, #10b981, #059669)";
                        e.target.style.transform = "translateY(0)";
                      }}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      style={{
                        padding: "8px 16px",
                        borderRadius: "8px",
                        border: "none",
                        background: "linear-gradient(135deg, #ef4444, #dc2626)",
                        color: "#ffffff",
                        cursor: "pointer",
                        fontSize: "14px",
                        fontWeight: "600",
                        transition: "all 0.2s ease",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                      onClick={() => deleteBlog(b.id)}
                      onMouseOver={(e) => {
                        e.target.style.background =
                          "linear-gradient(135deg, #dc2626, #b91c1c)";
                        e.target.style.transform = "translateY(-1px)";
                      }}
                      onMouseOut={(e) => {
                        e.target.style.background =
                          "linear-gradient(135deg, #ef4444, #dc2626)";
                        e.target.style.transform = "translateY(0)";
                      }}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CSS Animation */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
          
          * {
            box-sizing: border-box;
          }
          
          body {
            margin: 0;
            padding: 0;
          }
        `}
      </style>
    </div>
  );
}
