import { useState } from 'react'
import Dashboard from './components/dashboard/Dashboard'
import Login from './components/login/Login'
import Navigation from './components/navigation/Navigation'
import Profile from './components/profile/Profile'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showProfile, setShowProfile] = useState(false)

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />
  }

  return (
    <>
      <Navigation showProfile={showProfile} onViewChange={setShowProfile} />
      {showProfile ? <Profile /> : <Dashboard />}
    </>
  )
}

export default App