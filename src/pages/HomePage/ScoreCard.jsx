import React, { useEffect, useState, useRef } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import './ScoreCard.css';
import UserProfileBar from '../../components/UserProfileBar';
import { supabase } from '../../supabaseClient';
import confetti from 'canvas-confetti';
import { FaShareAlt, FaRedo, FaHome, FaListOl, FaCheck, FaTimes } from 'react-icons/fa';

const ScoreCard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const hasInserted = useRef(false);
  const [averageTime, setAverageTime] = useState(0);

  if (!location.state) {
    return (
      <div className="scorecard-page">
        <div className="scorecard-container">
          <h2>Error</h2>
          <p>Quiz data not found. Please take the quiz first.</p>
          <Link to="/home">
            <button className="home-button"><FaHome /> Go to Home</button>
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
  const correctCount = score;
  const incorrectCount = totalQuestions - score;

  useEffect(() => {
    if (percentage >= 80) {
      confetti({ particleCount: 120, spread: 80 });
    }

    const insertToSupabase = async () => {
      if (hasInserted.current) return; // ✅ Skip second effect run
      hasInserted.current = true;

      console.log("🔹 insertToSupabase called");

      const savedId = localStorage.getItem('scoreSaveId');
      if (savedId) {
        console.log("Skipping insert, found Saved ID:", savedId);
        return;
      }

      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        console.error("User not found in localStorage");
        return;
      }

      const { name, email } = user;

      const { data, error } = await supabase
        .from('quiz_results')
        .insert([
          {
            name,
            email,
            difficulty,
            score,
            percentage,
            total_questions: totalQuestions,
            time_used: timeUsed,
            submitted_at: new Date().toISOString(),
            created_at: new Date().toISOString(),
          },
        ])
        .select('id');

      if (error) {
        console.error('❌ Error saving to Supabase:', error.message);
      } else if (data && data[0]) {
        console.log('✅ Quiz result saved to Supabase');
        localStorage.setItem('scoreSaveId', data[0].id);
      }
    };

    const fetchAverageTime = async () => {
      const { data: allResults, error } = await supabase
        .from('quiz_results')
        .select('time_used');

      if (error) {
        console.error("❌ Error fetching average time:", error.message);
        return;
      }

      const totalTime = allResults?.reduce((acc, r) => acc + (r.time_used || 0), 0);
      setAverageTime(allResults?.length ? Math.round(totalTime / allResults.length) : 0);
    };

    insertToSupabase();
    fetchAverageTime();
  }, []);

  const handleRetry = () => {
    localStorage.removeItem('scoreSaveId');
    navigate(`/quiz/${difficulty.toLowerCase()}`, { state: { retry: true } });
  };

  const handleBackHome = () => {
    localStorage.removeItem('scoreSaveId');
    navigate('/home');
  };

  const handleShare = () => {
    const appLink = "https://your-app-link.com";
    const text = `I just scored ${percentage}% in EduNexa Math Quiz (${difficulty})! 🏆\n\nTry it out here: ${appLink}`;

    navigator.clipboard.writeText(text)
      .then(() => alert('✅ Score & link copied! Share it with friends.'))
      .catch(() => alert('❌ Failed to copy score. Please try again.'));
  };

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
        <p className="score-detail">Correct: {correctCount} | Incorrect: {incorrectCount}</p>
        <p className="score-detail">Time Used: {timeUsed}s</p>
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
                  <td>{isCorrect ? <FaCheck color="green" /> : <FaTimes color="red" />}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="feedback-message">
        {percentage >= 80 && "Awesome! You're a math pro!"}
        {percentage >= 50 && percentage < 80 && "Good job! Aim for a higher score next time."}
        {percentage < 50 && "Keep practicing and you'll improve!"}
      </div>

      <div className="buttons">
        <button className="retry-button" onClick={handleRetry}><FaRedo /> Retry Quiz</button>
        <button className="home-button" onClick={handleBackHome}><FaHome /> Back to Home</button>
        <Link to="/leaderboard"><button className="leaderboard-button"><FaListOl /> View Leaderboard</button></Link>
        <button className="share-button" onClick={handleShare}><FaShareAlt /> Share Score</button>
      </div>
    </div>
  );
};

export default ScoreCard;