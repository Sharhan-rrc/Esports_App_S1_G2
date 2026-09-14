import { useState } from 'react'
import Dashboard from './components/dashboard/Dashboard'
import Login from './components/login/Login'
import Leaderboard from './components/leaderboard/Leaderboard'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />
  }

  return (
    <>
      <Dashboard />
      <Leaderboard />
    </>
  )
}

export default App