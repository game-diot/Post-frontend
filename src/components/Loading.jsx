import React from "react";

const Loading = ({ message = "后端内容正在加载中..." }) => {
  return (
    <div style={styles.overlay}>
      <div style={styles.container}>
        <svg
          className="pl"
          viewBox="0 0 48 48"
          width="120px"
          height="120px"
          role="img"
          aria-label="Loading animation"
        >
          <defs>
            <linearGradient id="pl-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#000" />
              <stop offset="100%" stopColor="#fff" />
            </linearGradient>
            <mask id="pl-mask">
              <rect x="-1" y="-1" width="50" height="18" fill="url(#pl-grad)" />
            </mask>
          </defs>
          <g
            fill="none"
            stroke="currentcolor"
            strokeLinecap="round"
            strokeWidth="2"
            transform="translate(0,19)"
          >
            <g className="pl__layer">
              <g className="pl__scene">
                <path
                  className="pl__curve"
                  d="M 16 9 C 16 4.582 19.582 1 24 1 C 28.418 1 32 4.582 32 9"
                  strokeDasharray="25.13 25.13"
                  strokeDashoffset="25.12"
                />
                <polyline
                  className="pl__dot"
                  points="32 9,48 9"
                  strokeDasharray="0.01 16"
                />
              </g>
            </g>
            <g className="pl__layer" mask="url(#pl-mask)">
              <g className="pl__scene">
                <path
                  className="pl__curve"
                  d="M 16 9 C 16 4.582 19.582 1 24 1 C 28.418 1 32 4.582 32 9"
                  strokeDasharray="25.13 25.13"
                  strokeDashoffset="25.12"
                />
                <polyline
                  className="pl__dot"
                  points="32 9,48 9"
                  strokeDasharray="0.01 16"
                />
              </g>
            </g>
          </g>
        </svg>
        <p style={styles.text}>{message}</p>
      </div>

      <style>{`
        .pl {
          display: block;
          margin: auto;
          color: #007bff;
        }
        .pl__curve,
        .pl__dot,
        .pl__scene {
          animation-duration: 1.5s;
          animation-timing-function: cubic-bezier(0.65, 0, 0.35, 1);
          animation-iteration-count: infinite;
        }
        .pl__curve {
          animation-name: curve-offset;
          stroke: hsl(223, 90%, 50%);
        }
        .pl__layer + .pl__layer .pl__curve {
          stroke: hsl(163, 90%, 50%);
        }
        .pl__dot {
          animation-name: dot-move;
          stroke: hsl(343, 90%, 50%);
        }
        .pl__layer + .pl__layer .pl__dot {
          stroke: hsl(283, 90%, 50%);
        }
        .pl__scene {
          animation-name: scene-move;
          animation-timing-function: linear;
        }
        @keyframes curve-offset {
          from {
            stroke-dashoffset: 25.12;
          }
          46% {
            stroke-dashoffset: 0;
          }
          92%,
          to {
            stroke-dashoffset: -24.97;
          }
        }
        @keyframes dot-move {
          from,
          25% {
            stroke-dashoffset: 0;
          }
          50%,
          to {
            stroke-dashoffset: -15.99;
          }
        }
        @keyframes scene-move {
          from {
            transform: translate(0, 0);
          }
          to {
            transform: translate(-16px, 0);
          }
        }
      `}</style>
    </div>
  );
};

const styles = {
  overlay: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    width: "100vw",
    backgroundColor: "white",
    zIndex: 9999,
    position: "fixed",
    top: 0,
    left: 0,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
  },
  text: {
    fontSize: "16px",
    color: "#666",
    fontWeight: "500",
    textAlign: "center",
    margin: 0,
  },
};

export default Loading;
