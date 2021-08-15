import { distributeRemCards } from "../logic/index";

export function GameTool({ cards, game, setGame, hands }) {
  function rightGameToolItems() {
    let arr = [];
    for (let i = 0; i < 8; i++) {
      arr.push(<div key={i} className="game-tool-item"></div>);
      for (let j = 0; j < hands; j++) {
        arr[j] = <div key={j} className="game-tool-item card__down"></div>;
      }
    }
    return arr.map(e => e);
  }

  return (
    <div className="game-tools">
      {cards.hasOwnProperty("decks") && game.decks[10].length > 0 && (
        <div
          onClick={e => {
            distributeRemCards(game, setGame);
          }}
          className="left-game-tool game-tool-card"
        ></div>
      )}
      <div className="right-game-tool">{rightGameToolItems()}</div>
    </div>
  );
}

export default GameTool;
