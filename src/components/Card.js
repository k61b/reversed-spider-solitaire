import { useEffect, useState } from "react";
import cardInfo from "../utils/cardInfo.json";

export function Card({ card, isSelected, isDown, isHighlighted }) {
  const [down, setDown] = useState("");
  const [select, setSelect] = useState("");
  const [highlight, setHighlight] = useState("");

  useEffect(() => {
    if (isDown) {
      setDown(" card__down");
    } else {
      setDown(" " + card.suit);
    }
    if (isSelected) {
      setSelect(" card__selected");
    } else {
      setSelect("");
    }
    if (isHighlighted) {
      setHighlight(" card__highlighted");
    } else {
      setHighlight("");
    }
  }, [isDown, isSelected, isHighlighted, card.suit]);

  return (
    <div className={"card" + down + select + highlight}>
      <div className="card__content card__rank-left">{card.rank}</div>
      <div className="card__content card__suite-left">
        {cardInfo["symbol"][card.suit]}
      </div>
      <div className="card__content card__suite-right">
        {cardInfo["symbol"][card.suit]}
      </div>
      <div className="card__content card__rank-right">{card.rank}</div>
    </div>
  );
}

export default Card;
