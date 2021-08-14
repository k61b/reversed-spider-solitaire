import { useEffect, useState } from "react";
import { populateCards } from "../logic/game";
import NavBar from "../components/NavBar";
import GameContent from "../components/GameContent";
import GameTool from "../components/GameTool";

export default function GamePage({ seconds, minutes, hours, reset }) {
  const [cards, setCards] = useState({});
  const [game, setGame] = useState({
    cards: [],
    decks: [],
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
      />
      <GameTool cards={cards} game={game} setGame={setGame} />
      <GameContent cards={cards} game={game} setGame={setGame} />
    </div>
  );
}
