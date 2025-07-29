import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Quiz.css';
import UserProfileBar from '../../components/UserProfileBar';
import questionsData from '../../data/questions';

const Quiz = () => {
  const navigate = useNavigate();
  const { difficulty } = useParams();
  const questions = questionsData[difficulty] || questionsData.easy;

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
          timeUsed: time
        }
      });
    }
  };

  return (
    <div className="quiz-wrapper">
      <UserProfileBar />

      <div className="quiz-header">
        <span>Question {currentQ + 1}/{questions.length}</span>
        <span>Time: {time}s</span>
      </div>

      <div className="progress-bar">
        <div className="progress" style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }} />
      </div>

      <h2 className="question">{questions[currentQ].question}</h2>

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

      <button className="next-button" onClick={handleNext} disabled={!selected}>
        {currentQ === questions.length - 1 ? "Submit Quiz" : "Next"}
      </button>
    </div>
  );
};

export default Quiz;