import Post from "../Post";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaHandPointUp, FaHandPointDown } from "react-icons/fa"; // 引入图标

export default function IndexPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("https://post-backend-9ycs.onrender.com/post")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("获取文章列表失败:", error);
      });
  }, []);

  const moveUp = (index) => {
    if (index === 0) return;
    const newPosts = [...posts];
    [newPosts[index - 1], newPosts[index]] = [
      newPosts[index],
      newPosts[index - 1],
    ];
    setPosts(newPosts);
  };

  const moveDown = (index) => {
    if (index === posts.length - 1) return;
    const newPosts = [...posts];
    [newPosts[index], newPosts[index + 1]] = [
      newPosts[index + 1],
      newPosts[index],
    ];
    setPosts(newPosts);
  };

  return (
    <>
      {posts.length > 0 &&
        posts.map((post, index) => (
          <div
            key={post._id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <Post {...post} />
            <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
              <button
                onClick={() => moveUp(index)}
                disabled={index === 0}
                title="上移"
                style={{
                  background: "none",
                  border: "none",
                  cursor: index === 0 ? "not-allowed" : "pointer",
                  color: index === 0 ? "#ccc" : "#007bff",
                  fontSize: "20px",
                }}
              >
                <FaHandPointUp />
              </button>
              <button
                onClick={() => moveDown(index)}
                disabled={index === posts.length - 1}
                title="下移"
                style={{
                  background: "none",
                  border: "none",
                  cursor:
                    index === posts.length - 1 ? "not-allowed" : "pointer",
                  color: index === posts.length - 1 ? "#ccc" : "#007bff",
                  fontSize: "20px",
                }}
              >
                <FaHandPointDown />
              </button>
            </div>
          </div>
        ))}
    </>
  );
}
