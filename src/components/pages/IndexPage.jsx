import Post from "../Post";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaHandPointUp, FaHandPointDown } from "react-icons/fa";
import InfoDialog from "../InfoDialog";
import Loading from "../Loading";

export default function IndexPage() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [error, setError] = useState(null);

  // 安全的 localStorage 操作
  const safeLocalStorage = {
    getItem: (key) => {
      try {
        return localStorage.getItem(key);
      } catch (e) {
        console.warn("localStorage getItem failed:", e);
        return null;
      }
    },
    setItem: (key, value) => {
      try {
        localStorage.setItem(key, value);
      } catch (e) {
        console.warn("localStorage setItem failed:", e);
      }
    },
  };

  // 检查是否需要显示加载动画
  const shouldShowLoadingAnimation = () => {
    const hasSeenLoading = safeLocalStorage.getItem("hasSeenLoading");
    return !hasSeenLoading;
  };

  // 获取文章数据
  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        "https://post-backend-9ycs.onrender.com/post"
      );
      setPosts(response.data);
      setError(null);
    } catch (error) {
      console.error("获取文章列表失败:", error);
      setError("加载失败，请刷新页面重试");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initializePage = async () => {
      const showLoadingAnimation = shouldShowLoadingAnimation();

      if (showLoadingAnimation) {
        // 首次访问：显示加载动画3秒后获取数据
        setTimeout(async () => {
          await fetchPosts();
          safeLocalStorage.setItem("hasSeenLoading", "true");
        }, 3000);
      } else {
        // 非首次访问：直接获取数据
        await fetchPosts();
      }
    };

    initializePage();
  }, []);

  // 检查是否需要显示信息弹窗
  useEffect(() => {
    const hasSeen = safeLocalStorage.getItem("hasSeenInfoDialog");
    if (!hasSeen) {
      setShowDialog(true);
    }
  }, []);

  const handleCloseDialog = () => {
    setShowDialog(false);
    safeLocalStorage.setItem("hasSeenInfoDialog", "true");
  };

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

  // 如果正在加载，显示加载组件
  if (loading) {
    return <Loading />;
  }

  // 如果加载出错，显示错误信息
  if (error) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "20px",
          color: "#ff4444",
        }}
      >
        <h3>{error}</h3>
        <button
          onClick={() => {
            setLoading(true);
            setError(null);
            fetchPosts();
          }}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          重新加载
        </button>
      </div>
    );
  }

  return (
    <>
      {showDialog && <InfoDialog onClose={handleCloseDialog} />}
      {posts.length > 0 ? (
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
        ))
      ) : (
        <div style={{ textAlign: "center", padding: "20px" }}>
          <p>暂无文章内容</p>
        </div>
      )}
    </>
  );
}
