import { useState, useEffect } from 'react';

interface WordPuzzleProps {
  onExit: () => void;
}

// Educational vocabulary for different subjects
const educationalWords = [
  { word: 'PHOTOSYNTHESIS', hint: 'Process by which plants convert light energy to chemical energy', category: 'Biology' },
  { word: 'ALGORITHM', hint: 'Step-by-step procedure for solving a problem', category: 'Computer Science' },
  { word: 'MITOCHONDRIA', hint: 'Powerhouse of the cell', category: 'Biology' },
  { word: 'PARALLELOGRAM', hint: 'Quadrilateral with opposite sides parallel', category: 'Geometry' },
  { word: 'PRECIPITATION', hint: 'Water falling from clouds', category: 'Meteorology' },
  { word: 'RENAISSANCE', hint: 'Period of cultural rebirth in Europe', category: 'History' },
  { word: 'ECOSYSTEM', hint: 'Community of living organisms and their environment', category: 'Ecology' },
  { word: 'EQUILIBRIUM', hint: 'State of balance between opposing forces', category: 'Chemistry/Physics' },
  { word: 'METAPHOR', hint: 'Figure of speech that makes an implicit comparison', category: 'Literature' },
  { word: 'DERIVATIVE', hint: 'Rate at which a function changes at a specific point', category: 'Calculus' },
];

export default function WordPuzzle({ onExit }: WordPuzzleProps) {
  const [currentPuzzle, setCurrentPuzzle] = useState<{
    word: string;
    hint: string;
    category: string;
    maskedWord: string;
    guessedLetters: string[];
    wrongGuesses: number;
  } | null>(null);
  
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');
  const [inputLetter, setInputLetter] = useState<string>('');
  const maxWrongGuesses = 6;
  
  // Get a random word from the list
  const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * educationalWords.length);
    const { word, hint, category } = educationalWords[randomIndex];
    
    return {
      word: word.toUpperCase(),
      hint,
      category,
      maskedWord: '_'.repeat(word.length),
      guessedLetters: [],
      wrongGuesses: 0,
    };
  };
  
  // Initialize the game
  const initializeGame = () => {
    setCurrentPuzzle(getRandomWord());
    setGameStatus('playing');
    setInputLetter('');
  };
  
  // Start game on mount
  useEffect(() => {
    initializeGame();
  }, []);
  
  // Update masked word when letters are guessed
  const updateMaskedWord = (word: string, guessedLetters: string[]) => {
    return word
      .split('')
      .map(letter => (guessedLetters.includes(letter) ? letter : '_'))
      .join('');
  };
  
  // Handle letter guess
  const handleGuess = (letter: string) => {
    if (!currentPuzzle || gameStatus !== 'playing') return;
    
    // Convert to uppercase
    letter = letter.toUpperCase();
    
    // If letter already guessed, do nothing
    if (currentPuzzle.guessedLetters.includes(letter)) return;
    
    // Add letter to guessed letters
    const guessedLetters = [...currentPuzzle.guessedLetters, letter];
    
    // Check if letter is in the word
    const isCorrectGuess = currentPuzzle.word.includes(letter);
    
    // Update wrong guesses count
    const wrongGuesses = isCorrectGuess 
      ? currentPuzzle.wrongGuesses 
      : currentPuzzle.wrongGuesses + 1;
    
    // Update masked word
    const maskedWord = updateMaskedWord(currentPuzzle.word, guessedLetters);
    
    // Update current puzzle
    setCurrentPuzzle({
      ...currentPuzzle,
      guessedLetters,
      wrongGuesses,
      maskedWord,
    });
    
    // Clear input
    setInputLetter('');
    
    // Check if game is over
    if (wrongGuesses >= maxWrongGuesses) {
      setGameStatus('lost');
    } else if (!maskedWord.includes('_')) {
      setGameStatus('won');
    }
  };
  
  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const letter = e.target.value.slice(-1);
    setInputLetter(letter);
  };
  
  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputLetter.match(/[a-zA-Z]/)) {
      handleGuess(inputLetter);
    }
  };
  
  // Render hangman figure
  const renderHangman = (wrongGuesses: number) => {
    return (
      <div className="font-mono text-center text-xl">
        {wrongGuesses >= 1 && "  O  "}<br />
        {wrongGuesses >= 2 && (wrongGuesses >= 3 ? (wrongGuesses >= 4 ? "/ | \\" : " | \\") : " | ")} <br />
        {wrongGuesses >= 5 && (wrongGuesses >= 6 ? "/ \\" : "/  ")}
      </div>
    );
  };
  
  if (!currentPuzzle) return <div>Loading...</div>;
  
  return (
    <div className="flex flex-col items-center">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold mb-2">Word Puzzle</h2>
        <p className="text-gray-600 mb-2">
          Guess the educational term one letter at a time
        </p>
        <p className="text-sm mb-4">
          <span className="font-semibold">Category:</span> {currentPuzzle.category}
        </p>
      </div>
      
      <div className="bg-gray-100 p-4 rounded-lg mb-6 max-w-lg">
        <p className="text-gray-700 italic">"{currentPuzzle.hint}"</p>
      </div>
      
      <div className="mb-6">
        {renderHangman(currentPuzzle.wrongGuesses)}
        <p className="text-sm text-gray-500 mt-1">
          Wrong guesses: {currentPuzzle.wrongGuesses}/{maxWrongGuesses}
        </p>
      </div>
      
      <div className="mb-8 text-center">
        <div className="flex justify-center space-x-2 mb-4">
          {currentPuzzle.maskedWord.split('').map((letter, index) => (
            <div 
              key={index}
              className="w-8 h-10 border-b-2 border-blue-500 flex items-center justify-center text-xl font-bold"
            >
              {letter !== '_' ? letter : ''}
            </div>
          ))}
        </div>
        
        {gameStatus === 'playing' ? (
          <form onSubmit={handleSubmit} className="flex justify-center">
            <input
              type="text"
              value={inputLetter}
              onChange={handleInputChange}
              maxLength={1}
              className="w-12 h-12 text-center text-xl border-2 border-gray-300 rounded-md mr-2"
              autoFocus
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              disabled={!inputLetter.match(/[a-zA-Z]/)}
            >
              Guess
            </button>
          </form>
        ) : (
          <div className={`text-center ${gameStatus === 'won' ? 'text-green-600' : 'text-red-600'}`}>
            <p className="text-xl font-bold mb-2">
              {gameStatus === 'won' ? 'Congratulations!' : 'Game Over!'}
            </p>
            <p className="mb-4">
              The word was: <span className="font-bold">{currentPuzzle.word}</span>
            </p>
            <button
              onClick={initializeGame}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
      
      {gameStatus === 'playing' && (
        <div className="flex flex-wrap justify-center gap-2 max-w-md">
          {Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ').map(letter => (
            <button
              key={letter}
              onClick={() => handleGuess(letter)}
              disabled={currentPuzzle.guessedLetters.includes(letter)}
              className={`
                w-8 h-8 flex items-center justify-center rounded-md
                ${currentPuzzle.guessedLetters.includes(letter) 
                  ? currentPuzzle.word.includes(letter)
                    ? 'bg-green-200 text-green-800 cursor-not-allowed'
                    : 'bg-red-200 text-red-800 cursor-not-allowed'
                  : 'bg-gray-200 hover:bg-gray-300'
                }
              `}
            >
              {letter}
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 