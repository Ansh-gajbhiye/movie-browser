import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useGlobalContext } from '../../context/Context';
import MovieCard from '../../components/MovieCard/MovieCard';
import { genreMap } from './GenreMap';

const GenreMovie = () => {
  const { genre } = useParams();
  const { movie = [], isLoading, isError } = useGlobalContext();

  const filteredMovies = useMemo(() => {
   const LowerGenre = genre?.toLowerCase()||'';
   const {keywords =[], titles = []}= genreMap[LowerGenre]||{};

   return movie.filter(movieItem=>{
    const lowerTitle=movieItem.Title?.toLowerCase()||'';
    const lowerPlot =movieItem.Plot?.toLowerCase()||'';

    if (titles.some(t=>t.toLowerCase()===lowerTitle)) return true;
    
    return keywords.some(keyword=>
      lowerTitle.includes(keyword)||lowerPlot.includes(keyword)
    );
   });
  }, [movie, genre]);

  if (isLoading) {
    return <div className="loading">Loading {genre || 'genre'} movies...</div>;
  }

  if (isError?.show) {
    return <div className="error">{isError.msg || 'Something went wrong'}</div>;
  }

  if (filteredMovies.length === 0) {
    return (
      <div className="no-movies">
        <h2>No {genre || 'genre'} movies found</h2>
        <p>Try another genre or check back later.</p>
      </div>
    );
  }
  console.log(movie[0]?.Genre); 
  return (
    <div className="genre-movie-page">
      <h1 className="genre-title">{genre || 'Genre'} Movies</h1>
      <div className="movies-grid" role="list">
        {filteredMovies.map(movieItem => (
          <MovieCard key={movieItem.imdbID} movie={movieItem} role="listitem" />
        ))}
      </div>
    </div>
  );
};

export default GenreMovie;