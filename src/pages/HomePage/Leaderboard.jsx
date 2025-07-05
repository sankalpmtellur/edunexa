import React, { useEffect, useState } from 'react';
import './Leaderboard.css';
import { supabase } from '../../supabaseClient';
import UserProfileBar from '../../components/UserProfileBar';
import { Link } from 'react-router-dom';

const Leaderboard = () => {
  const [results, setResults] = useState([]);
  const [difficulty, setDifficulty] = useState('Easy');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      const { data, error } = await supabase
        .from('quiz_results')
        .select('*');

      if (error) {
        console.error('Error fetching data:', error.message);
      } else {
        setResults(data);
      }

      setLoading(false);
    };

    fetchResults();
  }, []);

  const filteredResults = results
    .filter((res) => res.difficulty.toLowerCase() === difficulty.toLowerCase())
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.time_used - b.time_used;
    });

  return (
    <div>
      <UserProfileBar />
      <div className="leaderboard-container">
        <h2 className="leaderboard-title">Leaderboard</h2>

        <div className="tab-buttons">
          {['Easy', 'Medium', 'Hard'].map((level) => (
            <button
              key={level}
              className={`tab-button ${difficulty === level ? 'active' : ''}`}
              onClick={() => setDifficulty(level)}
            >
              {level}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="loading-text">Loading...</p>
        ) : filteredResults.length === 0 ? (
          <p className="no-data-text">No results for {difficulty} level yet.</p>
        ) : (
          <div className="table-wrapper">
            <table className="leaderboard-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Name</th>
                  <th>Score</th>
                  <th>Time (s)</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredResults.map((entry, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{entry.name}</td>
                    <td>{entry.score}</td>
                    <td>{entry.time_used}</td>
                    <td>{new Date(entry.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="back-button-wrapper">
          <Link to="/home">
            <button className="back-button">Back to Home</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;