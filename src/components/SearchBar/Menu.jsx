import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { NavLink } from 'react-router-dom';
import { genreMap } from '../../pages/Genres/GenreMap';
import './Menu.css';

const Menu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const genres = Object.keys(genreMap);

  return (
    <>
      <button
        className="nav-btn menu-btn"
        onClick={() => setIsMenuOpen(prev => !prev)}
        aria-label="Toggle menu"
      >
        <svg className="menu-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
        </svg>
        <span>Menu</span>
      </button>

      {isMenuOpen && createPortal(
        <div className="menu-overlay" role="dialog" aria-modal="true">
          <div className="menu-header">
            <button
              className="close-btn"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </button>
          </div>

          <div className="menu-content">
            <div className="menu-section">
              <h3>Movies by Genre</h3>
              <ul className="genre-list">
                {genres.map(genreKey => (
                  <li key={genreKey}>
                    <NavLink
                      to={`/genres/${genreKey}`}
                      onClick={() => setIsMenuOpen(false)}
                      className={({ isActive }) => 
                        isActive ? 'active-genre' : ''
                      }
                    >
                      {genreKey.charAt(0).toUpperCase() + genreKey.slice(1)}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="menu-section">
              <h3>Movies</h3>
              <ul>
                <li>
                  <NavLink 
                    to="/movies/popular" 
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Popular Movies
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/movies/top-rated" 
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Top Rated
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/movies/upcoming" 
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Upcoming
                  </NavLink>
                </li>
              </ul>
            </div>

            <div className="menu-section">
              <h3>More</h3>
              <ul>
                <li>
                  <NavLink 
                    to="/about" 
                    onClick={() => setIsMenuOpen(false)}
                  >
                    About
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/contact" 
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Contact
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default Menu;
