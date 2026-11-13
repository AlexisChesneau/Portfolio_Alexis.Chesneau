import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Polices auto-hébergées (pas de requête vers Google : meilleur score Lighthouse et RGPD)
import '@fontsource-variable/inter'
import '@fontsource-variable/jetbrains-mono'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
