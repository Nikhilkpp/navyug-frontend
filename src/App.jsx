import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './Home'
import HomeT from './HomeT'
import Home2 from './Home2'
import NewsPage from './NewsPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {/* <Home/> */}
    {/* <HomeT/> */}
    <Home2/>
    {/* <NewsPage/> */}
    </>
  )
}

export default App
