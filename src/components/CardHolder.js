import { useEffect, useState } from "react";

export function CardHolder({ isHighlighted }) {
  const [highlighted, setHighlighted] = useState("");

  useEffect(() => {
    if (isHighlighted) setHighlighted(" cardholder__highlight");
    setHighlighted("");
  }, [isHighlighted]);

  return <div className={"cardholder" + highlighted}></div>;
}

export default CardHolder;
