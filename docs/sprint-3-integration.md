# Integrated Sprint 3 structure

Branch: refactor/sprint-3-integration, based on latest development.

Dashboard retains Parneet's stream hook/service/repository and ten records. Leaderboard retains Sharhan's score workflow, validation and ranking. Profile retains Rudra's cards, summary, validation and device-storage parser, with its data access moved out of the component.

Profile now uses useProfileStats -> profileService/profileRules -> profileRepository/profileParser -> profileData. The summary and form/cards reuse the same hook. Add, edit and remove update both consumers. Device persistence requires explicit consent; disabling it removes saved data without discarding the current session.

Shared catalogue: useGames -> gameService -> gameRepository -> gameData. Shared favourites use their own hook/service/repository and are displayed on Dashboard, Profile and Admin. Admin reuses the stream manager and checks references before removing games. The catalogue uses Parneet's existing numeric game IDs; leaderboard and profile retain their existing game-name keys.

Login remains a frontend demo. Resources other than opted-in profile stats stay in memory. No backend authentication was introduced.

Validation: npm run build, npm run lint, npm test. Integration tests cover profile edits, duplicate validation, persistence consent/failures, catalogue propagation and protected game deletion.
