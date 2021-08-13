import cardInfo from "../utils/cardInfo.json";

export function populateCards() {
  let cards = [];
  let decks;

  cardInfo["rank"].forEach(rank => {
    for (let i = 1; i <= 8; i++) {
      cards.push({
        rank: rank,
        suit: "spade",
        isDown: true,
        deck: i,
        isSelected: false,
        isHighlighted: false,
      });
    }
  });
  let mixedCards = shuffle(cards);
  decks = sliceIntoChunks(mixedCards.slice(0, 50), 5);
  decks[10] = mixedCards.slice(50);
  for (let i = 0; i <= 9; i++) {
    decks[i][decks[i].length - 1].isDown = false;
  }
  return { decks: decks, cards: mixedCards };
}

function shuffle(array) {
  let currentIndex = array.length;
  let randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function sliceIntoChunks(arr, chunkSize) {
  const res = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    res.push(chunk);
  }
  return res;
}
