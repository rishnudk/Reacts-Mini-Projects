import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'react-confirm-alert/src/react-confirm-alert.css';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    

  </StrictMode>,
)
