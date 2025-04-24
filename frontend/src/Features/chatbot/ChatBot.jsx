import { useState, useRef, useEffect } from "react";
import axios from "axios";

function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Add token to a request interceptor to avoid repetition
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YTc4MDNjNmU3YjkzZWUwZmJmOTlhNSIsImVtYWlsIjoiYWhtZWRAZ21haWwuY29tIiwicm9sZSI6InN0dWRlbnQiLCJjbGFzc0lkIjoiNjdhNzgwMDE2ZTdiOTNlZTBmYmY5OTlhIiwiaWF0IjoxNzQ1NTEwNTA0LCJleHAiOjE3NDU1OTY5MDR9.Q-y27pkuF2MKaWc3Cff4iGyVNd0Hr474PRqtG35b0_Q";

    try {
      // Create request with timeout to prevent long waits
      const res = await axios.post(
        "http://localhost:5000/api/chat",
        {
          message: input,
          userId: "67a7803c6e7b93ee0fbf99a5",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          timeout: 10000, // 10 second timeout
        },
      );

      const botMessage = { sender: "bot", text: res.data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
      // Check if the message is in Arabic to determine error language
      const isArabic = /[\u0600-\u06FF]/.test(input);
      const errorMessage = {
        sender: "bot",
        text: isArabic
          ? "عذرًا، حدث خطأ. يرجى المحاولة مرة أخرى لاحقًا."
          : "Sorry, an error occurred. Please try again later.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Get placeholder text based on language preference in browser
  const getPlaceholder = () => {
    const isArabicPreferred = /ar/.test(navigator.language);
    return isArabicPreferred
      ? "اسأل عن جدولك الدراسي..."
      : "Ask about your schedule...";
  };

  // Get button text based on language preference
  const getButtonText = () => {
    const isArabicPreferred = /ar/.test(navigator.language);
    return isArabicPreferred ? "إرسال" : "Send";
  };

  return (
    <div className="mx-auto w-full max-w-md rounded bg-white p-4 shadow">
      <div className="mb-2 h-64 overflow-y-auto border p-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`mb-2 ${msg.sender === "user" ? "text-right" : "text-left"}`}
          >
            <span
              className={`inline-block rounded p-2 ${
                msg.sender === "user" ? "bg-blue-200" : "bg-gray-200"
              }`}
            >
              {msg.text}
            </span>
          </div>
        ))}
        {isLoading && (
          <div className="text-left">
            <span className="inline-block animate-pulse rounded bg-gray-200 p-2">
              {/[\u0600-\u06FF]/.test(input)
                ? "جاري التفكير..."
                : "Thinking..."}
            </span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 rounded border p-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
          placeholder={getPlaceholder()}
          disabled={isLoading}
        />
        <button
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:bg-blue-300"
          onClick={sendMessage}
          disabled={isLoading}
        >
          {getButtonText()}
        </button>
      </div>
    </div>
  );
}

export default ChatBot;
