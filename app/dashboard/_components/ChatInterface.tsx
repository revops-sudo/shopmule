// app/dashboard/_components/ChatInterface.tsx

"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('Current messages:', messages);
  }, [messages]);

  const triggerAnalysis = async (productName: string) => {
    console.log('Triggering analysis for:', productName);
    try {
      const response = await axios.post("/api/analysis/start", { productName });
      console.log('Analysis response:', response.data);
      const { taskId } = response.data;
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "assistant",
          content: `Analysis started for "${productName}". Task ID: ${taskId}`,
        },
      ]);
    } catch (error) {
      console.error("Error starting analysis:", error);
      if (error instanceof Error) {
        console.error("Error details:", (error as any).response?.data || error.message);
      }
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "assistant",
          content: "Sorry, there was an error starting the analysis. Please try again.",
        },
      ]);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    console.log('Sending message:', input);
    const userMessage: Message = { role: "user", content: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");
    setLoading(true);

    try {
      console.log('Sending request to /api/chat');
      const response = await axios.post("/api/chat", {
        messages: [...messages, userMessage],
      });
      console.log('Chat API response:', response.data);

      const assistantMessage: Message = {
        role: "assistant",
        content: response.data.reply,
      };

      setMessages((prevMessages) => [...prevMessages, assistantMessage]);

      console.log('Checking for product selection');
      // Check the entire conversation for a product selection
      const fullConversation = [...messages, userMessage, assistantMessage];
      const productSelectionMessage = fullConversation.find(msg => 
        msg.role === 'assistant' && msg.content.includes("You've selected")
      );

      if (productSelectionMessage) {
        console.log('Product selection detected');
        const productNameMatch = productSelectionMessage.content.match(/"([^"]+)"/);
        if (productNameMatch) {
          const productName = productNameMatch[1];
          console.log('Extracted product name:', productName);
          await triggerAnalysis(productName);
        } else {
          console.log('Failed to extract product name');
        }
      } else {
        console.log('No product selection detected');
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "assistant",
          content: "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Card className="flex flex-col h-full">
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-lg max-w-xs ${
                message.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="mb-4 flex justify-start">
            <div className="px-4 py-2 rounded-lg bg-gray-200 text-black">
              Typing...
            </div>
          </div>
        )}
      </div>
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center">
          <Input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
          />
          <Button
            className="ml-2"
            onClick={sendMessage}
            disabled={loading || !input.trim()}
          >
            Send
          </Button>
        </div>
      </div>
    </Card>
  );
}