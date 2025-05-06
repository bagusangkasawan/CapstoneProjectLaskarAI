import { useState } from "react";
import Chatbot from "./Chatbot";
import { BotMessageSquare, X } from "lucide-react";

export default function ChatbotLauncher() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
        {!isOpen && (
            <button
                onClick={() => setIsOpen(true)}
                className="w-24 h-24 fixed bottom-10 right-10 rounded-full p-4 bg-green-600 text-white shadow-lg hover:bg-green-700 cursor-pointer flex items-center justify-center"
                >
                <BotMessageSquare size="40"/>
            </button>
        )}
        
        {isOpen && (
            <div className="fixed bottom-10 right-10 z-50 w-[500px] max-h-[80vh] flex flex-col bg-white border rounded-2xl shadow-2xl overflow-hidden">
                <div className="flex justify-between items-center p-3 border-b">
                    <span className="font-semibold text-gray-700">EnergyMate Chatbot</span>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-gray-500 hover:text-gray-700 cursor-pointer"
                    >
                        <X size={18}/>
                    </button>
                </div>
                <div className="flex-1 overflow-hidden">
                    <Chatbot />
                </div>
            </div>
        )}
        </>
    );
}