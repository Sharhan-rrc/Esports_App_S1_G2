import { useState } from 'react'
import Dashboard from './components/dashboard/Dashboard'
import Login from './components/login/Login'
import Leaderboard from './components/leaderboard/Leaderboard'
import Profile from './components/profile/Profile'
import Admin from './components/Administration/Admin'
import { ChartNoAxesColumnIncreasing, House, Settings, UserRound } from 'lucide-react'

type View = 'dashboard' | 'leaderboard' | 'profile' | 'admin'

export interface GameCard {
  id: number
  name: string
  genre: string
  topPlayer: string
}

export interface LiveStream {
  id: number
  title: string
  game: string
  platform: string
}

const INITIAL_GAMES: GameCard[] = [
  { id: 1, name: 'Valorant', genre: 'FPS', topPlayer: 'AceHunter' },
  { id: 2, name: 'League of Legends', genre: 'MOBA', topPlayer: 'ShadowFox' },
  { id: 3, name: 'CS:GO', genre: 'FPS', topPlayer: 'NeonBlade' },
  { id: 4, name: 'Dota 2', genre: 'MOBA', topPlayer: 'MysticBlade' },
  { id: 5, name: 'Fortnite', genre: 'Battle Royale', topPlayer: 'PixelStorm' },
]

const INITIAL_STREAMS: LiveStream[] = [
  { id: 1, title: 'Valorant Finals', game: 'Valorant', platform: 'YouTube' },
  { id: 2, title: 'LoL Championship', game: 'League of Legends', platform: 'Twitch' },
  { id: 3, title: 'CS:GO Major', game: 'CS:GO', platform: 'YouTube' },
]

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [view, setView] = useState<View>('dashboard')

  // Shared state (Sprint 2)
  const [interestedGames, setInterestedGames] = useState<string[]>([])
  const [favouriteGames, setFavouriteGames] = useState<string[]>([])

  // Shared state (Sprint 2 extension) — managed from the Administration page,
  // read by Dashboard (and Leaderboard, for the game list)
  const [games, setGames] = useState<GameCard[]>(INITIAL_GAMES)
  const [liveStreams, setLiveStreams] = useState<LiveStream[]>(INITIAL_STREAMS)

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

  const handleAddGame = (game: Omit<GameCard, 'id'>) => {
    setGames((prev) => [...prev, { ...game, id: Date.now() }])
  }

  const handleRemoveGame = (id: number) => {
    setGames((prev) => prev.filter((g) => g.id !== id))
  }

  const handleAddLiveStream = (stream: Omit<LiveStream, 'id'>) => {
    setLiveStreams((prev) => [...prev, { ...stream, id: Date.now() }])
  }

  const handleRemoveLiveStream = (id: number) => {
    setLiveStreams((prev) => prev.filter((s) => s.id !== id))
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
          <button
            className={view === 'admin' ? 'app-nav__button app-nav__button--active' : 'app-nav__button'}
            type="button"
            onClick={() => setView('admin')}
            aria-label="Open administration"
            title="Administration"
          >
            <Settings aria-hidden="true" />
            <span>Admin</span>
          </button>
        </nav>
      </aside>
      <section className="app-content">
        {view === 'dashboard' && (
          <Dashboard
            games={games}
            liveStreams={liveStreams}
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
        {view === 'admin' && (
          <Admin
            games={games}
            liveStreams={liveStreams}
            favouriteGames={favouriteGames}
            onAddGame={handleAddGame}
            onRemoveGame={handleRemoveGame}
            onAddLiveStream={handleAddLiveStream}
            onRemoveLiveStream={handleRemoveLiveStream}
            onAddFavourite={handleAddFavourite}
            onRemoveFavourite={handleRemoveFavourite}
          />
        )}
      </section>
    </main>
  )
}

export default App
