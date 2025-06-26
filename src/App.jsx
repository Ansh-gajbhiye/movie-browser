import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import GenreMovie from './pages/Genres/GenreMovie';
import MovieDetail from './pages/MovieDetail/MovieDetail';
import './index.css';
import Favourite from './pages/Favourite/Favourite';
import AIRecommend from './pages/AIRecommend/AIRecommend'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/genres/:genre" element={ <GenreMovie />} />
        <Route path="/movies/:movieId" element={<MovieDetail />} />
        <Route path="/favorites" element={<Favourite/>} />
        <Route path="/AIRecommend" element={<AIRecommend/>}/>
      </Routes>
    </>
  );
}

export default App;