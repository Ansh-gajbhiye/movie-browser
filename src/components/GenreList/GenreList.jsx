// src/components/GenreList/GenreList.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './GenreList.css';

const GenreList = () => {
  const [showGenres, setShowGenres] = useState(false);
  
  const genres = [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
    // ... other genres
  ];

  return (
    <div className="genre-menu">
      <button 
        className="genre-menu-btn"
        onClick={() => setShowGenres(!showGenres)}
      >
        Browse Genres
      </button>

      {showGenres && (
        <div className="genre-dropdown">
          {genres.map(genre => (
            <Link
              key={genre.id}
              to={`/genres/${genre.id}`}
              className="genre-link"
              onClick={() => setShowGenres(false)}
            >
              {genre.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default GenreList;