import { distributeRemCards } from "../logic/index";

export function GameTool({ cards, game, setGame }) {
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
      <div className="right-game-tool">
        <div className="game-tool-item"></div>
        <div className="game-tool-item"></div>
        <div className="game-tool-item"></div>
      </div>
    </div>
  );
}

export default GameTool;
