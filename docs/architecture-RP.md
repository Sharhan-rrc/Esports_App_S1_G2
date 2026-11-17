# Profile architecture - Rudra Patel

Personal stats flow through useProfileStats, profileService/profileRules, profileRepository/profileParser, and profileData. The UI handles form and editing state; services validate and summarize; the repository publishes immutable snapshots and handles optional browser persistence. ProfileSummary and Profile both consume the shared hook. The original profile-model module re-exports the extracted functions for existing tests.
