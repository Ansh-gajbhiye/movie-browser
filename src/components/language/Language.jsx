import React, { useState } from 'react';
import './Language.css';

const Language = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('EN');
  
  const languages = [
    { code: 'EN', name: 'English' },
    { code: 'ES', name: 'Español' },
    { code: 'FR', name: 'Français' },
    { code: 'DE', name: 'Deutsch' },
    { code: 'JA', name: '日本語' },
  ];

  const toggleDropdown = () => setIsOpen(!isOpen);
  const selectLanguage = (lang) => {
    setSelectedLanguage(lang.code);
    setIsOpen(false);
    // Add your language change logic here
  };

  return (
    <div className="language-selector">
      <button 
        className="nav-btn language-btn"
        onClick={toggleDropdown}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {selectedLanguage}
        <svg 
          className={`dropdown-icon ${isOpen ? 'open' : ''}`} 
          viewBox="0 0 24 24"
        >
          <path d="M7 10l5 5 5-5z" />
        </svg>
      </button>

      {isOpen && (
        <div className="language-dropdown">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`language-option ${selectedLanguage === lang.code ? 'selected' : ''}`}
              onClick={() => selectLanguage(lang)}
            >
              <span className="language-code">{lang.code}</span>
              <span className="language-name">{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Language;