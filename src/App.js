import { BrowserRouter as Router, Switch } from "react-router-dom";
import { useStopwatch } from "react-timer-hook";
import HomePage from "./pages/HomePage";
import GamePage from "./pages/GamePage";

export default function App() {
  const { seconds, minutes, hours, start, reset } = useStopwatch({
    autoStart: false,
  });

  return (
    <div className="container">
      <Router>
        <Switch>
          <GamePage
            seconds={seconds}
            minutes={minutes}
            hours={hours}
            reset={reset}
            path="/game"
          />
          <HomePage start={start} path="/" />
        </Switch>
      </Router>
    </div>
  );
}
