import React from "react";
import "./Input.css";

interface InputProps {
  id: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;

  className?: string;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  id,
  type,
  value,
  onChange,
  placeholder,

  className = "",
  disabled = false,
}) => {
  return (
    <div className={`input-container ${className}`}>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
      />
    </div>
  );
};

export default Input;
