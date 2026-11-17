# Esports App Style Guide

## Overall Style

Esports App uses a dark, focused interface for browsing games, player statistics, live streams, and rankings. The layout should stay simple so important information is easy to scan.

Use gold for the main navigation accent and purple, blue, green, and red only when they communicate a specific status or action. Avoid decorative glow effects.

## Colors

Page background: #111317

Main surface: #191B20

Cards and panels: #24262B

Input fields: #121212

Main accent: #D8B56E

Accent hover: #E8CA8B

Purple status/action: #8A2BE2

Blue information: #3A8DFF

Green for live content: #00FF9C

Red for errors: #FF3B3B

Main text: #F4F1EA

Secondary text: #AEB2BC

Muted text: #707580

Borders: #2D3037

Use colors to show importance and status. Always make sure text is easy to read.

### Sprint 2 note — one theme everywhere

Login, Dashboard, Leaderboard, Profile, and Administration all use the same dark + gold theme (#D8B56E / #E8CA8B) for buttons, selected states, and highlights — no page swaps to a different accent colour. Purple, blue, green, and red stay reserved for status/action use only (favourite chips, live tags, errors), never as a page's main accent, per the rule above.

## Fonts and Spacing

- Use the existing clean system font stack consistently.
- Keep headings short and clear.
- Use bold text for player names, scores, and rankings.
- Use regular text for descriptions and supporting information.
- Keep spacing consistent throughout the app.
- Use small rounded corners, generally between 6px and 9px.

## Components

### Buttons

Use gold for the primary action button and selected navigation state on every page — Login, Dashboard, Leaderboard, Profile, and Administration all share the same gold button style. Use a lighter gold hover state and a visible keyboard focus state. Keep button labels short and descriptive.

### Navigation

Use a dark vertical sidebar on larger screens with an icon and label for Dashboard, Leaderboard, Profile, and Administration. Highlight the selected section with the gold accent. Stack the navigation horizontally on smaller screens.

### Cards

Use dark surfaces with a subtle border and comfortable internal spacing. Use stronger styling only for selected or important content. Game cards may include a small icon "logo" badge in gold instead of an official esports logo.

### Inputs

Use dark input fields with clear labels. Use the gold accent for the focused border on every page. Error messages use red and must include readable text.

### Status Labels

Use green for live or successful states, red for errors, and blue for information. Include text or an icon so the meaning does not depend on color alone.

### Forms and lists (Sprint 2)

Each page's form (game picker on Login, add-favourite on Dashboard, game-select and add-score on Leaderboard, add-stats on Profile, add-game/add-stream/add-favourite on Administration) should sit close to the list/loop it affects, use the shared gold accent, and give clear feedback (e.g. a disabled "Continue" button until a game is picked, an empty-state message when a list has no items yet). Login may open Dashboard directly when the game-picker is not part of the final scope.

### Administration page

Administration uses the same dark surfaces, gold accent, and pill-shaped chip style as the Dashboard's favourites list and Profile's favourites list, so managed games, streams, and favourites look consistent wherever they're shown. Each managed item gets a small circular remove (×) button in muted grey that turns red on hover/focus, matching the remove pattern already used for favourites on Profile.

## Layout

- Use grids for game lists and profile statistics.
- Use tables for leaderboard data.
- Keep page content aligned and organized.
- Leave enough space between sections.
- Stack content on smaller screens.
- Keep leaderboard tables readable on mobile with horizontal overflow when needed.
- Use the existing mobile breakpoint at 620px for stacked navigation and compact content padding.
- Use the existing 1024px breakpoint for reduced base and heading sizes.

## Motion

Use small, smooth transitions for buttons and selected navigation. Do not use motion for decoration. Respect prefers-reduced-motion for users who disable animation.

## Accessibility

- Keep text readable against its background.
- Show a focus state when using the keyboard.
- Use proper headings, labels, buttons, and navigation.
- Use descriptive labels and tooltips for unfamiliar icons.
- Do not use color as the only way to show status.
- Check the design on both desktop and mobile.

## CSS Tokens

When adding styles, use the existing variables from `src/index.css` instead of hard-coding a new color:

- `--bg`, `--surface`, `--panel`, and `--input` for backgrounds.
- `--text-h`, `--text`, and `--muted` for text.
- `--accent`, `--accent-hover`, `--accent-bg`, and `--accent-border` for the primary gold theme.
- `--info`, `--success`, and `--error` for semantic status colors.
- `--border` for separators and control borders.

Code blocks use `--code-bg` only if that variable is defined before use; otherwise use `--panel` so the declaration remains valid.

## Branding

The product name is Esports App. Use simple esports-related icons and graphics that support the dashboard, leaderboard, and player profile without making the interface busy.
