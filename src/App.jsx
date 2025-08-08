import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './Home'
import HomeT from './HomeT'
import Home2 from './Home2'
import NewsPage from './NewsPage'
import FocusInput from './Test'
import Admin from './Admin'
import Login from './Login'
import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom'
import { useAuthContext } from './contexts/AuthContext'


function App() {
  const [count, setCount] = useState(0)
  const {authUser}=useAuthContext();

  return (
    <>
    
  
    {/* <Home/> */}
    {/* <HomeT/> */}
    {/* <Home2/>   */}
    {/* <NewsPage/> */}
    {/* <SimpleEditor/> */}
    {/* <FocusInput/> */}
    {/* <Admin/> */}
    {/* <Login/> */}
    <Router>
      <Routes>
        <Route path='/' element={authUser.isActive ? <Navigate to='/dashboard'/> :<Navigate to='/login'/>}/>
        <Route path='/login' element={authUser.isActive ? <Navigate to='/dashboard'/> :<Login/>}/>
        <Route path='/dashboard' element={
          authUser.isActive ? <Admin/> :<Navigate to='/login'/>
          }/>
      </Routes>
    </Router>

    
    </>
  )
}

export default App
