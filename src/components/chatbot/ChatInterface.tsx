import { useState, useRef, useEffect } from 'react';

// Define message types
type MessageRole = 'user' | 'assistant';

interface Message {
  role: MessageRole;
  content: string;
  timestamp: Date;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I\'m your education assistant. How can I help you today? I can create study schedules, provide learning resources, or we can play some educational games to help you relax.',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Initialize session ID
  useEffect(() => {
    // Generate a random session ID if not already set
    if (!sessionId) {
      setSessionId(`session-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`);
    }
  }, [sessionId]);
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle sending message to API
  const fetchBotResponse = async (userMessage: string) => {
    try {
      console.log('Sending message to Gemini AI API...');
      const response = await fetch('/api/chatbot/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Session-Id': sessionId,
        },
        body: JSON.stringify({ message: userMessage }),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('API Error:', response.status, errorData);
        throw new Error(`Failed to get response: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Received response from API');
      
      return {
        role: 'assistant' as MessageRole,
        content: data.message.content,
        timestamp: new Date(),
      };
    } catch (error) {
      console.error('Error fetching bot response:', error);
      return {
        role: 'assistant' as MessageRole,
        content: 'I apologize, but I encountered an error while processing your request. Please check your internet connection and try again. If the problem persists, the AI service might be temporarily unavailable.',
        timestamp: new Date(),
      };
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputMessage.trim()) return;
    
    const messageText = inputMessage.trim();
    
    // Add user message
    const userMessage: Message = {
      role: 'user',
      content: messageText,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    
    // Add a typing indicator
    const typingMessage: Message = {
      role: 'assistant',
      content: 'Thinking...',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, typingMessage]);
    
    try {
      // Get bot response from Gemini API
      const botResponse = await fetchBotResponse(messageText);
      
      // Replace typing indicator with actual response
      setMessages(prev => prev.slice(0, -1).concat(botResponse));
    } catch (error) {
      console.error('Error in handleSendMessage:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'I encountered an error while processing your message. Please try again.',
        timestamp: new Date(),
      };
      setMessages(prev => prev.slice(0, -1).concat(errorMessage));
    } finally {
      setIsLoading(false);
    }
  };

  // Format message content to handle newlines
  const formatMessageContent = (content: string) => {
    return content.split('\n').map((line, index) => (
      <span key={index}>
        {line}
        {index < content.split('\n').length - 1 && <br />}
      </span>
    ));
  };

  return (
    <div className="flex flex-col h-[600px] relative">
      {/* Chat header with subtle pulse animation */}
      <div className="absolute -top-12 left-0 right-0 flex items-center justify-center">
        <div className="flex items-center space-x-2 bg-green-100 text-green-800 px-3 py-1.5 rounded-full animate-pulse-slow">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-sm font-medium">Assistant online</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto mb-4 space-y-4 p-4 bg-gradient-to-b from-blue-50 to-indigo-50 rounded-lg scrollbar-custom">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-message-fade-in`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Avatar for assistant messages */}
            {message.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center text-white text-sm font-bold mr-2 shadow-sm">
                AI
              </div>
            )}
            
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 shadow-sm transform transition-all hover:shadow-md hover:-translate-y-0.5 ${
                message.role === 'user'
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-tr-none'
                  : 'bg-white text-gray-800 rounded-tl-none'
              }`}
            >
              <p className="whitespace-pre-wrap">{formatMessageContent(message.content)}</p>
              <p className="text-xs opacity-70 mt-1 text-right">
                {message.timestamp.toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit',
                  hour12: true,
                  hourCycle: 'h12' 
                }).toLowerCase()}
              </p>
            </div>
            
            {/* Avatar for user messages */}
            {message.role === 'user' && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold ml-2 shadow-sm">
                You
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="flex items-center space-x-2 p-1 bg-white rounded-lg shadow-inner transition-all duration-300 focus-within:ring-2 focus-within:ring-blue-300">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message here..."
          className="flex-1 border-none rounded-lg px-4 py-3 bg-transparent focus:outline-none text-gray-700"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !inputMessage.trim()}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-5 py-3 rounded-lg disabled:opacity-50 transform transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:hover:scale-100"
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending
            </span>
          ) : (
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </span>
          )}
        </button>
      </form>

      <style jsx>{`
        .scrollbar-custom::-webkit-scrollbar {
          width: 8px;
        }
        
        .scrollbar-custom::-webkit-scrollbar-track {
          background: rgba(241, 245, 249, 0.5);
          border-radius: 10px;
        }
        
        .scrollbar-custom::-webkit-scrollbar-thumb {
          background: rgba(148, 163, 184, 0.5);
          border-radius: 10px;
        }
        
        .scrollbar-custom::-webkit-scrollbar-thumb:hover {
          background: rgba(148, 163, 184, 0.8);
        }
        
        @keyframes message-fade-in {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        .animate-message-fade-in {
          animation: message-fade-in 0.3s ease-out forwards;
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 2s infinite;
        }
      `}</style>
    </div>
  );
} 