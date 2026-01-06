import { useState, useEffect } from 'react';

interface MathProblem {
  question: string;
  answer: number;
  options: number[];
  difficulty: 'easy' | 'medium' | 'hard';
}

interface MathQuizProps {
  onExit: () => void;
}

export default function MathQuiz({ onExit }: MathQuizProps) {
  const [problems, setProblems] = useState<MathProblem[]>([]);
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [timer, setTimer] = useState(20);
  const [timerActive, setTimerActive] = useState(false);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');

  // Generate a random math problem based on difficulty
  const generateMathProblem = (difficulty: 'easy' | 'medium' | 'hard'): MathProblem => {
    let num1: number, num2: number, operation: string, answer: number;
    
    // Set number ranges based on difficulty
    switch (difficulty) {
      case 'easy':
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        operation = ['+', '-', '×'][Math.floor(Math.random() * 3)];
        break;
      case 'medium':
        num1 = Math.floor(Math.random() * 20) + 5;
        num2 = Math.floor(Math.random() * 20) + 5;
        operation = ['+', '-', '×', '÷'][Math.floor(Math.random() * 4)];
        
        // Ensure clean division for medium difficulty
        if (operation === '÷') {
          answer = Math.floor(Math.random() * 10) + 1;
          num1 = num2 * answer;
        }
        break;
      case 'hard':
        num1 = Math.floor(Math.random() * 50) + 10;
        num2 = Math.floor(Math.random() * 30) + 5;
        operation = ['+', '-', '×', '÷', '^2'][Math.floor(Math.random() * 5)];
        
        // Ensure clean division for hard difficulty too
        if (operation === '÷') {
          answer = Math.floor(Math.random() * 12) + 1;
          num1 = num2 * answer;
        }
        
        // Square operation is special
        if (operation === '^2') {
          num1 = Math.floor(Math.random() * 15) + 2;
          operation = '²';
        }
        break;
      default:
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        operation = '+';
    }
    
    // Calculate answer based on operation
    switch (operation) {
      case '+':
        answer = num1 + num2;
        break;
      case '-':
        // Ensure no negative answers in easy mode
        if (difficulty === 'easy' && num1 < num2) {
          [num1, num2] = [num2, num1];
        }
        answer = num1 - num2;
        break;
      case '×':
        answer = num1 * num2;
        break;
      case '÷':
        // Answer already calculated for division
        break;
      case '²':
        answer = num1 * num1;
        break;
      default:
        answer = num1 + num2;
    }
    
    // Format the question
    let question: string;
    if (operation === '²') {
      question = `${num1}${operation}`;
    } else if (operation === '÷') {
      question = `${num1} ${operation} ${num2}`;
    } else {
      question = `${num1} ${operation} ${num2}`;
    }
    
    // Generate answer options
    const options = [answer];
    
    // Add wrong answers (within a reasonable range of the correct answer)
    while (options.length < 4) {
      let wrongAnswer;
      const range = difficulty === 'easy' ? 5 : (difficulty === 'medium' ? 10 : 20);
      
      // Generate wrong answer within range of correct answer
      const offset = Math.floor(Math.random() * range) + 1;
      wrongAnswer = Math.random() < 0.5 ? answer + offset : answer - offset;
      
      // Ensure no negative or duplicate answers
      if (wrongAnswer > 0 && !options.includes(wrongAnswer)) {
        options.push(wrongAnswer);
      }
    }
    
    // Shuffle options
    options.sort(() => Math.random() - 0.5);
    
    return {
      question,
      answer,
      options,
      difficulty,
    };
  };

  // Generate quiz with 10 problems
  const generateQuiz = (difficulty: 'easy' | 'medium' | 'hard') => {
    const newProblems: MathProblem[] = [];
    for (let i = 0; i < 10; i++) {
      newProblems.push(generateMathProblem(difficulty));
    }
    setProblems(newProblems);
    setCurrentProblemIndex(0);
    setScore(0);
    setQuizComplete(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  // Initialize quiz on mount or when difficulty changes
  useEffect(() => {
    generateQuiz(difficulty);
  }, [difficulty]);

  // Handle timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (timerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      // Time's up, move to next question
      handleNextQuestion();
    }
    
    return () => clearInterval(interval);
  }, [timerActive, timer]);

  // Start timer when current problem changes
  useEffect(() => {
    if (!quizComplete) {
      setTimer(20);
      setTimerActive(true);
    }
  }, [currentProblemIndex, quizComplete]);

  // Handle answer selection
  const handleAnswerSelect = (selectedOption: number) => {
    setTimerActive(false);
    setSelectedAnswer(selectedOption);
    
    const currentProblem = problems[currentProblemIndex];
    const correct = selectedOption === currentProblem.answer;
    
    setIsCorrect(correct);
    
    if (correct) {
      // Increment score for correct answers
      setScore(prevScore => prevScore + 1);
    }
    
    // Wait before moving to next question
    setTimeout(() => {
      handleNextQuestion();
    }, 1500);
  };

  // Move to next question or complete quiz
  const handleNextQuestion = () => {
    if (currentProblemIndex < problems.length - 1) {
      setCurrentProblemIndex(prevIndex => prevIndex + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
    } else {
      setQuizComplete(true);
      setTimerActive(false);
    }
  };

  // Restart quiz
  const handleRestartQuiz = () => {
    generateQuiz(difficulty);
    setTimerActive(false);
  };

  // Change difficulty
  const handleChangeDifficulty = (newDifficulty: 'easy' | 'medium' | 'hard') => {
    setDifficulty(newDifficulty);
    generateQuiz(newDifficulty);
  };

  // Calculate score percentage
  const calculateScorePercentage = () => {
    return Math.round((score / problems.length) * 100);
  };

  // Get message based on score
  const getScoreMessage = () => {
    const percentage = calculateScorePercentage();
    
    if (percentage >= 90) return "Excellent! You're a math genius!";
    if (percentage >= 70) return "Great job! You have strong math skills.";
    if (percentage >= 50) return "Good effort! Keep practicing to improve.";
    return "Keep practicing! Math skills improve with time and effort.";
  };

  // Render quiz
  if (problems.length === 0) {
    return <div>Loading quiz...</div>;
  }

  return (
    <div className="max-w-lg mx-auto">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold mb-2">Math Challenge</h2>
        <p className="text-gray-600 mb-4">
          Test and improve your math skills with this quiz
        </p>
        
        {/* Difficulty selector */}
        <div className="flex justify-center space-x-2 mb-4">
          <button
            onClick={() => handleChangeDifficulty('easy')}
            className={`px-3 py-1 rounded-md ${
              difficulty === 'easy' ? 'bg-green-500 text-white' : 'bg-gray-200'
            }`}
          >
            Easy
          </button>
          <button
            onClick={() => handleChangeDifficulty('medium')}
            className={`px-3 py-1 rounded-md ${
              difficulty === 'medium' ? 'bg-yellow-500 text-white' : 'bg-gray-200'
            }`}
          >
            Medium
          </button>
          <button
            onClick={() => handleChangeDifficulty('hard')}
            className={`px-3 py-1 rounded-md ${
              difficulty === 'hard' ? 'bg-red-500 text-white' : 'bg-gray-200'
            }`}
          >
            Hard
          </button>
        </div>
      </div>
      
      {!quizComplete ? (
        <div>
          {/* Progress and score */}
          <div className="flex justify-between items-center mb-4">
            <div>
              <span className="font-medium">Question:</span> {currentProblemIndex + 1}/{problems.length}
            </div>
            <div>
              <span className="font-medium">Score:</span> {score}
            </div>
            <div className={`font-medium ${timer <= 5 ? 'text-red-600' : ''}`}>
              Time: {timer}s
            </div>
          </div>
          
          {/* Current problem */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="text-3xl font-bold text-center mb-6">
              {problems[currentProblemIndex].question}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {problems[currentProblemIndex].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={selectedAnswer !== null}
                  className={`
                    py-3 rounded-md text-xl font-medium transition-colors
                    ${
                      selectedAnswer === null
                        ? 'bg-blue-100 hover:bg-blue-200'
                        : selectedAnswer === option
                          ? isCorrect
                            ? 'bg-green-500 text-white'
                            : 'bg-red-500 text-white'
                          : option === problems[currentProblemIndex].answer && selectedAnswer !== null
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-100'
                    }
                  `}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          
          {/* Feedback */}
          {isCorrect !== null && (
            <div className={`text-center mb-4 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
              <p className="text-xl font-bold">
                {isCorrect ? 'Correct! ✓' : 'Incorrect! ✗'}
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-2xl font-bold mb-2">Quiz Complete!</h3>
          <p className="text-5xl font-bold mb-4">{calculateScorePercentage()}%</p>
          <p className="text-xl mb-6">You got {score} out of {problems.length} correct.</p>
          <p className="text-gray-700 mb-6">{getScoreMessage()}</p>
          
          <button
            onClick={handleRestartQuiz}
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
} 