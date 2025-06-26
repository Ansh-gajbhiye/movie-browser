import React, { useState } from 'react';
import './Favourite.css';
import { useGlobalContext } from '../../context/Context';

const FavBtn = ({ movie }) => {
  const { addToFavorites, removeFromFavorites, favorites } = useGlobalContext();
  const isFavorite = favorites.some((fav) => fav.imdbID === movie.imdbID);

  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if(isFavorite){
      removeFromFavorites(movie.imdbID);
    }else{
      addToFavorites(movie);
    }
  };

  return (
    <button 
      className={`fav-btn ${isFavorite ? 'active' : ''}`}
      onClick={toggleFavorite}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <svg 
        className="heart-icon" 
        viewBox="0 0 24 24"
        fill={isFavorite ? '#ff4d4d' : 'none'}
        stroke={isFavorite ? '#ff4d4d' : 'currentColor'}
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="2" 
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
        />
      </svg>
    </button>
  );
};

export default FavBtn;