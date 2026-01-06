import { useState, useEffect } from 'react';
import MemoryGame from './games/MemoryGame';
import WordPuzzle from './games/WordPuzzle';
import MathQuiz from './games/MathQuiz';

type GameType = 'memory' | 'word' | 'math' | null;

export default function GameSelector() {
  const [selectedGame, setSelectedGame] = useState<GameType>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Add entrance animation
    setIsLoaded(true);
  }, []);

  const games = [
    {
      id: 'memory',
      title: 'Memory Challenge',
      description: 'Improve your memory by matching pairs of cards',
      icon: '🧠',
      bgColor: 'from-pink-500 to-rose-500',
      benefit: 'Enhances visual memory and concentration',
    },
    {
      id: 'word',
      title: 'Word Puzzle',
      description: 'Expand your vocabulary with word puzzles',
      icon: '📝',
      bgColor: 'from-amber-500 to-orange-500',
      benefit: 'Improves vocabulary and spelling skills',
    },
    {
      id: 'math',
      title: 'Math Quiz',
      description: 'Practice your math skills with fun quizzes',
      icon: '🔢',
      bgColor: 'from-emerald-500 to-teal-500',
      benefit: 'Strengthens numerical reasoning and speed',
    },
  ];

  const renderSelectedGame = () => {
    switch (selectedGame) {
      case 'memory':
        return <MemoryGame onExit={() => setSelectedGame(null)} />;
      case 'word':
        return <WordPuzzle onExit={() => setSelectedGame(null)} />;
      case 'math':
        return <MathQuiz onExit={() => setSelectedGame(null)} />;
      default:
        return null;
    }
  };

  return (
    <div className="h-full">
      {selectedGame ? (
        <div className="animate-fade-in">
          <button 
            onClick={() => setSelectedGame(null)}
            className="mb-6 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-300 flex items-center group"
          >
            <span className="mr-2 transform transition-transform group-hover:-translate-x-1">←</span> 
            Back to games
          </button>
          {renderSelectedGame()}
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-3 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
            Learning Games
          </h2>
          <p className="text-gray-600 mb-8 text-center max-w-2xl mx-auto">
            Take a break and engage in these educational games to refresh your mind. 
            These games are designed to be both fun and beneficial for your learning.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {games.map((game, index) => (
              <div 
                key={game.id}
                onClick={() => setSelectedGame(game.id as GameType)}
                className={`relative overflow-hidden bg-white p-6 rounded-xl transition-all duration-500 
                  cursor-pointer border border-gray-200 hover:border-transparent 
                  hover:shadow-xl transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div 
                  className={`absolute inset-0 bg-gradient-to-br ${game.bgColor} opacity-0 
                  hover:opacity-10 transition-opacity duration-300`}
                ></div>
                
                <div className="relative z-10">
                  <div className="text-5xl mb-5 transform transition-transform duration-500 hover:scale-110 hover:rotate-12">
                    {game.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{game.title}</h3>
                  <p className="text-gray-600 mb-4">{game.description}</p>
                  
                  <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-700">
                    <span className="font-medium">Benefit:</span> {game.benefit}
                  </div>
                  
                  <div className="mt-4 text-right">
                    <span className="inline-flex items-center text-sm font-medium text-indigo-600">
                      Play now
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <div className="bg-blue-50 p-4 rounded-lg inline-block mx-auto">
              <h3 className="text-lg font-medium text-blue-800 mb-2">Did you know?</h3>
              <p className="text-blue-700">
                Research shows that taking short breaks for educational games can increase learning retention by up to 25%!
              </p>
            </div>
          </div>
        </div>
      )}
      
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
} 