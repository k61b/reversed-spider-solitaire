import { BrowserRouter as Router, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import GamePage from "./pages/GamePage";

export default function App() {
  return (
    <div className="container">
      <Router>
        <Switch>
          <GamePage path="/game" />
          <HomePage path="/" />
        </Switch>
      </Router>
    </div>
  );
}
