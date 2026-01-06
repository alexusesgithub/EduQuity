import { useEffect, useState } from 'react';
import Head from 'next/head';
import ChatInterface from '@/components/chatbot/ChatInterface';
import GameSelector from '@/components/chatbot/GameSelector';
import ScheduleManager from '@/components/chatbot/ScheduleManager';

// Function to format time consistently for both server and client
function formatTimeConsistently() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const ampm = hours >= 12 ? 'pm' : 'am';
  const formattedHours = hours % 12 || 12;
  const formattedTime = `${formattedHours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${ampm}`;
  return 'Updated: ' + formattedTime;
}

export default function ChatBot() {
  const [activeTab, setActiveTab] = useState('chat');
  const [isLoaded, setIsLoaded] = useState(false);
  const [clientReady, setClientReady] = useState(false);

  // Use effect to handle client-side operations
  useEffect(() => {
    // Mark component as loaded for animation
    setIsLoaded(true);
    // Mark as ready on client-side
    setClientReady(true);
  }, []);

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Head>
        <title>AI Education Assistant</title>
        <meta name="description" content="AI Education Equity System - Virtual Assistant" />
      </Head>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500 transform transition-transform duration-500 ease-in-out hover:scale-105">
          Education Assistant
        </h1>
        
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-8 animate-fadeIn">
          Your personal AI companion for educational success. Chat, play learning games, or organize your study schedule.
        </p>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2 bg-white/80 backdrop-blur-sm rounded-xl p-1.5 shadow-lg">
            <button
              onClick={() => setActiveTab('chat')}
              className={`px-5 py-2.5 rounded-lg transition-all duration-300 ease-in-out ${
                activeTab === 'chat' 
                  ? 'bg-blue-500 text-white shadow-md' 
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                </svg>
                Chat Assistant
              </span>
            </button>
            <button
              onClick={() => setActiveTab('games')}
              className={`px-5 py-2.5 rounded-lg transition-all duration-300 ease-in-out ${
                activeTab === 'games' 
                  ? 'bg-blue-500 text-white shadow-md' 
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
                Learning Games
              </span>
            </button>
            <button
              onClick={() => setActiveTab('schedule')}
              className={`px-5 py-2.5 rounded-lg transition-all duration-300 ease-in-out ${
                activeTab === 'schedule' 
                  ? 'bg-blue-500 text-white shadow-md' 
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                Schedule Manager
              </span>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div 
          className="bg-white rounded-xl shadow-xl p-6 transition-all duration-500 transform animate-fadeIn"
          style={{
            boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.1), 0 8px 10px -6px rgba(59, 130, 246, 0.1)'
          }}
        >
          <div className={`transition-opacity duration-300 ${activeTab === 'chat' ? 'opacity-100' : 'opacity-0 hidden'}`}>
            {activeTab === 'chat' && <ChatInterface />}
          </div>
          <div className={`transition-opacity duration-300 ${activeTab === 'games' ? 'opacity-100' : 'opacity-0 hidden'}`}>
            {activeTab === 'games' && <GameSelector />}
          </div>
          <div className={`transition-opacity duration-300 ${activeTab === 'schedule' ? 'opacity-100' : 'opacity-0 hidden'}`}>
            {activeTab === 'schedule' && <ScheduleManager />}
          </div>
        </div>
      </div>
      
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
} 