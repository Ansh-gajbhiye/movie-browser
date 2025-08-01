import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import {  AppProvider } from './context/Context.jsx'
import ErrorBoundary from './ErrorBoundary.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AppProvider>
        <ErrorBoundary>
           <App />
        </ErrorBoundary>
      </AppProvider>
    </BrowserRouter>
  </StrictMode>,
)
