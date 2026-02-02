import Header from "@/components/layout/Header";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Loader2 } from "lucide-react";

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const AI_RESPONSES: Record<string, string> = {
  салом: "Салом! Ман ёрии тарҷума ҳастам. Чӣ гуна метавонам кумак кунам?",
  "салом алейкум":
    "Алейкум ассалому ва раҳмату-ллӣ! Бисёр хушҳолам, ки шумо дар ин ҷо ҳастед.",
  "номи ту чист":
    "Ман ёрии ҳушманди тоҷикӣ ҳастам. Ман метавонам шуморо дар тарҷума ва омӯзиши забонҳо кумак кунам.",
  "чӣ гуна тарҷума кунам":
    "Барои тарҷума: 1. Ба саҳифаи 'Тарҷума кун' равед 2. Матни худро дар қуттии сеҳ бишинед 3. Забонҳои манбаъ ва мақсадро интихоб кунед 4. Ба дугмаи 'Тарҷума кун' зер кунед",
  "луғат чист":
    "Луғати мо шомили таъриифот, муродифот ва намунаҳо барои ҳазораҳо калима аст. Шумо метавонед калимаҳоро ҷустуҷу кунед, то маъноҳои онҳоро омӯзед.",
  default:
    "Афсӯс, ман наметавонистам фахм кунам. Лутфан саволи худро дубора ҳол кунед ё аз менюи асосӣ истифода баред.",
};

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content:
        "Салом! Ман ёрии ҳушманди тоҷикӣ ҳастам. Чӣ гуна метавонам кумак кунам?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate AI response delay
    setTimeout(() => {
      const normalizedInput = inputValue.trim().toLowerCase();
      const response = AI_RESPONSES[normalizedInput] || AI_RESPONSES["default"];
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full p-4">
        {/* Chat Container */}
        <div className="flex-1 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-3 rounded-lg ${
                    message.type === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-gray-100 text-gray-900 rounded-bl-none"
                  }`}
                >
                  <p className="text-sm md:text-base">{message.content}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString("fa-IR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-900 px-4 py-3 rounded-lg rounded-bl-none">
                  <Loader2 className="h-5 w-5 animate-spin" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Пайғоми худро бишинед..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Button
                onClick={handleSendMessage}
                disabled={isLoading || !inputValue.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                <Send size={20} />
              </Button>
            </div>
          </div>
        </div>

        {/* Suggestions */}
        <div className="mt-6 bg-white rounded-lg shadow p-6 border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-3">Саволҳои маъмул:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {[
              "Чӣ гуна тарҷума кунам",
              "Луғат чист",
              "Номи ту чист",
              "Салом",
            ].map((question) => (
              <button
                key={question}
                onClick={() => setInputValue(question)}
                className="text-left px-4 py-2 text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition text-sm"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
