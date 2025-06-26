import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './Signup.css';

const Signup = () => {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignIn, setIsSignIn] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted:', { email, password });
   
  };

  const ModalPortal = ({ children }) => {
    return ReactDOM.createPortal(
      children,
      document.getElementById('modal-root')
    );
  };

  return (
    <>
      {/* Sign In/Up button in navbar */}
      <button 
        className="nav-btn signup-btn"
        onClick={() => setShowModal(true)}
      >
        {isSignIn ? 'Sign In' : 'Sign Up'}
      </button>

      {/* Modal rendered via portal */}
      {showModal && (
        <ModalPortal>
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                &times;
              </button>
              
              <h2>{isSignIn ? 'Sign In' : 'Sign Up'}</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                
                <button type="submit" className="submit-btn">
                  {isSignIn ? 'Sign In' : 'Sign Up'}
                </button>
              </form>
              
              <div className="auth-toggle">
                {isSignIn ? "Don't have an account? " : "Already have an account? "}
                <button 
                  type="button" 
                  className="toggle-btn"
                  onClick={() => setIsSignIn(!isSignIn)}
                >
                  {isSignIn ? 'Sign Up' : 'Sign In'}
                </button>
              </div>
            </div>
          </div>
        </ModalPortal>
      )}
    </>
  );
};

export default Signup;