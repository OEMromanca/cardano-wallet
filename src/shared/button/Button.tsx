import React from "react";
import "./Button.css";

interface ButtonProps {
  onClick: () => void;
  variant?: "primary" | "secondary" | "tertiary" | "text-only";
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  variant = "primary",
  children,
  className = "",
  disabled = false,
}) => {
  const buttonClass = `btn ${variant} ${className}`;

  return (
    <button onClick={onClick} className={buttonClass} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
