import React from "react";
import "./Message.css";

interface MessageProps {
  type: "loading" | "error";
  message?: string | string[];
}

const Message: React.FC<MessageProps> = ({ type, message }) => {
  if (type === "loading") {
    return <div className={`message ${type}-message`}>Načítavam...</div>;
  }

  const messages = Array.isArray(message) ? message : message ? [message] : [];

  return (
    <div className={`message ${type}-message`}>
      {messages.map((msg, index) => (
        <div key={index}>
          {type === "error" && (
            <strong className="error-message-title">Chyba:</strong>
          )}
          <div>{msg}</div>
        </div>
      ))}
    </div>
  );
};

export default Message;
