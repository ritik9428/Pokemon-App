import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Pokemon } from './Pokemon/Pokemon'
// import './index.css'
// import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <Pokemon />
  </StrictMode>,
)
