import { Link } from "react-router-dom";

export function StartButton() {
  return (
    <div className="start-button-container">
      <Link className="start-button" to="/game">
        Start
      </Link>
    </div>
  );
}

export default StartButton;
