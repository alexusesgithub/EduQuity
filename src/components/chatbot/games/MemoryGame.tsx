import { useState, useEffect } from 'react';

interface CardProps {
  id: number;
  content: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
}

interface Card {
  id: number;
  content: string;
  isFlipped: boolean;
  isMatched: boolean;
}

interface MemoryGameProps {
  onExit: () => void;
}

// Educational memory cards with academic subjects
const educationalPairs = [
  { content: '🧮', subject: 'Mathematics' },
  { content: '🧪', subject: 'Chemistry' },
  { content: '🔭', subject: 'Astronomy' },
  { content: '🧬', subject: 'Biology' },
  { content: '📚', subject: 'Literature' },
  { content: '🗺️', subject: 'Geography' },
  { content: '⚛️', subject: 'Physics' },
  { content: '🎭', subject: 'Arts' },
];

export default function MemoryGame({ onExit }: MemoryGameProps) {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);

  // Initialize/reset the game
  const initializeGame = () => {
    // Create pairs of cards
    const duplicatedCards = [...educationalPairs, ...educationalPairs];
    
    // Shuffle the cards
    const shuffledCards = duplicatedCards
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({
        id: index,
        content: card.content,
        isFlipped: false,
        isMatched: false,
      }));
    
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedPairs(0);
    setMoves(0);
    setGameOver(false);
    setStartTime(Date.now());
    setEndTime(null);
  };

  // Start game on mount
  useEffect(() => {
    initializeGame();
  }, []);

  // Handle card click
  const handleCardClick = (id: number) => {
    // Don't do anything if the game is over or same card is clicked again
    if (gameOver || flippedCards.includes(id)) return;
    
    // Don't allow more than 2 cards to be flipped at once
    if (flippedCards.length === 2) return;
    
    // Don't allow clicking on already matched cards
    if (cards.find(card => card.id === id)?.isMatched) return;
    
    // Add card to flipped cards
    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);
    
    // Flip the card
    setCards(cards.map(card => 
      card.id === id ? { ...card, isFlipped: true } : card
    ));
    
    // If we have flipped 2 cards, check for a match
    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);
      
      const [firstCardId, secondCardId] = newFlippedCards;
      const firstCard = cards.find(card => card.id === firstCardId);
      const secondCard = cards.find(card => card.id === secondCardId);
      
      // If the cards match
      if (firstCard?.content === secondCard?.content) {
        // Mark them as matched
        setCards(cards.map(card => 
          card.id === firstCardId || card.id === secondCardId
            ? { ...card, isMatched: true }
            : card
        ));
        
        // Increment the matched pairs count
        const newMatchedPairs = matchedPairs + 1;
        setMatchedPairs(newMatchedPairs);
        
        // Check if game is over
        if (newMatchedPairs === educationalPairs.length) {
          setGameOver(true);
          setEndTime(Date.now());
        }
        
        // Clear flipped cards
        setFlippedCards([]);
      } else {
        // If no match, flip them back after a delay
        setTimeout(() => {
          setCards(cards.map(card => 
            card.id === firstCardId || card.id === secondCardId
              ? { ...card, isFlipped: false }
              : card
          ));
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  // Calculate game time
  const formatTime = () => {
    if (!startTime || !endTime) return '--:--';
    
    const timeInSeconds = Math.floor((endTime - startTime) / 1000);
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const MemoryCard = ({ id, content, isFlipped, isMatched, onClick }: CardProps) => (
    <div 
      onClick={onClick}
      className={`
        relative w-24 h-24 cursor-pointer rounded-lg shadow-md 
        transform transition-transform duration-300 
        ${isFlipped || isMatched ? 'rotate-y-180' : ''} 
        ${isMatched ? 'opacity-70' : ''}
      `}
    >
      <div 
        className={`
          absolute inset-0 flex items-center justify-center 
          bg-blue-500 rounded-lg backface-hidden
          ${isFlipped || isMatched ? 'hidden' : ''}
        `}
      >
        <span className="text-white text-xl font-bold">?</span>
      </div>
      <div 
        className={`
          absolute inset-0 flex items-center justify-center 
          bg-white rounded-lg border-2 border-blue-500 backface-hidden 
          ${isFlipped || isMatched ? '' : 'hidden'}
        `}
      >
        <span className="text-4xl">{content}</span>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold mb-2">Memory Challenge</h2>
        <p className="text-gray-600 mb-4">
          Match the pairs of subject icons to train your memory and focus
        </p>
        
        <div className="flex justify-center space-x-8 mb-4">
          <div className="text-center">
            <p className="text-gray-500 text-sm">Moves</p>
            <p className="text-2xl font-semibold">{moves}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-500 text-sm">Pairs</p>
            <p className="text-2xl font-semibold">{matchedPairs}/{educationalPairs.length}</p>
          </div>
          {gameOver && (
            <div className="text-center">
              <p className="text-gray-500 text-sm">Time</p>
              <p className="text-2xl font-semibold">{formatTime()}</p>
            </div>
          )}
        </div>
      </div>

      {gameOver ? (
        <div className="text-center mb-8">
          <h3 className="text-xl font-bold text-green-600 mb-3">Congratulations!</h3>
          <p className="mb-4">
            You completed the memory challenge in {moves} moves, taking {formatTime()}.
          </p>
          <button
            onClick={initializeGame}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mr-3"
          >
            Play Again
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4 mb-8">
          {cards.map(card => (
            <MemoryCard
              key={card.id}
              id={card.id}
              content={card.content}
              isFlipped={card.isFlipped}
              isMatched={card.isMatched}
              onClick={() => handleCardClick(card.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
} 