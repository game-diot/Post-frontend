import React from "react";

export default function InfoDialog({ onClose }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          width: "90%",
          maxWidth: "600px",
          borderRadius: "10px",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
          padding: "24px 30px",
          fontFamily: "sans-serif",
          lineHeight: "1.6",
        }}
      >
        <h2 style={{ marginBottom: "12px", fontSize: "20px", color: "#333" }}>
          📢 使用须知
        </h2>
        <div style={{ fontSize: "14px", color: "#444" }}>
          <p>
            本项目仅用于测试记录我学习过程中的关键节点，如 API
            调用、前后端部署等。
          </p>
          <p>
            任何人都可以使用任意账号和密码进行注册与登录，发表看法仅用于演示与交互测试。
          </p>
          <p>
            前端使用 <strong>Vercel</strong> 部署，后端使用{" "}
            <strong>Render</strong> 部署。 由于 Render
            存在冷启动延迟，您可能首次访问时看不到内容，
            <span style={{ color: "#d9534f", fontWeight: "bold" }}>
              需登录或注册后才能正常加载内容。
            </span>
          </p>
          <p>
            图片加载问题已通过 <strong>Cloudinary</strong> 解决，原先 Render
            上的图片可能无法显示。
          </p>
        </div>
        <div style={{ textAlign: "right", marginTop: "20px" }}>
          <button
            onClick={onClose}
            style={{
              backgroundColor: "#007bff",
              color: "#fff",
              padding: "8px 16px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            我知道了
          </button>
        </div>
      </div>
    </div>
  );
}
