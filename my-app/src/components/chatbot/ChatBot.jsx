import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader, Sparkles, Bot } from 'lucide-react';
import { getAIResponse } from '../../services/chatbotService';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hi there! I'm your AI travel assistant. How can I help you plan your trip in Bangladesh today? 🇧🇩",
      isUser: false
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage = inputText;
    setInputText("");
    setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
    setIsLoading(true);

    try {
      const aiResponse = await getAIResponse(userMessage);
      setMessages(prev => [...prev, { text: aiResponse, isUser: false }]);
    } catch (error) {
      console.error("Error getting AI response:", error);
      setMessages(prev => [...prev, {
        text: "I'm having trouble connecting right now. Please try again later.",
        isUser: false,
        isError: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '30px',
      right: '30px',
      zIndex: 1000,
      fontFamily: 'Inter, sans-serif'
    }}>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: '#059669',
            color: 'white',
            border: 'none',
            boxShadow: '0 8px 24px rgba(5, 150, 105, 0.4)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            animation: 'bounce 2s infinite'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1) rotate(-5deg)';
            e.currentTarget.style.boxShadow = '0 12px 32px rgba(5, 150, 105, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1) rotate(0)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(5, 150, 105, 0.4)';
          }}
        >
          <MessageCircle size={32} strokeWidth={2.5} />
          {/* Notification Dot */}
          <span style={{
            position: 'absolute',
            top: '0',
            right: '0',
            width: '16px',
            height: '16px',
            backgroundColor: '#ef4444',
            borderRadius: '50%',
            border: '2px solid white'
          }} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div style={{
          width: '380px',
          height: '600px',
          backgroundColor: 'white',
          borderRadius: '24px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'scaleIn 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          border: '1px solid rgba(0,0,0,0.05)'
        }}>
          {/* Header */}
          <div style={{
            padding: '20px',
            background: 'linear-gradient(135deg, #059669, #0d9488)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                backgroundColor: 'rgba(255,255,255,0.2)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(4px)'
              }}>
                <Bot size={24} />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700', fontFamily: 'Poppins, sans-serif' }}>PothChola AI</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', opacity: 0.9 }}>
                  <span style={{ width: '8px', height: '8px', backgroundColor: '#4ade80', borderRadius: '50%' }} />
                  Online
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                padding: '8px',
                borderRadius: '50%',
                transition: 'background-color 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <X size={24} />
            </button>
          </div>

          {/* Messages Area */}
          <div style={{
            flex: 1,
            padding: '20px',
            overflowY: 'auto',
            backgroundColor: '#f9fafb',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  alignSelf: msg.isUser ? 'flex-end' : 'flex-start',
                  maxWidth: '80%',
                  animation: 'slideUp 0.3s ease-out'
                }}
              >
                {!msg.isUser && (
                  <span style={{
                    fontSize: '11px',
                    color: '#6b7280',
                    marginLeft: '12px',
                    marginBottom: '4px',
                    display: 'block'
                  }}>
                    AI Assistant
                  </span>
                )}
                <div style={{
                  padding: '12px 16px',
                  borderRadius: msg.isUser ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                  backgroundColor: msg.isUser ? '#059669' : 'white',
                  color: msg.isUser ? 'white' : '#1f2937',
                  boxShadow: msg.isUser ? '0 4px 12px rgba(5, 150, 105, 0.2)' : '0 2px 8px rgba(0,0,0,0.05)',
                  fontSize: '15px',
                  lineHeight: '1.5',
                  border: msg.isUser ? 'none' : '1px solid #e5e7eb'
                }}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div style={{ alignSelf: 'flex-start', animation: 'slideUp 0.3s ease-out' }}>
                <span style={{ fontSize: '11px', color: '#6b7280', marginLeft: '12px', marginBottom: '4px', display: 'block' }}>AI Assistant</span>
                <div style={{
                  padding: '12px 20px',
                  borderRadius: '20px 20px 20px 4px',
                  backgroundColor: 'white',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                  border: '1px solid #e5e7eb',
                  display: 'flex',
                  gap: '4px'
                }}>
                  <span style={{ width: '6px', height: '6px', backgroundColor: '#059669', borderRadius: '50%', animation: 'bounce 1s infinite 0s' }} />
                  <span style={{ width: '6px', height: '6px', backgroundColor: '#059669', borderRadius: '50%', animation: 'bounce 1s infinite 0.2s' }} />
                  <span style={{ width: '6px', height: '6px', backgroundColor: '#059669', borderRadius: '50%', animation: 'bounce 1s infinite 0.4s' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form
            onSubmit={handleSendMessage}
            style={{
              padding: '16px',
              backgroundColor: 'white',
              borderTop: '1px solid #f3f4f6',
              display: 'flex',
              gap: '12px',
              alignItems: 'center'
            }}
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about travel..."
              style={{
                flex: 1,
                padding: '12px 16px',
                borderRadius: '24px',
                border: '2px solid #e5e7eb',
                fontSize: '15px',
                outline: 'none',
                transition: 'all 0.2s',
                backgroundColor: '#f9fafb'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#059669';
                e.target.style.backgroundColor = 'white';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e5e7eb';
                e.target.style.backgroundColor = '#f9fafb';
              }}
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: inputText.trim() && !isLoading ? '#059669' : '#e5e7eb',
                color: 'white',
                border: 'none',
                cursor: inputText.trim() && !isLoading ? 'pointer' : 'default',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
                boxShadow: inputText.trim() && !isLoading ? '0 4px 12px rgba(5, 150, 105, 0.3)' : 'none'
              }}
              onMouseEnter={(e) => {
                if (inputText.trim() && !isLoading) {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(5, 150, 105, 0.4)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = inputText.trim() && !isLoading ? '0 4px 12px rgba(5, 150, 105, 0.3)' : 'none';
              }}
            >
              <Send size={20} strokeWidth={2.5} style={{ marginLeft: '2px' }} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}