--- Group 2 Team Flash - Section-1 ---

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

User can see list of games and top players:

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
- `favouriteGames` — set in Dashboard, read and updated (add/remove) in Profile

Visual Direction Update
All pages — Login, Dashboard, Leaderboard, and Profile — share one dark + gold theme, matching the original Login page. Small icon badges (in the gold accent colour) are used as lightweight game "logos" instead of official esports logos, which are trademarked and shouldn't be reproduced.
