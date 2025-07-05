import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Quiz.css';
import UserProfileBar from '../../components/UserProfileBar';

const allQuestions = {
  easy: [
    { question: "What is 12 + 8?", options: ["18", "20", "21", "22"], answer: "20" },
    { question: "What is 7 × 6?", options: ["42", "36", "48", "40"], answer: "42" },
    { question: "What is 15 ÷ 3?", options: ["4", "5", "6", "3"], answer: "5" },
    { question: "What is 9²?", options: ["81", "72", "64", "99"], answer: "81" },
    { question: "What is the square root of 144?", options: ["12", "14", "16", "10"], answer: "12" }
  ],
  medium: [
    { question: "What is 25% of 200?", options: ["25", "50", "75", "100"], answer: "50" },
    { question: "What is 13 × 7?", options: ["91", "90", "86", "97"], answer: "91" },
    { question: "What is √169?", options: ["11", "13", "14", "15"], answer: "13" },
    { question: "Simplify: 3² + 4²", options: ["25", "16", "9", "20"], answer: "25" },
    { question: "What is 72 ÷ 8?", options: ["9", "8", "6", "7"], answer: "9" }
  ],
  hard: [
    { question: "What is the value of π (up to 2 decimal places)?", options: ["3.12", "3.14", "3.16", "3.18"], answer: "3.14" },
    { question: "What is 11² + 2²?", options: ["125", "121", "123", "105"], answer: "125" },
    { question: "Solve: (3x = 12), x=?", options: ["3", "4", "5", "6"], answer: "4" },
    { question: "What is 2³ × 2²?", options: ["32", "16", "8", "4"], answer: "32" },
    { question: "What is the cube root of 27?", options: ["2", "3", "4", "5"], answer: "3" }
  ]
};

const Quiz = () => {
  const navigate = useNavigate();
  const { difficulty } = useParams();
  const questions = allQuestions[difficulty] || allQuestions.easy;

  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState('');
  const [time, setTime] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => setTime(prev => prev + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' && selected) handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selected]);

  const handleNext = () => {
    const isCorrect = selected === questions[currentQ].answer;
    const newScore = isCorrect ? score + 1 : score;
    const updatedAnswers = [...userAnswers, selected];
    setScore(newScore);
    setUserAnswers(updatedAnswers);

    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelected('');
    } else {
      const history = JSON.parse(localStorage.getItem('quizHistory')) || [];
      history.push({
        score: newScore,
        date: new Date().toLocaleString(),
        difficulty: difficulty || 'easy'
      });
      localStorage.setItem('quizHistory', JSON.stringify(history));

      navigate('/scorecard', {
        state: {
          score: newScore,
          correctAnswers: questions.map(q => q.answer),
          userAnswers: updatedAnswers,
          totalQuestions: questions.length,
          difficulty: difficulty,
          timeUsed: time // ✅ Send timeUsed to ScoreCard
        }
      });
    }
  };

  return (
    <div className="quiz-wrapper">
      <UserProfileBar />

      <div className="quiz-container">
        <div className="top-bar">
          <span>Question {currentQ + 1} of {questions.length}</span>
          <span>Time: {time}s</span>
        </div>

        <div className="progress-bar">
          <div
            className="progress"
            style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
          />
        </div>

        <h2>{questions[currentQ].question}</h2>
        <div className="options">
          {questions[currentQ].options.map((option, idx) => (
            <button
              key={idx}
              className={`option-button ${selected === option ? 'selected' : ''}`}
              onClick={() => setSelected(option)}
            >
              {option}
            </button>
          ))}
        </div>

        <button
          className="next-button"
          onClick={handleNext}
          disabled={!selected}
        >
          {currentQ === questions.length - 1 ? "Submit Quiz" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default Quiz;