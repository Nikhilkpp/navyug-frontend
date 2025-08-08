import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthContextProvider } from './contexts/AuthContext.jsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>

      <App />
      <Toaster/>
    </AuthContextProvider>
  </StrictMode>,
)
