import { dragStart, drag, dragEnter, selectCard, drop } from "../logic/index";
import Card from "../components/Card";
import CardHolder from "../components/CardHolder";

export function GameContent({ cards, game, setGame }) {
  return (
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
                {deck.map(card => (
                  <div
                    key={card.rank + " " + card.suit + " " + card.deck + " 0"}
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
              </div>
            )}
          </>
        ))}
    </div>
  );
}

export default GameContent;
