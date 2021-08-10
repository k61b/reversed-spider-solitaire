import { Link } from "react-router-dom";

export function StartButton({ start }) {
  return (
    <div className="start-button-container">
      <Link onClick={start} className="start-button" to="/game">
        Start
      </Link>
    </div>
  );
}

export default StartButton;
