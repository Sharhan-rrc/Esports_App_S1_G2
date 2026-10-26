# Sprint 3 architecture - Sharhan Kaji

## Scope and flow

My resource is a **leaderboard entry**: one player's highest score in one game.
This work belongs to `feature/leaderboard`; Dashboard, Profile, Login and Admin
implementations are unchanged.

```text
Leaderboard
  |-- LeaderboardScoreForm -- useLeaderboard -- leaderboardService
  |-- LeaderboardTables ----- useLeaderboard -- leaderboardService
                                                 |
                                        leaderboardRepository
                                                 |
                                       leaderboardTestData
```

## Resource type and test data

Files: `src/types/leaderboard.ts`, `src/data/leaderboardData.ts`.

- **What:** `LeaderboardEntry` defines an ID, game, player name and numeric score.
  `LeaderboardInput` represents raw form strings. The data file preserves all 25
  original scores across five games and assigns each entry a globally unique ID.
- **Why:** resource shape is shared across layers. Positions are derived from
  scores, so storing them would risk stale ranks after edits or deletion.
- **Where:** the repository imports the typed array as its initial dataset;
  the service uses the separate game catalogue to validate game selections.

## Custom hook: useLeaderboard

File: `src/hooks/useLeaderboard.ts`.

- **What:** exposes the shared entries, game choices, ranked results, search and
  selected-game state, error feedback, and add/update/delete actions. The comment
  block in the hook documents every returned value and its use.
- **Why:** filters and error display are presentation state. Validation and rank
  decisions are delegated to the service. `useSyncExternalStore` listens through
  the service to a stable, immutable repository snapshot, so two hook consumers
  observe the same data instead of keeping separate arrays. Each consumer has
  its own local filter/error state. React cleans up subscriptions on unmount.
- **Where:** both `LeaderboardScoreForm` and `LeaderboardTables` call the hook.
  A form save updates the tables immediately, without passing entries through
  the parent page. Memoization recalculates displayed results when data or
  filters change.

## Business service: leaderboardService

File: `src/services/leaderboardService.ts`.

- **What:** validates supported games, trimmed player names (1-40 characters),
  nonnegative safe whole-number scores, and one entry per player per game
  (case-insensitive). Provides add/update/delete actions and builds rankings.
- **Why:** these are consistent domain rules, independent of React or storage.
  Ties use competition ranking: 1, 1, 3. Equal-score rows have stable ID order.
  Players are ranked before search is applied, preserving actual positions in
  filtered results. Editing excludes the current entry from duplicate checks.
- **Where:** the hook delegates actions and result preparation to this service.
  Therefore both the score form and table components reuse the same service.
  A repository can be injected into `createLeaderboardService` for isolated tests.

## Data repository: leaderboardRepository

File: `src/repositories/leaderboardRepository.ts`.

- **What:** `getAll`/`getById` read entries; `create`, `update`, and `delete`
  provide CRUD. The repository owns ID allocation, immutable snapshots and
  change subscriptions. Missing IDs produce a handled error.
- **Why:** all score storage lives in one adapter. Its initial array is copied
  from the test-data module; updates replace snapshots and never mutate the
  imported seed. Service/UI code does not access storage directly.
- **Where:** used by `leaderboardService`; `createLeaderboardRepository` creates
  isolated instances for tests. A future backend adapter belongs here.

## Refactored components

- `Leaderboard.tsx`: coordinates the selected edit entry and success announcements.
  It composes the two hook consumers rather than owning resource arrays.
- `LeaderboardScoreForm.tsx`: controlled add/edit fields, edit focus, cancel action
  and accessible validation feedback. The service handles all business checks.
- `LeaderboardTables.tsx`: search/game controls, score tables, empty results and
  inline delete confirmation. It displays the service's computed positions.
- `GameIcon.tsx`: presentation-only game badge, keeping the existing icon style.

Each component has an explanation comment. Styling remains scoped to the
Leaderboard and reuses the branch's existing CSS variables, colours, icons and
layout. New controls stack on mobile; wide tables scroll within their container.
Button transitions respect reduced-motion preferences.

## Shared state and team integration

The two components already demonstrate shared resource state through the full
architecture. Entries survive component remounts during the current app session.
Other pages can consume the same service/hook when the team integrates branches.
Coordinate game/user IDs and a shared game catalogue then; do not create duplicate
leaderboard storage in App or Admin. The game catalogue is currently local to
Sharhan's resource so teammates are not blocked by this branch.

## Limits

This sprint uses synchronous in-memory test data, with no external requests,
backend, authentication or local-storage persistence. Refreshing the browser
restores the original 25 entries. The hook reports CRUD validation failures;
there is no artificial network loading indicator for synchronous data. When a
backend is added, requests belong in the repository and asynchronous loading
states can be added to the hook.

## Validation and demonstration

- `npm test` (tested with Node 24): seed integrity, CRUD, immutable snapshots,
  subscriptions/unsubscribe, invalid input, duplicate checks, ranking ties,
  search preserving ranks, and deletion recalculating positions.
- `npm run lint` and `npm run build`.
- In the browser, add a player, reject a duplicate, edit the score, search/filter
  and check rank, then cancel/confirm deletion. Both hook consumers stay in sync.
- Inspect desktop and 390px mobile layouts and keyboard focus states.

This covers individual typed resource/data, repository CRUD, a working component
flow, component comments and personal architecture documentation. Reusing the
hook in two components and the service through both hook instances also provides
working evidence for the team's hook/service reuse requirements.
