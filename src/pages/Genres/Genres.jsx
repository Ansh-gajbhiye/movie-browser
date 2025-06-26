import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MovieCard from '../../components/MovieCard/MovieCard';
import './Genres.css'; // Reuse Genres.css

const GenreMovies = () => {
  const { genreId } = useParams();
  const [movies, setMovies] = useState([]);
  const [genreName, setGenreName] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // Replace with your actual API call
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=YOUR_API_KEY&with_genres=${genreId}`
        );
        const data = await response.json();
        setMovies(data.results);
        
        // Get genre name
        const genresResponse = await fetch(
          'https://api.themoviedb.org/3/genre/movie/list?api_key=YOUR_API_KEY'
        );
        const genresData = await genresResponse.json();
        const genre = genresData.genres.find(g => g.id === Number(genreId));
        setGenreName(genre?.name || 'Genre');
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [genreId]);

  return (
    <div className="genre-movies-page">
      <h1>{genreName} Movies</h1>
      <div className="movies-grid">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default GenreMovies;