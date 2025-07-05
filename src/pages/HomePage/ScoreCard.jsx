import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './ScoreCard.css';
import UserProfileBar from '../../components/UserProfileBar';
import { supabase } from '../../supabaseClient';
import { v4 as uuidv4 } from 'uuid';

const ScoreCard = () => {
  const location = useLocation();

  if (!location.state) {
    return (
      <div className="scorecard-page">
        <div className="scorecard-container">
          <h2>Error</h2>
          <p>Quiz data not found. Please take the quiz first.</p>
          <Link to="/home">
            <button className="home-button">Go to Home</button>
          </Link>
        </div>
      </div>
    );
  }

  const {
    score = 0,
    correctAnswers = [],
    userAnswers = [],
    totalQuestions = 1,
    difficulty = 'Easy',
    timeUsed = 0
  } = location.state;

  const percentage = Math.round((score / totalQuestions) * 100);

  useEffect(() => {
    const insertToSupabase = async () => {
      const savedId = localStorage.getItem('scoreSaveId');
      if (savedId) return; // prevent duplicate insert

      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        console.warn('User not found in localStorage.');
        return;
      }

      const { name, email } = user;
      const insertId = uuidv4(); // generate unique ID

      const { error } = await supabase.from('quiz_results').insert([
        {
          id: insertId,
          name,
          email,
          difficulty,
          score,
          time_used: timeUsed,
          created_at: new Date().toISOString(),
          submitted_at: new Date().toISOString(),
        },
      ]);

      if (error) {
        console.error('❌ Error saving to Supabase:', error.message);
      } else {
        console.log('✅ Quiz result saved to Supabase');
        localStorage.setItem('scoreSaveId', insertId);
      }
    };

    insertToSupabase();
  }, []);

  return (
    <div className="scorecard-container">
      <UserProfileBar />
      <div className="score-header">
        <h1>Quiz Summary</h1>
        <p>Difficulty: <strong>{difficulty}</strong></p>
      </div>

      <div className="score-summary">
        <div className="score-percentage">{percentage}%</div>
        <p className="score-detail">You answered {score} out of {totalQuestions} questions correctly.</p>
        <p className="score-detail">Time Used: {timeUsed} seconds</p>
      </div>

      <div className="answers-review">
        <h2>Answer Review</h2>
        <table className="answers-table">
          <thead>
            <tr>
              <th>Q.No</th>
              <th>Your Answer</th>
              <th>Correct Answer</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {userAnswers.map((answer, index) => {
              const isCorrect = answer === correctAnswers[index];
              return (
                <tr key={index} className={isCorrect ? 'correct-row' : 'incorrect-row'}>
                  <td>{index + 1}</td>
                  <td>{answer}</td>
                  <td>{correctAnswers[index]}</td>
                  <td>{isCorrect ? 'Correct' : 'Incorrect'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="buttons">
        <Link to={`/quiz/${difficulty.toLowerCase()}`}>
          <button className="retry-button">Retry Quiz</button>
        </Link>
        <Link to="/home">
          <button className="home-button">Back to Home</button>
        </Link>
      </div>
    </div>
  );
};

export default ScoreCard;