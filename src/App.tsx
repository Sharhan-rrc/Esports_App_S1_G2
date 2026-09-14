import { useState } from 'react'
import Dashboard from './components/dashboard/Dashboard'
import Login from './components/login/Login'
import Leaderboard from './components/leaderboard/Leaderboard'
import Profile from './components/profile/Profile'

type View = 'dashboard' | 'leaderboard' | 'profile'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [view, setView] = useState<View>('dashboard')

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />
  }

  return (
    <main className="app-shell">
      <nav className="app-nav" aria-label="App sections">
        <button
          className={view === 'dashboard' ? 'app-nav__button app-nav__button--active' : 'app-nav__button'}
          type="button"
          onClick={() => setView('dashboard')}
          aria-label="Open dashboard"
          title="Dashboard"
        >
          <span aria-hidden="true">⌂</span>
          Dashboard
        </button>
        <button
          className={view === 'leaderboard' ? 'app-nav__button app-nav__button--active' : 'app-nav__button'}
          type="button"
          onClick={() => setView('leaderboard')}
          aria-label="Open leaderboard"
          title="Leaderboard"
        >
          <span aria-hidden="true">★</span>
          Leaderboard
        </button>
        <button
          className={view === 'profile' ? 'app-nav__button app-nav__button--active' : 'app-nav__button'}
          type="button"
          onClick={() => setView('profile')}
          aria-label="Open profile"
          title="Profile"
        >
          <span aria-hidden="true">●</span>
          Profile
        </button>
      </nav>
      {view === 'dashboard' && <Dashboard />}
      {view === 'leaderboard' && <Leaderboard />}
      {view === 'profile' && <Profile />}
    </main>
  )
}

export default App