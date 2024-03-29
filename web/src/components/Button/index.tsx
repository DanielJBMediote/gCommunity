import * as React from "react";
import "./index.scss";

interface ButtonProps {
  className?: string;
  label?: string;
  type?: "submit" | "reset" | "button";
  handdleClick?: (event: React.MouseEvent) => void;
}

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <>
      <button
        className={`mainBtn ${props.className}`}
        type={props.type}
        onClick={props.handdleClick}
      >
        {props.label}
      </button>
    </>
  );
};

export default Button;
