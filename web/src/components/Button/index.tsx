import * as React from 'react';
import './index.css';

interface ButtonProps {
  label?: string
  type?: 'submit' | 'reset' | 'button';
  handdleClick?: (event: React.MouseEvent) => void
}

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <>
      <button
        type={props.type}
        onClick={props.handdleClick}
      >
        {props.label}
      </button>
    </>
  );
}

export default Button;