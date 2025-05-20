import { useState } from "react";
import Chatbot from "./Chatbot";
import { BotMessageSquare, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function ChatbotLauncher() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
        {!isOpen && (
            <button
                onClick={() => setIsOpen(true)}
                className="w-16 h-16 md:w-24 md:h-24 fixed bottom-6 right-6 rounded-full p-3 md:p-4 bg-green-600 text-white shadow-lg hover:bg-green-700 cursor-pointer flex items-center justify-center"
            >
                <BotMessageSquare className="w-6 h-6 md:w-10 md:h-10" />
            </button>
        )}
        
        {isOpen && (
            <div className="fixed inset-0 md:bottom-10 md:right-10 md:inset-auto z-50 w-full h-full md:w-[500px] md:max-h-[80vh] flex flex-col bg-white border md:rounded-2xl shadow-2xl">
                {/* Header */}
                <div className="flex justify-between items-center p-3 border-b">
                <div className="px-1 flex items-center space-x-3">
                    <Avatar>
                    <AvatarImage src="/energy-bot.jpg" />
                    <AvatarFallback className="bg-green-500 text-white">EM</AvatarFallback>
                    </Avatar>
                    <div>
                    <h2 className="font-semibold">EnergyMate Bot</h2>
                    <p className="text-xs text-gray-500">Online</p>
                    </div>
                </div>
                <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                    <X size={30} />
                </button>
                </div>

                {/* Chat content */}
                <div className="flex-1 overflow-hidden">
                <Chatbot />
                </div>
            </div>
            )}
        </>
    );
}