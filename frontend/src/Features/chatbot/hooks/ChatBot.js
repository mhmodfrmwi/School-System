import { useState, useRef, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { sendMessage } from "../services/apiChatBot";

export const useChat = (userId) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const isArabicPreferred = /ar/.test(navigator.language);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const formatMessage = (content) => {
    if (typeof content === "string") return content;
    try {
      return JSON.stringify(content);
    } catch {
      return isArabicPreferred
        ? "رسالة غير قابلة للعرض"
        : "Unrenderable message";
    }
  };

  const mutation = useMutation({
    mutationFn: ({ message }) => sendMessage({ message, userId }),
    onMutate: (variables) => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "user",
          text: formatMessage(variables.message),
        },
      ]);
      setInput("");
    },
    onSuccess: (reply) => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: formatMessage(reply),
        },
      ]);
    },
    onError: (error) => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text:
            error.message ||
            (isArabicPreferred
              ? "حدث خطأ. الرجاء المحاولة لاحقًا"
              : "An error occurred. Please try again"),
        },
      ]);
    },
  });

  const localizedText = {
    placeholder: isArabicPreferred
      ? "اسأل عن جدولك الدراسي..."
      : "Ask about your schedule...",
    buttonText: isArabicPreferred ? "إرسال" : "Send",
    thinkingText: isArabicPreferred ? "جاري التفكير..." : "Thinking...",
    chatButton: isArabicPreferred ? "محادثة" : "Chat",
    title: isArabicPreferred ? "المساعد الدراسي" : "Study Assistant",
  };

  return {
    messages,
    input,
    setInput,
    isChatOpen,
    setIsChatOpen,
    messagesEndRef,
    isLoading: mutation.isLoading,
    localizedText,
    sendMessage: mutation.mutate,
  };
};
