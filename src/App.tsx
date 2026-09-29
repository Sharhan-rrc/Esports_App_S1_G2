import { useState } from 'react'
import Dashboard from './components/dashboard/Dashboard'
import Login from './components/login/Login'
import Leaderboard from './components/leaderboard/Leaderboard'
import Profile from './components/profile/Profile'
import { ChartNoAxesColumnIncreasing, House, UserRound } from 'lucide-react'

type View = 'dashboard' | 'leaderboard' | 'profile'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [view, setView] = useState<View>('dashboard')

  // Shared state (Sprint 2)
  // 1. interestedGames -> selected in Login
  const [interestedGames, setInterestedGames] = useState<string[]>([])
  // 2. favouriteGames -> added in Dashboard, shown + removable in Profile
  const [favouriteGames, setFavouriteGames] = useState<string[]>([])

  const handleLogin = () => {
    setInterestedGames([])
    setIsLoggedIn(true)
    setView('dashboard')
  }

  const handleAddFavourite = (game: string) => {
    setFavouriteGames((prev) => (prev.includes(game) ? prev : [...prev, game]))
  }

  const handleRemoveFavourite = (game: string) => {
    setFavouriteGames((prev) => prev.filter((g) => g !== game))
  }

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <main className="app-shell">
      <aside className="app-sidebar">
        <div className="app-brand">
          <span className="app-brand__name">Esports App</span>
        </div>
        <nav className="app-nav" aria-label="App sections">
          <button
            className={view === 'dashboard' ? 'app-nav__button app-nav__button--active' : 'app-nav__button'}
            type="button"
            onClick={() => setView('dashboard')}
            aria-label="Open dashboard"
            title="Dashboard"
          >
            <House aria-hidden="true" />
            <span>Dashboard</span>
          </button>
          <button
            className={view === 'leaderboard' ? 'app-nav__button app-nav__button--active' : 'app-nav__button'}
            type="button"
            onClick={() => setView('leaderboard')}
            aria-label="Open leaderboard"
            title="Leaderboard"
          >
            <ChartNoAxesColumnIncreasing aria-hidden="true" />
            <span>Leaderboard</span>
          </button>
          <button
            className={view === 'profile' ? 'app-nav__button app-nav__button--active' : 'app-nav__button'}
            type="button"
            onClick={() => setView('profile')}
            aria-label="Open profile"
            title="Profile"
          >
            <UserRound aria-hidden="true" />
            <span>Profile</span>
          </button>
        </nav>
      </aside>
      <section className="app-content">
        {view === 'dashboard' && (
          <Dashboard
            interestedGames={interestedGames}
            favouriteGames={favouriteGames}
            onAddFavourite={handleAddFavourite}
          />
        )}
        {view === 'leaderboard' && <Leaderboard />}
        {view === 'profile' && (
          <Profile
            favouriteGames={favouriteGames}
            onRemoveFavourite={handleRemoveFavourite}
          />
        )}
      </section>
    </main>
  )
}

export default App
