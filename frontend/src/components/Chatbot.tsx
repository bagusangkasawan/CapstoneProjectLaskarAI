import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { GenerateRequestPayload, GenerateResponseData } from "@/data/models";
import { generateResponse } from "@/data/chatbot-api-source";
import { Send } from "lucide-react";

interface Message {
  from: "user" | "bot";
  text: string;
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    { from: "bot", text: "Halo! Saya EnergyMate Bot. Bagaimana saya bisa membantu Anda hari ini?" }
  ]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMessage: Message = { from: "user", text: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const payload: GenerateRequestPayload = { user_input: trimmed };
      const response: GenerateResponseData = await generateResponse(payload);

      const botMessage: Message = { from: "bot", text: response.response };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      const errorMessage: Message = { from: "bot", text: "Maaf, terjadi kesalahan dalam memproses permintaan Anda." };
      setMessages((prev) => [...prev, errorMessage]);
      console.error("API error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div>
      <Card className="flex flex-col shadow-md h-full">
        <CardContent className="flex-1 flex flex-col p-4 space-y-4">
        <ScrollArea className="flex-1 pr-4 space-y-2">
          <div className="flex flex-col space-y-2">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-xl whitespace-pre-line break-words ${
                  msg.from === "user"
                    ? "bg-blue-100 self-end text-right"
                    : "bg-gray-200 self-start text-left"
                } max-w-[75%]`}
              >
                {msg.text}
              </div>
            ))}
          </div>
        </ScrollArea>

          <div className="flex space-x-2 pt-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Tulis pesan Anda..."
              className="flex-1"
              disabled={loading}
            />
            <Button onClick={handleSend} disabled={loading} className="cursor-pointer">
              <Send/> {loading ? "Tunggu sebentar ya..." : "Kirim"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}