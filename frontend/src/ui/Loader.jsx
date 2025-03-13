import React from "react";

const Loader = ({ role }) => {
  const loaderColor =
    role === "student" || role === "parent" ? `#b110ba` : `#117c90`;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        zIndex: 1000,
      }}
    >
      <div
        className="h-16 w-16 animate-spin rounded-full"
        style={{
          background: `radial-gradient(farthest-side, ${loaderColor} 94%, transparent) top/10px 10px no-repeat,
                       conic-gradient(transparent 30%, ${loaderColor})`,
          WebkitMask: `radial-gradient(farthest-side, transparent calc(100% - 10px), #000 0)`,
        }}
      ></div>
    </div>
  );
};

export default Loader;
