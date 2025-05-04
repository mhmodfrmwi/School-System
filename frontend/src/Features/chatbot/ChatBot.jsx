import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useChat } from "./hooks/ChatBot";
import { useTranslation } from "react-i18next";

const Message = ({ sender, text, role }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const colors = {
    student: {
      user: "bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] text-white",
      bot: "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white",
    },
    parent: {
      user: "bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] text-white",
      bot: "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white",
    },
    default: {
      user: "bg-gradient-to-r from-[#117C90] to-[#0D5665] text-white",
      bot: "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white",
    },
  };

  const roleColors = colors[role] || colors.default;

  return (
    <div className={`mb-4 ${sender === "user" ? "text-right" : "text-left"}`}>
      <div
        className={`text-xs font-medium text-gray-500 dark:text-gray-400 ${isRTL ? "text-right" : "text-left"}`}
      >
        {sender === "user" ? t("chatbot.sender.user") : t("chatbot.sender.bot")}
      </div>
      <div
        className={`inline-block max-w-[80%] whitespace-pre-wrap break-words rounded-xl px-5 py-3 text-base ${
          sender === "user"
            ? `${roleColors.user} ${isRTL ? "rounded-bl-none" : "rounded-br-none"}`
            : `${roleColors.bot} ${isRTL ? "rounded-br-none" : "rounded-bl-none"}`
        }`}
        dir={isRTL ? "rtl" : "ltr"}
      >
        {text}
      </div>
    </div>
  );
};

const LoadingIndicator = ({ text, role }) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const colors = {
    student: "bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB]",
    parent: "bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB]",
    default: "bg-gradient-to-r from-[#117C90] to-[#0D5665]",
  };

  const bgColor = colors[role] || colors.default;

  return (
    <div className="mb-4 flex justify-start">
      <div
        className={`inline-block max-w-[80%] rounded-xl ${
          isRTL ? "rounded-br-none" : "rounded-bl-none"
        } px-5 py-3 text-base text-white ${bgColor} whitespace-pre-wrap break-words`}
        dir="rtl"
      >
        {text}
      </div>
    </div>
  );
};

const ChatInput = ({
  input,
  setInput,
  sendMessage,
  isLoading,
  placeholder,
  buttonText,
  role,
}) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const [showInputTooltip, setShowInputTooltip] = useState(false);
  const [showButtonTooltip, setShowButtonTooltip] = useState(false);
  const isEmpty = !input.trim();

  const colors = {
    student: {
      button: "bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB]",
      focus: "focus:ring-purple-500",
      hover: "from-[#FD813D]/90 via-[#CF72C0]/90 to-[#BC6FFB]/90",
    },
    parent: {
      button: "bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB]",
      focus: "focus:ring-purple-500",
      hover: "from-[#FD813D]/90 via-[#CF72C0]/90 to-[#BC6FFB]/90",
    },
    default: {
      button: "bg-gradient-to-r from-[#117C90] to-[#0D5665]",
      focus: "focus:ring-blue-500",
      hover: "from-[#117C90]/90 to-[#0D5665]/90",
    },
  };

  const roleStyles = colors[role] || colors.default;
  const isDisabled = isLoading || isEmpty;

  const handleSendMessage = () => {
    if (!isEmpty) {
      sendMessage({ message: input });
      setInput("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="relative mt-4 flex gap-3">
      <div
        className="relative flex-1"
        onMouseEnter={() => setShowInputTooltip(true)}
        onMouseLeave={() => setShowInputTooltip(false)}
      >
        <input
          className={`w-full rounded-xl border border-gray-300 bg-white px-5 py-3 text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white ${
            roleStyles.focus
          } ${isDisabled ? "opacity-70" : ""}`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={isLoading}
          dir={isRTL ? "rtl" : "ltr"}
        />
        {showInputTooltip && isEmpty && (
          <div
            className={`absolute ${isRTL ? "right-0" : "left-0"} -top-14 z-10 rounded bg-gray-800 px-3 py-2 text-sm text-white shadow-lg dark:bg-gray-600`}
          >
            {t("chatbot.inputTooltip")}
          </div>
        )}
      </div>

      <div
        className="relative"
        onMouseEnter={() => setShowButtonTooltip(true)}
        onMouseLeave={() => setShowButtonTooltip(false)}
      >
        <button
          className={`relative rounded-xl px-5 py-3 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            roleStyles.button
          } ${
            isDisabled
              ? "cursor-not-allowed opacity-50"
              : `hover:opacity-90 ${roleStyles.hover}`
          } ${roleStyles.focus}`}
          onClick={handleSendMessage}
          disabled={isDisabled}
        >
          {buttonText}
        </button>
        {showButtonTooltip && isEmpty && (
          <div
            className={`absolute ${isRTL ? "left-0" : "right-0"} -top-20 z-10 rounded bg-gray-800 px-3 py-2 text-sm text-white shadow-lg dark:bg-gray-600`}
          >
            {t("chatbot.buttonTooltip")}
          </div>
        )}
      </div>
    </div>
  );
};

export const ChatBot = () => {
  const { _id: userId, role } = useSelector((state) => state.login);
  const {
    messages,
    input,
    setInput,
    isChatOpen,
    setIsChatOpen,
    messagesEndRef,
    isLoading,
    localizedText,
    sendMessage,
  } = useChat(userId);
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const headerColors = {
    student: "bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB]",
    parent: "bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB]",
    default: "bg-gradient-to-r from-[#117C90] to-[#0D5665]",
  };

  const headerColor = headerColors[role] || headerColors.default;

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading, messagesEndRef]);

  if (!isChatOpen) {
    return (
      <button
        onClick={() => setIsChatOpen(true)}
        className={`fixed bottom-6 ${isRTL ? "left-10" : "right-10"} z-[1000] flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 ${headerColor}`}
      >
        <div className="relative h-10 w-10">
          <div className={`absolute inset-0 rounded-full ${headerColor}`}></div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          <div
            className={`absolute inset-0 animate-ping rounded-full opacity-75 ${headerColor}`}
          ></div>
        </div>
      </button>
    );
  }

  return (
    <>
      <div
        className="dark fixed inset-0 z-[999] bg-black/70 backdrop-blur-sm dark:bg-white/70"
        onClick={() => setIsChatOpen(false)}
      ></div>

      <button
        onClick={() => setIsChatOpen(false)}
        className={`fixed bottom-6 ${isRTL ? "left-10" : "right-10"} z-[1001] flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 ${headerColor}`}
      >
        <div className="relative h-10 w-10">
          <div className={`absolute inset-0 rounded-full ${headerColor}`}></div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          <div
            className={`absolute inset-0 animate-ping rounded-full opacity-75 ${headerColor}`}
          ></div>
        </div>
      </button>

      <div
        className="fixed left-1/2 top-1/2 z-[1001] h-[80vh] w-[80vw] max-w-4xl -translate-x-1/2 -translate-y-1/2 transform rounded-xl border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-800"
        dir={isRTL ? "rtl" : "ltr"}
      >
        <div
          className={`flex items-center justify-between rounded-t-xl px-6 py-4 text-white ${headerColor}`}
        >
          <h3 className="text-lg font-medium">{localizedText.title}</h3>
          <button
            onClick={() => setIsChatOpen(false)}
            className="rounded-full p-1 text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div className="h-[calc(100%-120px)] overflow-y-auto bg-gray-50 p-6 dark:bg-gray-700">
          {messages.length === 0 && !isLoading ? (
            <Message
              sender="bot"
              text={localizedText.welcomeMessage}
              role={role}
            />
          ) : (
            messages.map((msg, i) => (
              <Message
                key={i}
                sender={msg.sender}
                text={msg.text}
                role={role}
              />
            ))
          )}
          {isLoading && (
            <LoadingIndicator text={localizedText.thinkingText} role={role} />
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="border-t border-gray-200 bg-white p-4 dark:border-gray-600 dark:bg-gray-800">
          <ChatInput
            input={input}
            setInput={setInput}
            sendMessage={sendMessage}
            isLoading={isLoading}
            placeholder={localizedText.placeholder}
            buttonText={localizedText.buttonText}
            role={role}
          />
        </div>
      </div>
    </>
  );
};

export default ChatBot;
