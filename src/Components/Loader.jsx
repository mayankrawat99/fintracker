import React from "react";

function Loader() {
  // Define inline styles
  const wrapperStyle = {
    backgroundColor: "#fff",
    position: "fixed",
    width: "100vw",
    height: "90vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000, // Ensure the loader appears on top of other content
  };

  const ldsRippleStyle = {
    display: "inline-block",
    position: "relative",
    width: "80px",
    height: "80px",
  };

  const rippleDivStyle = (delay) => ({
    position: "absolute",
    border: "4px solid var(--theme)", // Use your theme variable
    opacity: 1,
    borderRadius: "50%",
    animation: "lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite",
    animationDelay: delay,
  });

  // Keyframes for animation
  const keyframes = `
    @keyframes lds-ripple {
      0% {
        top: 36px;
        left: 36px;
        width: 0;
        height: 0;
        opacity: 0;
      }
      4.9% {
        top: 36px;
        left: 36px;
        width: 0;
        height: 0;
        opacity: 0;
      }
      5% {
        top: 36px;
        left: 36px;
        width: 0;
        height: 0;
        opacity: 1;
      }
      100% {
        top: 0;
        left: 0;
        width: 72px;
        height: 72px;
        opacity: 0;
      }
    }
  `;

  // Append keyframes to the document
  React.useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = keyframes;
    document.head.appendChild(styleSheet);
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  return (
    <div style={wrapperStyle}>
      <div style={ldsRippleStyle}>
        <div style={rippleDivStyle("0s")}></div>
        <div style={rippleDivStyle("-0.5s")}></div>
      </div>
    </div>
  );
}

export default Loader;
