import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { GenerateRequestPayload, GenerateResponseData } from "@/data/models";
import { generateResponse } from "@/data/chatbot-api-source";
import { Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { v4 as uuidv4 } from 'uuid';

interface Message {
  id: string;
  from: "user" | "bot";
  text: string;
  timestamp: string;
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>(() => {
    const stored = sessionStorage.getItem("chatbot-messages");
    if (stored) {
      return JSON.parse(stored);
    }
    // Initial message if no session storage exists
    return [{
      id: uuidv4(),
      from: "bot",
      text: "Halo! Saya EnergyMate Bot, Bagaimana saya bisa membantu Anda hari ini?",
      timestamp: new Date().toISOString(),
    }];
  });
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  useEffect(() => {
    sessionStorage.setItem("chatbot-messages", JSON.stringify(messages));
  }, [messages]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [messages, loading]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMessage: Message = { 
      id: uuidv4(),
      from: "user", 
      text: trimmed,
      timestamp: new Date().toISOString()
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const payload: GenerateRequestPayload = { user_input: trimmed };
      const response: GenerateResponseData = await generateResponse(payload);

      const botMessage: Message = { 
        id: uuidv4(),
        from: "bot", 
        text: response.response,
        timestamp: new Date().toISOString()
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      const errorMessage: Message = { 
        id: uuidv4(),
        from: "bot", 
        text: "Maaf, terjadi kesalahan dalam memproses permintaan Anda.",
        timestamp: new Date().toISOString()
      };
      setMessages((prev) => [...prev, errorMessage]);
      console.error("API error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 overflow-y-auto px-4 pt-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((msg, idx) => {
            const currentDate = new Date(msg.timestamp);
            const showDate = idx === 0 || 
              new Date(messages[idx-1].timestamp).toDateString() !== 
              currentDate.toDateString();

            return (
              <div key={msg.id} className="space-y-1">
                {showDate && (
                  <div className="flex justify-center my-4">
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {currentDate.toLocaleDateString([], {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long'
                      })}
                    </span>
                  </div>
                )}
                
                <div className={`flex gap-3 ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.from === "bot" && (
                    <Avatar className="flex-shrink-0 w-8 h-8">
                      <AvatarImage src="/energy-bot.jpg"/>
                      <AvatarFallback className="bg-gray-300 text-gray-800">EM</AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div className="flex flex-col max-w-[80%]">
                    <div className={`mt-1 p-3 rounded-xl whitespace-pre-line break-words ${
                      msg.from === "user"
                        ? "bg-green-500 text-white rounded-tr-none"
                        : "bg-gray-100 text-gray-800 rounded-tl-none"
                    }`}>
                      {msg.text}
                    </div>
                    <span className={`text-xs text-gray-500 mt-1 ${
                      msg.from === "user" ? "text-right" : "text-left"
                    }`}>
                      {formatTime(msg.timestamp)}
                    </span>
                  </div>
                  
                  {msg.from === "user" && (
                    <Avatar className="flex-shrink-0 w-8 h-8">
                      <AvatarImage src="/user.png" />
                      <AvatarFallback className="bg-green-600 text-white">YO</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              </div>
            );
          })}
          
          {loading && (
            <div className="flex gap-3">
              <Avatar className="flex-shrink-0 w-8 h-8">
                <AvatarImage src="/energy-bot.jpg" />
                <AvatarFallback className="bg-gray-300">EM</AvatarFallback>
              </Avatar>
              <div className="bg-gray-100 text-gray-800 p-3 rounded-xl rounded-tl-none max-w-[80%]">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-100"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="border-t p-4 bg-white shrink-0">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Tulis pesan Anda..."
            className="flex-1"
            disabled={loading}
          />
          <Button 
            onClick={handleSend} 
            disabled={loading}
            className="cursor-pointer"
          >
            <Send className="w-4 h-4" /> Kirim
          </Button>
        </div>
      </div>
    </div>
  );
}