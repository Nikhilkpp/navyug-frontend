import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthContextProvider } from './contexts/AuthContext.jsx'
import { Toaster } from 'react-hot-toast'
import CookieConsent from './components/cookieConsent.jsx'
import CookieWarning from './components/cookieWarning.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>

      <CookieWarning/>
      <App />
      <Toaster/>
    </AuthContextProvider>
  </StrictMode>,
)
