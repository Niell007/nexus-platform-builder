
"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Send, X, Bot, User, Minimize2, Maximize2 } from "lucide-react";

interface Message {
  id: string;
  type: 'user' | 'agent' | 'bot';
  content: string;
  timestamp: Date;
  sender?: string;
}

const LiveChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hi! I'm here to help you find the perfect service. How can I assist you today?",
      timestamp: new Date(),
      sender: 'ServicePro AI'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');
    setIsTyping(true);

    // Simulate AI/agent response
    setTimeout(() => {
      const responses = [
        "I'd be happy to help you with that! Let me connect you with one of our service specialists.",
        "That sounds like a great project. I can help you find qualified professionals in your area.",
        "I understand your needs. Let me search for available service providers who can assist you.",
        "Perfect! I can help you schedule that service. What's your preferred date and time?",
        "Great question! Our professionals are fully licensed and insured. Would you like to see their credentials?"
      ];

      const response: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
        sender: 'ServicePro AI'
      };

      setMessages(prev => [...prev, response]);
      setIsTyping(false);
    }, 1500);
  };

  const quickResponses = [
    "I need a quote",
    "Schedule a service",
    "Emergency repair",
    "Check availability"
  ];

  const handleQuickResponse = (text: string) => {
    const quickMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, quickMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        type: 'agent',
        content: `I'll help you with "${text}". Let me gather some information for you.`,
        timestamp: new Date(),
        sender: 'Support Agent'
      };

      setMessages(prev => [...prev, response]);
      setIsTyping(false);
    }, 1000);
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-full w-14 h-14 shadow-lg"
        size="icon"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${isMinimized ? 'w-80' : 'w-96'} max-w-[90vw]`}>
      <Card className="bg-gray-900 border-gray-700 shadow-2xl">
        <CardHeader className="flex flex-row items-center justify-between p-4 bg-gradient-to-r from-blue-500 to-purple-600">
          <CardTitle className="text-white flex items-center">
            <MessageCircle className="mr-2 h-5 w-5" />
            Live Support
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button
              onClick={() => setIsMinimized(!isMinimized)}
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20 h-8 w-8"
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </Button>
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20 h-8 w-8"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-0">
            {/* Messages Area */}
            <div className="h-80 overflow-y-auto p-4 space-y-4 bg-gray-900">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[80%] ${msg.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      msg.type === 'user' ? 'bg-blue-500' : msg.type === 'bot' ? 'bg-purple-500' : 'bg-green-500'
                    }`}>
                      {msg.type === 'user' ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Bot className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div className={`rounded-lg p-3 ${
                      msg.type === 'user' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-800 text-gray-100'
                    }`}>
                      <p className="text-sm">{msg.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-gray-800 rounded-lg p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Responses */}
            <div className="p-4 bg-gray-800 border-t border-gray-700">
              <div className="flex flex-wrap gap-2 mb-3">
                {quickResponses.map((response, index) => (
                  <Button
                    key={index}
                    onClick={() => handleQuickResponse(response)}
                    variant="outline"
                    size="sm"
                    className="text-xs border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    {response}
                  </Button>
                ))}
              </div>
            </div>

            {/* Message Input */}
            <form onSubmit={sendMessage} className="p-4 bg-gray-800 border-t border-gray-700">
              <div className="flex space-x-2">
                <Input
                  type="text"
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
                <Button 
                  type="submit" 
                  disabled={!message.trim()}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  size="icon"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </form>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default LiveChatWidget;
