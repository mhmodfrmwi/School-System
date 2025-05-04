import { useState, useRef, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { sendMessage } from "../services/apiChatBot";
import { useTranslation } from "react-i18next";

export const useChat = (userId) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const formatMessage = (content) => {
    if (typeof content === "string") return content;
    try {
      return JSON.stringify(content);
    } catch {
      return t("chatbot.unrenderableMessage");
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
          text: error.message || t("chatbot.errorMessage"),
        },
      ]);
    },
  });

  const localizedText = {
    placeholder: t("chatbot.placeholder"),
    buttonText: t("chatbot.buttonText"),
    thinkingText: t("chatbot.thinkingText"),
    title: t("chatbot.title"),
    welcomeMessage: t("chatbot.welcomeMessage"),
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
