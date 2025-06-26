import { NavLink } from 'react-router-dom';
import { useGlobalContext } from '../../context/Context';
import './MovieCard.css';
import FavBtn from '../../pages/Favourite/Favbtn';

function MovieCard() {
  const { isLoading, isError, movie } = useGlobalContext();

  if (isLoading){
   return <div className="loading">Loading movies...</div>;
  }

  if(isError.show){
    return <div className="error">{isError.msg}</div>
  }

  if (!movie || !Array.isArray(movie)){
    return <div className="error">no movies found </div>;
  }

  return (
    <>
      {movie.map((curMovie) => (
        <NavLink 
          to={`/movies/${curMovie.imdbID}`}
          key={curMovie.imdbID}
          className="movie-card-link"
        >
          <div className="movie-card">
            <div className="image-container">
             
            <img
              src={curMovie.Poster !== "N/A" 
                ? curMovie.Poster 
                : "https://via.placeholder.com/300x450?text=No+Poster"} 
              alt={curMovie.Title} 
            />
              <FavBtn movie={curMovie}/>
            <div className="movie-info">
              <h3>{curMovie.Title}</h3>
              <span>{curMovie.Year}</span>
            </div> 
            </div>
          
          </div>
        </NavLink>
      ))}
    </>
  );
}

export default MovieCard;