# Sprint 3 proposed architecture - Parneet Kaur
Draft for Parneet to review, implement and adapt to her own contribution.
## Unique resource and test data
- **What:** Stream has a unique ID, title, shared game ID and platform. Ten typed
  records live in src/data/streamData.ts.
- **Why:** Stream information belongs to the Dashboard resource, separate from
  leaderboard scores and personal game statistics. IDs prevent fragile name joins.
- **Where:** src/types/stream.ts defines the contract; streamRepository imports
  the seed array. The shared catalogue contains ten matching games.
## useStreams
- **What:** Exposes full/filtered streams, catalogue choices, a local game filter,
  feedback and create/update/delete actions. All returned values are documented.
- **Why:** Selection and feedback are presentation concerns. The service owns
  validation/filter rules; the repository owns data and subscriptions.
- **Where:** StreamList and StreamManager both invoke this hook. Dashboard shows
  the list and a collapsible manager; Admin reuses StreamManager after integration.
  useSyncExternalStore synchronizes separate consumers without App prop drilling.
## streamService
- **What:** Validates title length, supported platform, existing game and duplicate
  streams. Exposes CRUD actions and game filtering.
- **Why:** These rules must be the same whether the change comes from Dashboard
  or Admin. The service has no React state or UI rendering.
- **Where:** Every useStreams consumer invokes this service. Isolated tests use
  createStreamService with a separate repository instance.
## streamRepository
- **What:** A typed repository with getAll/getById/create/update/delete/subscribe.
- **Why:** Shared memory-repository plumbing supplies immutable snapshots and ID
  allocation; the stream repository chooses its unique type and test data.
  Domain checks stay in streamService.
- **Where:** Only streamService (and the integration deletion guard) accesses
  this resource directly. Future backend requests belong in this repository.
## Components and shared work
StreamList renders filtered records; StreamManager owns form/edit/confirmation
state; Dashboard composes them and shared FavouriteGames. Each component explains
its architectural role in a comment. Shared catalogue/favourite code is in common/.
Parneet should describe any shared files she actually contributes to before hand-in.
## Verification
Run npm test, npm run lint and npm run build with the agreed project dependencies.
Demonstrate add, edit, cancel and confirm deletion, game filtering, invalid input,
and Dashboard/Admin synchronization. Inspect desktop/mobile layout and run the
team's planned accessibility checks; automated source checks are not an Axe audit.
Data is synchronous and in memory: refreshing resets the seed. No backend,
authentication or local-storage persistence is introduced.
