import { Link, useLocation } from 'react-router-dom';

export default function GameLauncher() {
  const location = useLocation();

  if (location.pathname === '/game') return null;

  return (
    <Link className="game-launcher" to="/game" aria-label="Open mini game">
      <span className="game-launcher-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d="M9 8H7v2H5v2h2v2h2v-2h2v-2H9V8zm7 3.2a1.4 1.4 0 1 0 0-2.8 1.4 1.4 0 0 0 0 2.8zm2.5 2.6a1.4 1.4 0 1 0 0-2.8 1.4 1.4 0 0 0 0 2.8zM6.1 5.5h11.8c2 0 3.7 1.4 4.1 3.3l1 4.4a4 4 0 0 1-7.5 2.6L14.7 14h-5.4l-.8 1.8A4 4 0 0 1 1 13.2l1-4.4a4.2 4.2 0 0 1 4.1-3.3zm11.8 2H6.1c-.9 0-1.6.6-1.8 1.5l-1 4.4a2 2 0 0 0 3.8 1.3l1.3-2.7h8l1.3 2.7a2 2 0 0 0 3.8-1.3l-1-4.4c-.2-.9-1-1.5-1.9-1.5z" />
        </svg>
      </span>
      <span className="game-launcher-text">Play Mini Game</span>
    </Link>
  );
}
