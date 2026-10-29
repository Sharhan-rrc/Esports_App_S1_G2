# Player Profile — Rudra Patel

Implements the Profile responsibilities in Project_Details.md. No separate Sprint 3 rubric was supplied.

- Displays the demo username, per-game hours, scores and ranks, and derived game count, total hours and most-played game.
- Adds validated stats, rejects duplicate names, and removes personal stat cards with an empty state.
- Saves personal stats in browser local storage, surviving refresh and page unmount. Invalid saved data falls back to mock stats; unavailable storage leaves the page usable with a notice.
- Keeps favouriteGames/onRemoveFavourite unchanged for integration with the shared app. Favourites remain owned by the parent.
- Uses a scoped dark/gold theme with mobile layouts, labelled controls, keyboard focus and live feedback.

This branch has a standalone Profile preview in App.tsx. Dashboard, Login and navigation are on the team's development branch. Their files have not been merged or replaced here; Profile retains the existing prop contract for integration.

## Validation

Run npm run lint, npm run build, and node --test src/components/profile/profile-model.test.mjs (Node 24).

Manual check: add a game with 1.5 hours and score 0, try a case-insensitive duplicate, remove cards until empty, refresh to check saved stats, and remove each favourite to check the empty state. Check keyboard focus and a 375px viewport. Personal stats are local demo data, not authenticated account data.

Verified: lint, production build, and all six model tests passed. Browser checks passed for add, duplicate rejection, removal, empty stats after refresh, saved stats, favourite removal/empty state, and a 375px viewport without horizontal overflow.
