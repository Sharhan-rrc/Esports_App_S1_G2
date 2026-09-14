type NavigationProps = {
  showProfile: boolean;
  onViewChange: (showProfile: boolean) => void;
};

function Navigation({ showProfile, onViewChange }: NavigationProps) {
  return (
    <nav aria-label="Main navigation">
      <button type="button" onClick={() => onViewChange(false)} disabled={!showProfile}>
        Dashboard
      </button>
      <button type="button" onClick={() => onViewChange(true)} disabled={showProfile}>
        Profile
      </button>
    </nav>
  );
}

export default Navigation;
