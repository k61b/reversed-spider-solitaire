import cardInfo from "../utils/cardInfo.json";

export function RightGameToolItems({ hands }) {
  let arr = [];
  for (let i = 0; i < 8; i++) {
    arr.push(<div key={i} className="game-tool-item"></div>);
  }
  if (hands > 0)
    for (let j = 0; j < hands; j++) {
      arr[j] = (
        <div className="game-tool-item card spade">
          <div className="card__content card__rank-left">A</div>
          <div className="card__content card__suite-left">
            {cardInfo["symbol"]["spade"]}
          </div>
          <div className="card__content card__suite-right">
            {cardInfo["symbol"]["spade"]}
          </div>
          <div className="card__content card__rank-right">A</div>
        </div>
      );
    }
  return arr.map(e => e);
}

export default RightGameToolItems;
