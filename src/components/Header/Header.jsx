import { Link, useNavigate } from 'react-router-dom';
import SearchBar from '../../components/SearchBar/SearchBar';
import Menu from '../../components/SearchBar/Menu';
import Signup from '../../components/Signup/Signup';
import Language from '../../components/language/Language';
import './Header.css';



const Header = () => {
  const navigate = useNavigate();
  const handleFavoriteClick = () => {
    navigate('/favorites');
  };
  const ainavigate = useNavigate();
  const handleAirecommendClick = () => {
    navigate('/AIRecommend');
  }
  return (
    <header className="app-header">
      <div className="navbar-container">
        <div className="navbar-left">
          <Link to="/" className="logo-link">
            <div className="logo-wrapper">
              <div className="logo-icon">🎬</div>
              <div className="logo-text">
                Movie<span>Hub</span>
              </div>
            </div>
          </Link>
        </div>
        <div className="navbar-center">
          <Menu />
          <div className="search-container">
            <SearchBar />
          </div>
        </div>
        <div className="navbar-right">
          <button className="airecommend" onClick={handleAirecommendClick}>AI Suggestion</button>

          <Signup />
          <Language />
          <div className="heartbtn">
             <button className="nav-btn favorite-btn" onClick={handleFavoriteClick}>
            <svg className="heart-icon" viewBox="0 0 24 24" >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </button>
          </div>
         
        </div>
      </div>
    </header>
  );
};

export default Header;