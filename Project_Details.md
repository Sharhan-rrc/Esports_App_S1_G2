--- Group 2 Team Freeze - Section-1 ---

- Parneet Kaur
- Sharhan Kaji
- Rudra Patel

--  Summary With Clear Team Tasks  --

Project: Esports App (Demo Version)
A simple esports-themed web application built with React. After the mock login, users can switch between the dashboard, leaderboard, and player profile from the dark sidebar navigation.

Team Responsibilities -

-----------------------------------------

1. Rudra — Player Profile System
Build the User Profile Page

Display user’s:

Username

Games played

Personal scores

Performance summaries

Add simple UI cards for each game

Keep data static or mock JSON (no backend required)

-------------------------------------------

2. Sharhan - Leaderboard Feature
Build the Leaderboard Page

User selects a game and sees:

Top players

Rank numbers

Highest scores or achievements

Add sorting or filtering (optional)

Use mock data for players and scores

-------------------------------------------

3. Parneet - Main Dashboard
Build the Dashboard / Home Page

Show:

List of games (grid or cards)

Top players preview

Featured esports live streams (YouTube embeds or placeholder images)

Add a “Live Videos” or “Featured Streams” section

Shared Feature
Login Page (All Members)
Simple login UI (email + password)

No real authentication - just a mock login that opens the app dashboard

Integration responsibility (All Members)

- Keep shared state in `App.tsx` and pass it to the page that displays or edits it.
- Keep shared data types in one module so Dashboard, Administration, and other pages use the same shape.
- Confirm that navigation reaches every completed page, including Administration.

Administration ownership: To be assigned by the team. The owner should also connect the Administration forms to the shared state and verify that changes appear on Dashboard.

Navigation
Shared app navigation connects the Dashboard, Leaderboard, and Profile views.

Visual Direction
The app uses a dark charcoal theme with gold navigation accents. Purple, blue, green, and red are reserved for actions and status information.

Rough Checklist -

-----------------------------------------------

--- Sprint 2 Update ---

Each page now includes a form, a loop/list, add-or-remove (or show/hide) behaviour, shared state, and works with the existing navigation.

1. Login (Shared)
After the mock login submit, a pop-up shows a loop of games with checkboxes. The selected games are saved to shared state `interestedGames` and the user is redirected to the Dashboard.

2. Dashboard — Parneet
Shows `interestedGames` from Login (falls back to the full game list if none were picked). Adds a form to pick a game and add it to `favouriteGames` (shared state), with a loop showing current favourites.

3. Leaderboard — Sharhan
Now supports multiple games (Valorant, League of Legends, CS:GO, Dota 2, Fortnite) with a form to pick which game's board to view, and a loop of randomly generated players/scores for that game. No favourites here, as planned.

4. Profile — Rudra
Adds a form to add personal game stats to a loop of personal games, plus a loop of `favouriteGames` (from Dashboard) with a remove button on each entry.

Shared State (in App)
- `interestedGames` — set in Login, read in Dashboard
- `favouriteGames` — set in Dashboard or Administration, read and updated (add/remove) in Profile and Administration
- `games` — the master game list, added to/removed from in Administration, read by Dashboard (Featured Games) and Leaderboard (game selectors)
- `liveStreams` — added to/removed from in Administration, read by Dashboard (Live Streams)

--- Sprint 2 Extension: Administration Page ---

A new Administration page was added alongside Dashboard, Leaderboard, and Profile.

- **Add Game** form (name, genre, top player) — new games appear immediately in the Dashboard's Featured Games section and in every game dropdown (Leaderboard, Add Favourite). Games can also be removed here.
- **Add Live Stream** form (title, game, platform) — new streams appear immediately in the Dashboard's Live Streams section. Streams can also be removed here.
- **Favourite Games** form — the same add-favourite action available on the Dashboard is also available here, plus the ability to remove a favourite, so favourites can be managed from either page.

Leaderboard was also extended with an **Add Score** form: pick any game from the list, enter a player name and score, and it's inserted into that game's scoreboard (re-sorted by score) — available for every game in the list, not just Valorant.

Visual Direction Update
All pages — Login, Dashboard, Leaderboard, and Profile — share one dark + gold theme, matching the original Login page. Small icon badges (in the gold accent colour) are used as lightweight game "logos" instead of official esports logos, which are trademarked and shouldn't be reproduced.

-----------------------------------------

## Sprint 2 Acceptance Checklist

- Mock login prevents the normal app view until the form is submitted.
- Login game selections, when implemented, are stored in `interestedGames` and affect the Dashboard.
- Dashboard favourites can be added once and removed from Profile or Administration.
- Administration can add and remove games and live streams without a page reload.
- Added games appear in the Dashboard and relevant game selectors.
- Added live streams appear in the Dashboard for their selected game.
- Leaderboard score entries are validated, sorted by score, and remain in the selected game.
- Profile game statistics can be added and displayed in the profile list.
- Navigation works for Dashboard, Leaderboard, Profile, and Administration.
- Empty states are shown when a list has no entries.
- Forms and navigation remain usable with keyboard input on desktop and mobile layouts.

## Items To Confirm

- Assign the Administration page to a team member.
- Confirm whether the Login game-picker is required for the final submission or whether mock login should open Dashboard directly.
- Confirm whether Leaderboard should display one selected game at a time or all game tables together.
- Confirm whether data only needs to persist while the page is open; there is currently no backend or browser storage requirement.
