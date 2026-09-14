import { useState } from 'react'
import Dashboard from './components/dashboard/Dashboard'
import Login from './components/login/Login'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return isLoggedIn ? (
    <Dashboard />
  ) : (
    <Login onLogin={() => setIsLoggedIn(true)} />
  )
}

export default App