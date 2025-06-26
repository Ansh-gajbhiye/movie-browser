import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import './AIRecommend.css';
import { useGlobalContext } from '../../context/Context';

const AIRecommend = () => {
  const { movie } = useGlobalContext();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userPreferences, setUserPreferences] = useState({
    genre: '',
    mood: '',
    era: ''
  });

  // Check for valid movie data
  if (!movie || !Array.isArray(movie)) {
    return (
      <div className="error">
        Movie data not available. Please try again later.
      </div>
    );
  }

  const getAIRecommendations = async () => {
    setLoading(true);
    try {
      const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const prompt = `
        Recommend 6 movies with these preferences:
        - Genre: ${userPreferences.genre || 'any'}
        - Mood: ${userPreferences.mood || 'any'}
        - Era: ${userPreferences.era ? userPreferences.era + '0s' : 'any'}
        
        Return only JSON format:
        {
          "movies": [
            {
              "Title": "Movie Name",
              "Year": "2020",
              "Genre": "Action, Adventure",
              "Reason": "Fits your preference...",
              "Poster": "URL or N/A"
            }
          ]
        }
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Enhanced JSON parsing
      let parsedData = { movies: [] };
      try {
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          parsedData = JSON.parse(jsonMatch[0]);
        }
      } catch (e) {
        console.error("JSON parsing error:", e);
      }

      // Validate and filter movies
      const validMovies = (parsedData.movies || []).filter(m => 
        m?.Title && typeof m.Title === 'string'
      );

      setRecommendations(validMovies.slice(0, 6));
    } catch (error) {
      console.error("AI recommendation failed:", error);
      getLocalRecommendations();
    } finally {
      setLoading(false);
    }
  };

  const getLocalRecommendations = () => {
    const filtered = movie.filter(m => (
      (!userPreferences.genre || m.Genre?.includes(userPreferences.genre)) &&
      (!userPreferences.era || m.Year?.includes(userPreferences.era))
    ));
    
    const sorted = [...filtered].sort((a, b) => 
      (parseFloat(b.imdbRating) || 0) - (parseFloat(a.imdbRating) || 0)
    ).slice(0, 6);
    
    setRecommendations(sorted);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserPreferences(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="ai-recommend-container">
      <div className="ai-header">
        <h1>AI Movie Recommendations</h1>
        <p>Get personalized movie suggestions based on your preferences</p>
      </div>

      <div className="preference-selector">
        <div className="preference-group">
          <label>Genre</label>
          <select 
            name="genre" 
            value={userPreferences.genre}
            onChange={handleInputChange}
          >
            <option value="">Any Genre</option>
            <option value="Action">Action</option>
            <option value="Comedy">Comedy</option>
            <option value="Drama">Drama</option>
            <option value="Sci-Fi">Sci-Fi</option>
            <option value="Horror">Horror</option>
          </select>
        </div>

        <div className="preference-group">
          <label>Mood</label>
          <select 
            name="mood" 
            value={userPreferences.mood}
            onChange={handleInputChange}
          >
            <option value="">Any Mood</option>
            <option value="Happy">Happy/Uplifting</option>
            <option value="Thoughtful">Thoughtful</option>
            <option value="Exciting">Exciting</option>
            <option value="Relaxing">Relaxing</option>
          </select>
        </div>

        <div className="preference-group">
          <label>Era</label>
          <select 
            name="era" 
            value={userPreferences.era}
            onChange={handleInputChange}
          >
            <option value="">Any Era</option>
            <option value="199">1990s</option>
            <option value="200">2000s</option>
            <option value="201">2010s</option>
            <option value="202">2020s</option>
          </select>
        </div>

        <button 
          className="generate-btn"
          onClick={getAIRecommendations}
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Get Recommendations'}
        </button>
      </div>

      {loading && (
        <div className="loading-indicator">
          <div className="loader"></div>
          <p>Analyzing preferences with AI...</p>
        </div>
      )}

      {recommendations.length > 0 ? (
        <div className="recommendations-grid">
          <h2>Your Personalized Recommendations</h2>
          <div className="movies-grid">
            {recommendations.map((movie) => (
              <div className="recommended-movie" 
                   key={movie.imdbID || `${movie.Title}-${movie.Year}`}>
                <img 
                  src={movie.Poster && movie.Poster !== "N/A" 
                    ? movie.Poster 
                    : "https://via.placeholder.com/300x450?text=No+Poster"} 
                  alt={movie.Title || "Movie poster"} 
                  onError={(e) => {
                    e.target.src = '/placeholder-movie.jpg';
                  }}
                />
                <div className="movie-info">
                  <h3>{movie.Title || "Untitled Movie"}</h3>
                  <p>
                    {movie.Year || "Unknown Year"} • 
                    {(movie.Genre?.split(',')[0] || 'Unknown Genre')}
                  </p>
                  <p>⭐ {movie.imdbRating || 'N/A'}</p>
                  {movie.Reason && (
                    <p className="reason">{movie.Reason}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        !loading && (
          <div className="empty-state">
            <div className="ai-icon">
              <svg viewBox="0 0 24 24">
                <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M7.07,18.28C7.5,17.38 10.12,16.5 12,16.5C13.88,16.5 16.5,17.38 16.93,18.28C15.57,19.36 13.86,20 12,20C10.14,20 8.43,19.36 7.07,18.28M18.36,16.83C16.93,15.09 13.46,14.5 12,14.5C10.54,14.5 7.07,15.09 5.64,16.83C4.62,15.5 4,13.82 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,13.82 19.38,15.5 18.36,16.83M12,6C10.06,6 8.5,7.56 8.5,9.5C8.5,11.44 10.06,13 12,13C13.94,13 15.5,11.44 15.5,9.5C15.5,7.56 13.94,6 12,6M12,11A1.5,1.5 0 0,1 10.5,9.5A1.5,1.5 0 0,1 12,8A1.5,1.5 0 0,1 13.5,9.5A1.5,1.5 0 0,1 12,11Z" />
              </svg>
            </div>
            <h3>No recommendations yet</h3>
            <p>Select your preferences and click "Get Recommendations"</p>
          </div>
        )
      )}
    </div>
  );
};

export default AIRecommend;