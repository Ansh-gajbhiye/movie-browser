import React from 'react';
import './Favourite.css';
import FavBtn from './Favbtn';
import { NavLink } from 'react-router-dom';
import { useGlobalContext } from '../../context/Context';

const Favourite = () => {
  const { favorites } = useGlobalContext();

  return (
    <div className="favorites-container">
      <h1 className="favorites-title">Your Favorites</h1>
      {favorites.length === 0 ? (
        <div className="empty-state">
          <p>No favorites yet! Click the heart icon on movies to add them here.</p>
        </div>
      ) : (
        <div className="favorites-grid">
          {favorites.map((movie) => (
            <div className="favorite-card" key={movie.imdbID}>
              <NavLink to={`/movies/${movie.imdbID}`} className="movie-link">
                <img
                  src={movie.Poster !== "N/A" 
                    ? movie.Poster 
                    : "https://via.placeholder.com/300x450?text=No+Poster"}
                  alt={movie.Title}
                  className="favorite-poster"
                />
              </NavLink>
              <div className="favorite-info">
                <h3>{movie.Title}</h3>
                <p>{movie.Year}</p>
                <FavBtn movie={movie} className="favorite-btn" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favourite;