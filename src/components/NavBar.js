export function NavBar() {
  return (
    <nav>
      <div className="navbar-item navbar-timer">Time:</div>
      <div className="navbar-item navbar-score">Score:</div>
      <div className="navbar-item navbar-highest-score">
        Highest Score Ever:
      </div>
      <div className="navbar-item navbar-restart-button">
        <button>Restart</button>
      </div>
    </nav>
  );
}

export default NavBar;
