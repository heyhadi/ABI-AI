import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FiSend } from "react-icons/fi";
import { VscCircleFilled } from "react-icons/vsc";
import androidLogoUrl from "./assets/ai.svg";

const App = () => {
    const [inputValue, setInputValue] = useState("");
    const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);
    const [loading, setLoading] = useState(false);
    const messageListRef = useRef<HTMLDivElement>(null);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    useEffect(() => {
        setMessages([{ text: "Hi, I am Abi your bot Buddy created by @heyhadi using openai API, How can I help you?", isUser: false }]);
    }, []);

    useEffect(() => {
        if (messageListRef.current) {
            messageListRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!inputValue.trim()) return;

        setLoading(true);
        setMessages([...messages, { text: inputValue, isUser: true }]);
        setInputValue("");

        try {
            const response = await axios.post("https://abi-ai.onrender.com/chat", { body: inputValue });

            setMessages([...messages, { text: inputValue, isUser: true }, { text: response.data.bot, isUser: false }]);

            setLoading(false);
            console.log(messages);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    return (
        <div className="h-screen flex flex-col justify-between bg-gray-100">
            <div className=" bg-white shadow" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1 }}>
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
                    <img src={androidLogoUrl} alt="Android Logo" className="h-6 mr-2" />
                    <span className="font-medium text-gray-900">ABI AI</span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-6 mt-12">
                <div className="flex flex-col space-y-4">
                    {messages.map((message, index) => (
                        <div key={index} className={`flex flex-col ${message.isUser ? "items-end" : "items-start"}`} ref={messageListRef}>
                            <div className={`flex items-center ${message.isUser ? "flex-row-reverse" : ""} space-x-2`}>
                                <div className={`${message.isUser ? " bg-green-300 text-white" : "bg-blue-200  text-white"} w-8 h-8 rounded-full flex items-center justify-center`}>
                                    <VscCircleFilled className="transform rotate-45" />
                                </div>
                                <div className={`text-sm text-gray-600 ml-2 font-black ${message.isUser ? "pr-2" : ""}`}>{message.isUser ? "You" : "AI"}</div>
                            </div>
                            <div className={`flex flex-col p-2 rounded-lg max-w-md mt-2 ${message.isUser ? "bg-green-500 text-white ml-4" : "bg-gray-200 text-gray-700"}`}>
                                <div className="text-sm">{message.text}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <form onSubmit={handleFormSubmit}>
                <div className="flex items-center px-4 py-2">
                    <input type="text" value={inputValue} onChange={handleInputChange} placeholder="Type your message here" className="flex-1 border-gray-300 border-2 rounded-full py-2 px-4 mr-2" />
                    <button type="submit" className="bg-blue-500 w-11 h-11 text-white rounded-full p-2 flex items-center justify-center">
                        {loading ? (
                            <svg className={`animate-spin h-6 w-6 text-white ${loading ? "opacity-100" : "opacity-0"}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M6 12h2l2 8L14 4l2 8h2" />
                            </svg>
                        ) : (
                            <FiSend />
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default App;
