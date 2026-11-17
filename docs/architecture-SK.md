# Sprint 3 Architecture - Sharhan Kaji

## Feature overview

This feature manages leaderboard entries: a player's highest score for a
specific game. It is implemented on `feature/leaderboard`; Dashboard, Profile,
Login, and Admin are unchanged.

```text
Leaderboard
  ├─ LeaderboardScoreForm ─┐
  └─ LeaderboardTables ────┴─ useLeaderboard
                              └─ leaderboardService
                                  └─ leaderboardRepository
                                      └─ leaderboardData
```

## Main parts

### Types and test data

Files: `src/types/leaderboard.ts`, `src/data/leaderboardData.ts`

- `LeaderboardEntry` stores an ID, game, player name, and score.
- `LeaderboardInput` represents form values before validation.
- The seed data contains 25 scores across five games, with unique IDs.
- Ranks are calculated instead of stored, so they cannot become outdated.

### `useLeaderboard`

File: `src/hooks/useLeaderboard.ts`

This hook is used by both leaderboard components. It provides entries, game
choices, ranked results, filters, errors, and add/update/delete actions.
`useSyncExternalStore` keeps both components connected to the same repository
data, while each component keeps its own filter and error state.

### `leaderboardService`

File: `src/services/leaderboardService.ts`

The service contains the business rules:

- Games must be supported.
- Player names are trimmed and must be 3-39 characters.
- Scores must be safe whole numbers greater than 500.
- A player can have only one entry per game, ignoring letter case.
- Rankings use competition ranking (`1, 1, 3`), with stable ID ordering for ties.
- Entries are ranked before search is applied, so filtered results keep their
  real positions.

The service is independent of React and storage. A repository can be injected
for isolated tests.

### `leaderboardRepository`

File: `src/repositories/leaderboardRepository.ts`

The repository is the only storage layer. It provides `getAll`, `getById`,
`create`, `update`, and `delete`, and it also manages IDs, immutable snapshots,
and subscriptions. Missing IDs return handled errors. The current repository
uses in-memory seed data; a future backend adapter can be added here.

## Components

- `Leaderboard.tsx` coordinates editing and success messages.
- `LeaderboardScoreForm.tsx` handles controlled add/edit fields, focus,
  cancellation, and accessible errors.
- `LeaderboardTables.tsx` handles search, game filters, score tables, empty
  results, and delete confirmation.
- `GameIcon.tsx` displays game badges.

The components use the existing scoped styles, variables, colours, icons, and
layout. Tables scroll on small screens, controls stack on mobile, and button
transitions respect reduced-motion preferences.

## Shared state and limitations

Both components share the same entries and stay synchronized when one changes
the data. Entries last for the current browser session and are not duplicated
in `App` or `Admin`.

This sprint uses synchronous in-memory data only. There are no backend
requests, authentication, or local-storage persistence. Refreshing the browser
restores the original 25 entries. Backend requests and loading states should be
added through the repository and hook later.

## Validation

- `npm test`: seed integrity, CRUD, immutable snapshots, subscriptions,
  validation, duplicates, ranking ties, filtering, and deletion.
- `npm run lint`
- `npm run build`
- Browser checks: add, reject duplicates, edit, search/filter, verify ranks,
  cancel/confirm deletion, and test desktop, 390px mobile, and keyboard focus.
