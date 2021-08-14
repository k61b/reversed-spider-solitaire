import { useEffect, useState } from "react";
import { populateCards } from "../logic/game";
import { distributeRemCards } from "../logic/index";
import NavBar from "../components/NavBar";
import GameContent from "../components/GameContent";

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
      <div className="game-tools">
        {cards.hasOwnProperty("decks") && game.decks[10].length > 0 && (
          <div
            onClick={e => {
              distributeRemCards(game, setGame);
            }}
            className="card card__down card__remcards"
          ></div>
        )}
      </div>
      <GameContent cards={cards} game={game} setGame={setGame} />
    </div>
  );
}
