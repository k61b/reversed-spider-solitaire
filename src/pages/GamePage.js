import { useEffect, useState } from "react";
import CSSTransitionGroup from "react-addons-css-transition-group";
import { populateCards } from "../logic/game";
import {
  dragStart,
  drag,
  dragEnter,
  selectCard,
  drop,
  distributeRemCards,
} from "../logic/index";
import Card from "../components/Card";
import CardHolder from "../components/CardHolder";
import NavBar from "../components/NavBar";

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

  useEffect(() => {
    const val = populateCards();
    setCards(val);
    setGame(prevState => ({
      ...prevState,
      cards: val.cards,
      decks: val.decks,
    }));
  }, []);

  return (
    <div className="game-page">
      <NavBar seconds={seconds} minutes={minutes} hours={hours} reset={reset} />
      {cards.hasOwnProperty("decks") && game.decks[10].length > 0 && (
        <div
          onClick={e => {
            distributeRemCards(game, setGame);
          }}
          className="card card__down card__remcards"
        ></div>
      )}
      <div className="game-content">
        {cards.hasOwnProperty("decks") &&
          game.decks.slice(0, 10).map((deck, index) => (
            <>
              {deck.length === 0 ? (
                <div
                  id="holder"
                  key={index + "0"}
                  onClick={() => {
                    selectCard("", deck, true, game, setGame);
                  }}
                  onDragEnter={e => {
                    dragEnter(e, game, setGame, "", deck);
                  }}
                >
                  <CardHolder key={index + " 1"} deck={deck} />
                </div>
              ) : (
                <div key={index + " 2"} deck={deck}>
                  <CSSTransitionGroup
                    transitionName="card"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}
                    key={index + " 3"}
                    deck={deck}
                  >
                    {deck.map(card => (
                      <div
                        key={
                          card.rank + " " + card.suit + " " + card.deck + " 0"
                        }
                        id={card.rank + " " + card.suit + " " + card.deck}
                        className="card__wrapper card__stack"
                        draggable={true}
                        onDragStart={e => {
                          dragStart(e, card, deck, game, setGame);
                        }}
                        onDrag={e => {
                          drag(e, card, game, setGame);
                        }}
                        onDragEnter={e => {
                          if (card.isDown === false) {
                            dragEnter(e, game, setGame, card, deck);
                          }
                        }}
                        onDragEnd={e => {
                          drop(e, card, game, setGame);
                        }}
                        onClick={e => {
                          selectCard(card, deck, null, game, setGame);
                        }}
                      >
                        <Card
                          key={card.rank + " " + card.suit + " " + card.deck}
                          card={card}
                          isSelected={card.isSelected}
                          isDown={card.isDown}
                          isHighlighted={card.isHighlighted}
                        />
                      </div>
                    ))}
                  </CSSTransitionGroup>
                </div>
              )}
            </>
          ))}
      </div>
    </div>
  );
}
