import React from "react";
import "./style.css";
import { Spin } from "antd";

function Button({ text, onClick, blue, disabled, type = "button" , style}) {
  return (
    <div className="btn-parent">
      {" "}
      <button
        style={style}
        className={blue ? "button button-blue" : "button"}
        onClick={onClick}
        disabled={disabled}
        type={type}
      >
        {disabled ? (
          <>
            <Spin
              size="medium"
              className={blue ? "white-loader" : "blue-loader"} // Apply the loader class conditionally
            />
            &nbsp; {text}
          </>
        ) : (
          text
        )}
      </button>
    </div>
  );
}

export default Button;
