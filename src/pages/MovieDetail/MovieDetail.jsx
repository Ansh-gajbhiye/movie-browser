import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGlobalContext } from '../../context/Context';
import './MovieDetail.css';


const MovieDetail = () => {
  const { movieId } = useParams();
  const { 
    isLoading, 
    isError, 
    selectedMovie, 
    getMovieDetails,
    setSelectedMovie
  } = useGlobalContext();
  
  useEffect(() => {
    
    setSelectedMovie(null);
    if (movieId) {
      getMovieDetails(movieId);
    }
  }, [movieId, getMovieDetails, setSelectedMovie]);

  if (isLoading && !selectedMovie) {
    return <div className="loading">Loading movie details...</div>;
  }

  if (isError.show) {
    return <div className="error">{isError.msg}</div>;
  }

  if (!selectedMovie) {
    return <div className="error">Movie not found</div>;
  }

  return (
    <div className="movie-detail-container">
      <div className="movie-detail-content">
        <div className="movie-poster-container">
          <div className="movie-poster">
            <img 
              src={selectedMovie.Poster !== "N/A" ? selectedMovie.Poster : "https://via.placeholder.com/300x450?text=No+Poster"} 
              alt={selectedMovie.Title} 
            />
          </div>
        </div>

        <div className="movie-info-container">
          <h1>{selectedMovie.Title} <span>({selectedMovie.Year})</span></h1>
          
          <div className="movie-meta">
            <span className="rating">
              {selectedMovie.imdbRating}/10 (IMDb)
            </span>
            {selectedMovie.Ratings?.map((rating, index) => (
              <span key={index}>
                {rating.Source}: {rating.Value}
              </span>
            ))}
            <span>{selectedMovie.Rated}</span>
            <span>{selectedMovie.Runtime}</span>
            <span>{selectedMovie.Genre}</span>
          </div>

          <div className="movie-description">
            <h3>Overview</h3>
           
            <p>{selectedMovie.Plot}</p>
          </div>

          <div className="movie-details-grid">
            <div className="detail-item">
              <h4>Release Date</h4>
              <p>{selectedMovie.Released}</p>
            </div>
            <div className="detail-item">
              <h4>Director</h4>
              <p>{selectedMovie.Director}</p>
            </div>
            <div className="detail-item">
              <h4>Writers</h4>
              <p>{selectedMovie.Writer}</p>
            </div>
            <div className="detail-item">
              <h4>Cast</h4>
              <p>{selectedMovie.Actors}</p>
            </div>
            <div className="detail-item">
              <h4>Awards</h4>
              <p>{selectedMovie.Awards}</p>
            </div>
            <div className="detail-item">
              <h4>Language</h4>
              <p>{selectedMovie.Language}</p>
            </div>
            <div className="detail-item">
              <h4>Country</h4>
              <p>{selectedMovie.Country}</p>
            </div>
            <div className="detail-item">
              <h4>Box Office</h4>
              <p>{selectedMovie.BoxOffice}</p>
            </div>
          </div>

          <button className="watch-btn">
            <i className="fas fa-play"></i> Watch Trailer
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;