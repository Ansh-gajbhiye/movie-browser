import React, { useContext, useEffect, useState, useCallback } from "react";

const API_KEY = '7e732dd5';
const POPULAR_SEARCH_TERMS = ['action', 'comedy', 'drama', 'adventure', 'sci-fi'];

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const [isError, setIsError] = useState({ show: false, msg: "" });
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [favorites,setFavorites] = useState([]);
  
  const getMovies = useCallback(async (searchTerm) => {
    try {
      setLoading(true);
      setIsError({ show: false, msg: "" });
      
      let term;
      let url;
      
      if (searchTerm) {
        term = encodeURIComponent(searchTerm);
        url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${term}&type=movie`;
      } else {
        term = POPULAR_SEARCH_TERMS[Math.floor(Math.random() * POPULAR_SEARCH_TERMS.length)];
        url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${term}&type=movie&y=2023`;
      }
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.Response === "True") {
        setMovie(data.Search);
      } else {
        setIsError({
          show: true,
          msg: data.Error || "No movies found",
        });
        setMovie([]);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setIsError({
        show: true,
        msg: "Failed to fetch movies. Please try again later.",
      });
      setMovie([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const getMovieDetails = useCallback(async (imdbID) => {
    try {
      setLoading(true);
      setIsError({ show: false, msg: "" });
      
      const url = `https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}&plot=full`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.Response === "True") {
        setSelectedMovie(data);
      } else {
        setIsError({
          show: true,
          msg: data.Error || "Movie details not found",
        });
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setIsError({
        show: true,
        msg: "Failed to fetch movie details. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  }, []);

    const addToFavorites=(movie)=>{
      setFavorites((prev) => [...prev, movie]);
    };
    const removeFromFavorites = (imdbID) => {
      setFavorites((prev) => prev.filter((movie) => movie.imdbID !== imdbID));
    };

  useEffect(() => {
    getMovies();
  }, [getMovies]);

  return (
    <AppContext.Provider value={{ 
      isLoading, 
      isError, 
      movie, 
      selectedMovie,
      getMovies, 
      getMovieDetails,
      setSelectedMovie,
      favorites,
      addToFavorites,
      removeFromFavorites,
    }}>
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };