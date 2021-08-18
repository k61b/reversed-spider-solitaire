import { useEffect, useState } from "react";
import { populateCards } from "../logic/game";
import NavBar from "../components/NavBar";
import GameContent from "../components/GameContent";
import GameTool from "../components/GameTool";
import ShowError from "../components/ShowError";

export default function GamePage({ seconds, minutes, hours, reset }) {
  const [cards, setCards] = useState({});
  const [game, setGame] = useState({
    cards: [],
    decks: [],
    score: 0,
    bestScore: 0,
    error: "",
    selectedCard: "",
    selectedDeck: "",
    selected: [],
    hands: 0,
    x: -1,
    y: -1,
    highlightedDeck: "",
    highlightedCard: "",
  });

  function getCards() {
    const val = populateCards();
    setCards(val);
    setGame(prevState => ({
      ...prevState,
      cards: val.cards,
      decks: val.decks,
      score: val.score,
      bestScore: val.bestScore,
      error: val.error,
    }));
  }

  useEffect(() => {
    getCards();
  }, []);

  function handleClick() {
    getCards();
  }

  return (
    <div className="game-page">
      <NavBar
        handleClick={handleClick}
        seconds={seconds}
        minutes={minutes}
        hours={hours}
        reset={reset}
        game={game}
      />
      <GameTool
        cards={cards}
        game={game}
        setGame={setGame}
        hands={game.hands}
      />
      <ShowError game={game} />
      <GameContent cards={cards} game={game} setGame={setGame} />
    </div>
  );
}
