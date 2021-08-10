export function NavBar({ seconds, minutes, hours, reset }) {
  return (
    <nav className="navbar">
      <div className="navbar-item navbar-timer">
        Time:
        <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
      </div>
      <div className="navbar-item navbar-score">Score:</div>
      <div className="navbar-item navbar-highest-score">
        Highest Score Ever:
      </div>
      <div className="navbar-item navbar-restart-button">
        <button onClick={reset}>Restart</button>
      </div>
    </nav>
  );
}

export default NavBar;
