import NavBar from "../components/NavBar";

export default function GamePage({ seconds, minutes, hours, reset }) {
  return (
    <div className="GamePage">
      <NavBar seconds={seconds} minutes={minutes} hours={hours} reset={reset} />
    </div>
  );
}
