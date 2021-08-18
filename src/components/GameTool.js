import RightGameToolItems from "./RightGameToolItems";
import { distributeRemCards } from "../logic/index";

export function GameTool({ cards, game, setGame, hands }) {
  return (
    <div className="game-tools">
      <div className="left-game-tool">
        {cards.hasOwnProperty("decks") && game.decks[10].length > 0 && (
          <div
            onClick={e => {
              distributeRemCards(game, setGame);
            }}
            className="game-tool-card"
          ></div>
        )}
      </div>
      <div className="right-game-tool">
        <RightGameToolItems hands={hands} />
      </div>
    </div>
  );
}

export default GameTool;
