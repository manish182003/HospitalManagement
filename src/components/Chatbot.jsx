import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaComments, FaStethoscope } from "react-icons/fa";
import "./Chatbot.css";

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  // Close chatbot when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const toggleChatbot = () => {
    setIsOpen((prev) => !prev);
    if (!isOpen && messages.length === 0) {
      setMessages([
        {
          from: "bot",
          text: "👋 Hello! I can help you with hospital services.",
          isButton: false,
          isGreeting: true,
        },
        { from: "bot", text: "How can I book an appointment?", isButton: true },
        { from: "bot", text: "How can you help me?", isButton: true },
        { from: "bot", text: "Suggest me some doctors", isButton: true },
      ]);
    }
  };

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { from: "user", text }]);
    setMessages((prev) => prev.filter(msg => !msg.isButton));

    try {
      const res = await axios.post("http://localhost:5000/chat", { message: text });
      const botReply = res.data?.response || "No response from server.";
      setMessages((prev) => [...prev, { from: "bot", text: botReply }]);
    } catch (error) {
      setMessages((prev) => [...prev, { from: "bot", text: "⚠️ Unable to connect to the server." }]);
    }
    setInput("");
  };

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const renderTextWithLinks = (text) => {
    const linkRegex = /\[([^\]]+)\]\((\/[^\)]+)\)/g;

    const renderLine = (line, index) => {
      const parts = [];
      let lastIndex = 0;
      let match;

      while ((match = linkRegex.exec(line)) !== null) {
        if (match.index > lastIndex) {
          parts.push(line.substring(lastIndex, match.index));
        }

        const linkText = match[1];
        const linkUrl = match[2];

        parts.push(
          <span
            key={`link-${index}-${lastIndex}`}
            onClick={() => navigate(linkUrl)}
            style={{
              color: "#059669",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            {linkText}
          </span>
        );

        lastIndex = linkRegex.lastIndex;
      }

      if (lastIndex < line.length) {
        parts.push(line.substring(lastIndex));
      }

      return parts.map((part, i) =>
        typeof part === "string" ? <span key={`text-${index}-${i}`}>{part}</span> : part
      );
    };

    const lines = text.split("\n");
    return lines.map((line, index) => (
      <React.Fragment key={index}>
        {renderLine(line, index)}
        {index < lines.length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <>
      {!isOpen && (
        <div className="chatbot-floating-greeting">
          👋 I can help you!
        </div>
      )}

      <div className="chatbot-button" onClick={toggleChatbot} title="Chat with us">
        <FaComments />
      </div>

      {isOpen && (
        <div className="chatbot-container" ref={containerRef}>
          <div className="chatbot-header">
            <FaStethoscope style={{ marginRight: 8 }} />
            Hospital Chatbot
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`message ${msg.from} ${msg.isGreeting ? "greeting" : ""}`}
                style={{
                  alignSelf: msg.from === "user" ? "flex-end" : "flex-start",
                  backgroundColor: msg.isGreeting
                    ? "#fef3c7"
                    : msg.from === "user"
                    ? "#dbeafe"
                    : "#e6fffa",
                  color: msg.isGreeting
                    ? "#92400e"
                    : msg.from === "user"
                    ? "#1e3a8a"
                    : "#065f46",
                  fontWeight: "600",
                  borderRadius: msg.isButton ? "8px" : "12px",
                  maxWidth: "75%",
                  padding: "10px 14px",
                  marginBottom: "6px",
                  cursor: msg.isButton ? "pointer" : "default",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                  fontStyle: "normal",
                  fontSize: msg.isGreeting ? "0.9rem" : "0.95rem",
                }}
                onClick={() => msg.isButton && sendMessage(msg.text)}
              >
                {msg.from === "bot" ? renderTextWithLinks(msg.text) : msg.text}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
              placeholder="Type a message..."
            />
            <button onClick={() => sendMessage(input)}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbot;
