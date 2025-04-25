import { useSelector } from "react-redux";
import { useChat } from "./hooks/ChatBot";

const Message = ({ sender, text, role }) => {
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
    <div className={`mb-3 ${sender === "user" ? "text-right" : "text-left"}`}>
      <span
        className={`inline-block max-w-xs rounded-lg px-4 py-2 text-sm ${
          sender === "user"
            ? `${roleColors.user} rounded-br-none`
            : `${roleColors.bot} rounded-bl-none`
        }`}
      >
        {text}
      </span>
    </div>
  );
};

const LoadingIndicator = ({ text, role }) => {
  const colors = {
    student: "bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB]",
    parent: "bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB]",
    default: "bg-gradient-to-r from-[#117C90] to-[#0D5665]",
  };

  const bgColor = colors[role] || colors.default;

  return (
    <div className="mb-3 flex justify-start">
      <span
        className={`inline-block rounded-lg rounded-bl-none px-4 py-2 text-sm text-white ${bgColor}`}
      >
        {text}
      </span>
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
  const colors = {
    student: {
      button: "bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB]",
      focus: "focus:ring-purple-500",
    },
    parent: {
      button: "bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB]",
      focus: "focus:ring-purple-500",
    },
    default: {
      button: "bg-gradient-to-r from-[#117C90] to-[#0D5665]",
      focus: "focus:ring-blue-500",
    },
  };

  const roleStyles = colors[role] || colors.default;

  return (
    <div className="mt-2 flex gap-2">
      <input
        className={`flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white ${roleStyles.focus}`}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) =>
          e.key === "Enter" && !e.shiftKey && sendMessage({ message: input })
        }
        placeholder={placeholder}
        disabled={isLoading}
      />
      <button
        className={`rounded-lg px-4 py-2 text-sm font-medium text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 ${roleStyles.button} ${roleStyles.focus}`}
        onClick={() => sendMessage({ message: input })}
        disabled={isLoading}
      >
        {buttonText}
      </button>
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

  const headerColors = {
    student: "bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB]",
    parent: "bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB]",
    default: "bg-gradient-to-r from-[#117C90] to-[#0D5665]",
  };

  const headerColor = headerColors[role] || headerColors.default;

  if (!isChatOpen) {
    return (
      <button
        onClick={() => setIsChatOpen(true)}
        className={`fixed bottom-6 right-10 flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 ${headerColor} ${
          role === "student" || role === "parent"
            ? "focus:ring-purple-500"
            : "focus:ring-blue-500"
        }`}
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
    <div className="fixed bottom-6 right-6 z-[1000] w-80 rounded-xl bg-white shadow-xl dark:bg-gray-800">
      <div
        className={`flex items-center justify-between rounded-t-xl px-4 py-3 text-white ${headerColor}`}
      >
        <h3 className="text-sm font-medium">{localizedText.title}</h3>
        <button
          onClick={() => setIsChatOpen(false)}
          className="rounded-full p-1 text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
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
      <div className="h-64 overflow-y-auto p-4 dark:bg-gray-700">
        {messages.length === 0 && !isLoading ? (
          <Message sender="bot" text="How can I help you today?" role={role} />
        ) : (
          messages.map((msg, i) => (
            <Message key={i} sender={msg.sender} text={msg.text} role={role} />
          ))
        )}
        {isLoading && (
          <LoadingIndicator text={localizedText.thinkingText} role={role} />
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="border-t p-3 dark:border-gray-600 dark:bg-gray-800">
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
  );
};

export default ChatBot;
