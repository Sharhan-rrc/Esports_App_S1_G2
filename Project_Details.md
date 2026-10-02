## Group 2 Team

- Parneet Kaur
- Sharhan Kaji
- Rudra Patel

## Project Summary

The Esports App is a React demo application for browsing games, live streams, player rankings, and profile statistics. Users log in through a mock login and then navigate between Dashboard, Leaderboard, Profile, and Administration.

## Team Responsibilities

### Rudra - Player Profile

- Build the Player Profile page.
- Display username, games played, scores, ranks, and performance summaries.
- Add a form and cards for personal game statistics.
- Use static or mock data; no backend is required.

### Sharhan - Leaderboard

- Build the Leaderboard page.
- Display top players, positions, and scores for multiple games.
- Add the score form and sort players by score.
- Use mock player and score data.

### Parneet - Dashboard and Administration

- Build the Dashboard with game cards, top-player information, favourites, and live streams.
- Build Administration with forms to add and remove games, live streams, and favourite games.
- Connect Administration changes to shared state so new games and streams appear on Dashboard.

### Shared Work

- Create the mock Login page with email and password fields.
- Maintain shared state in `App.tsx` and pass it to the pages that use it.
- Keep navigation working for Dashboard, Leaderboard, Profile, and Administration.

## Shared State

- `favouriteGames` is managed by Dashboard or Administration and displayed in Profile.
- `games` is managed by Administration and displayed on Dashboard.
- `liveStreams` is managed by Administration and displayed on Dashboard.
- Data is stored in React state only and is not persistent after a page refresh.

## Visual Direction

Use a dark charcoal interface with gold navigation and primary actions. Purple, blue, green, and red are reserved for status information and errors. Use simple icon badges instead of official esports logos.

## Main Requirements

- Mock login opens the application without real authentication.
- Users can add and remove games, live streams, and favourites.
- Added games and streams appear on Dashboard without a page reload.
- Leaderboard scores are validated and sorted by highest score.
- Profile statistics and favourites are displayed in clear lists or cards.
- Forms, navigation, empty states, and focus states work on desktop and mobile.
