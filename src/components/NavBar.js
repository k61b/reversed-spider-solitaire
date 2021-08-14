export function NavBar({ handleClick, seconds, minutes, hours, reset }) {
  function handleReset() {
    handleClick();
    reset();
  }

  return (
    <nav className="navbar">
      <div className="navbar-item navbar-timer">
        Time:
        <div className="navbar-board">
          <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
        </div>
      </div>
      <div className="navbar-item navbar-score">
        Score:
        <div className="navbar-board">
          <span>100</span>
        </div>
      </div>
      <div className="navbar-item">
        Highest Score Ever:
        <div className="navbar-board">
          <span>1000</span>
        </div>
      </div>
      <div className="navbar-item">
        <button className="navbar-restart-button" onClick={handleReset}>
          Restart
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
