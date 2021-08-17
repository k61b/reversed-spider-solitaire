/* eslint-disable default-case */
export function getRank(rank) {
  switch (rank) {
    case "K":
      return 1;
    case "Q":
      return 2;
    case "J":
      return 3;
    case "10":
      return 4;
    case "9":
      return 5;
    case "8":
      return 6;
    case "7":
      return 7;
    case "6":
      return 8;
    case "5":
      return 9;
    case "4":
      return 10;
    case "3":
      return 11;
    case "2":
      return 12;
    case "A":
      return 13;
  }
}

export function checkMovable(card, deck) {
  let tempDeck = [...deck];
  let movingCards = tempDeck.slice(deck.indexOf(card));
  let ranks = movingCards.map(curCard => {
    return getRank(curCard.rank);
  });
  let curRank = getRank(card.rank);
  for (let i = 1; i < ranks.length; i++) {
    if (curRank - ranks[i] !== 1) return false;
    curRank = ranks[i];
  }
  return true;
}

export function checkMove(target, deck, game) {
  if (
    target.suit === game.selectedCard.suit &&
    getRank(target.rank) - getRank(game.selectedCard.rank) === 1
  ) {
    if (deck.indexOf(target) === deck.length - 1) return true;
  }
  return false;
}

export function removeSelection(game, setgame) {
  if (game.selectedCard !== "" || game.highlightedCard !== "") {
    let decks = [...game.decks];
    for (let i = 0; i < decks.length; i++) {
      for (let j = 0; j < decks[i].length; j++) {
        decks[i][j].isSelected = false;
        decks[i][j].isHighlighted = false;
      }
    }
    setgame(prevState => ({
      ...prevState,
      selected: [],
      decks: decks,
      selectedCard: "",
      selectedDeck: "",
      highlightedCard: "",
      highlightedDeck: "",
    }));
  }
}

export function selectCard(card, deck, holder, game, setgame) {
  if (holder && game.selectedCard !== "") {
    moveCards(deck, game.selectedDeck, game.selectedCard, setgame, game);
    isHandComplete(deck, game, setgame);
    removeSelection(game, setgame);
  }
  let tempCard = card;
  if (game.selectedCard === "") {
    if (holder) return;
    if (card.isDown) {
      return;
    }

    if (checkMovable(card, deck)) {
      tempCard.isSelected = true;
      let tempDeck = [...deck];
      let selected = tempDeck.slice(deck.indexOf(card));
      selected.forEach(curCard => {
        curCard.isSelected = true;
      });
      setgame(prevState => ({
        ...prevState,
        selected: selected,
        selectedCard: card,
        selectedDeck: deck,
      }));
    }
  } else {
    if (checkMove(tempCard, deck, game)) {
      moveCards(deck, game.selectedDeck, game.selectedCard, setgame, game);
      isHandComplete(deck, game, setgame);
      removeSelection(game, setgame);
    } else {
      removeSelection(game, setgame);
    }
  }
}

export function moveCards(toDeck, fromDeck, fromCard, setgame, game) {
  let tempDeck = [...game.decks];
  let to = tempDeck.indexOf(toDeck);
  let from = tempDeck.indexOf(fromDeck);
  let cardIdx = tempDeck[from].indexOf(fromCard);
  let newScore = game.score;

  let movedCards = tempDeck[from].splice(cardIdx);

  movedCards.forEach(card => {
    tempDeck[to].push(card);
  });
  try {
    if (tempDeck[from][tempDeck[from].length - 1].isDown === true) {
      tempDeck[from][tempDeck[from].length - 1].isDown = false;
      newScore--;
    }
  } catch (err) {
    console.log(err);
  }
  setgame(prevState => ({
    ...prevState,
    decks: tempDeck,
    score: newScore,
  }));
}

export function checkDeck(deck) {
  let ranks = deck.map(card => {
    return getRank(card.rank);
  });
  const expectedArray = [13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
  if (isEqual(expectedArray, ranks.slice(-13))) {
    return ranks.length - 13;
  }
  return false;
}

function isEqual(obj1, obj2) {
  for (let i in obj1) {
    if (obj1.hasOwnProperty(i)) {
      if (!obj2.hasOwnProperty(i)) return false;
      if (obj1[i] !== obj2[i]) return false;
    }
  }
  for (let i in obj2) {
    if (obj2.hasOwnProperty(i)) {
      if (!obj1.hasOwnProperty(i)) return false;
      if (obj1[i] !== obj2[i]) return false;
    }
  }
  return true;
}

export function isHandComplete(deck, game, setgame) {
  let len = checkDeck(deck);
  if (len !== false) {
    let tempDecks = [...game.decks];
    let curDeckIdx = tempDecks.indexOf(deck);
    tempDecks[curDeckIdx].splice(len);
    let curHands = game.hands;
    let curScore = game.score;
    if (tempDecks[curDeckIdx].length !== 0) {
      tempDecks[curDeckIdx][tempDecks[curDeckIdx].length - 1].isDown = false;
    }
    setgame(prevState => ({
      ...prevState,
      decks: tempDecks,
      hands: curHands + 1,
      score: curScore + 100,
    }));
    if (curHands + 1 === 8) console.log("Game Over");
  }
}

export function dragStart(event, card, deck, game, setgame) {
  const x = event.pageX;
  const y = event.pageY;
  event.dataTransfer.setData("text", event.target.id);
  event.dataTransfer.setDragImage(new Image("0", "0"), -10, -10);
  setgame(prevState => ({
    ...prevState,
    x: x,
    y: y,
  }));
  if (game.selectedCard === card) {
    return;
  }
  removeSelection(game, setgame);
  selectCard(card, deck, null, game, setgame);
}

export function drag(event, card, game, setgame) {
  game.selected.forEach(card => {
    let child = document.getElementById(
      card.rank + " " + card.suit + " " + card.deck,
    ).children[0];
    let movex = event.pageX - game.x;
    let movey = event.pageY - game.y;
    if (event.pageX === 0) {
      child.style.cssText =
        "z-index:9999;transform:translate(0px,0px);display:none;";
    } else {
      child.style.cssText =
        "z-index:9999;pointer-events: none; transform: scale(1.05, 1.05) rotate(0deg) translate(" +
        movex +
        "px, " +
        movey +
        "px);";
    }
  });
}

export function dragEnter(event, game, setgame, card, deck) {
  let tempDecks = [...game.decks];
  if (card === "" && game.selectedCard !== "") {
    tempDecks.forEach(deck =>
      deck.forEach(tempCard => (tempCard.isHighlighted = false)),
    );
  } else if (card !== "" && card !== game.selectedCard) {
    if (game.selected.indexOf(card) !== -1) return;
    let deckIdx = tempDecks.indexOf(deck);
    let cardIdx = tempDecks[deckIdx].indexOf(card);
    if (cardIdx !== tempDecks[deckIdx].length - 1) return;
    tempDecks.forEach(deck =>
      deck.forEach(tempCard => (tempCard.isHighlighted = false)),
    );
    tempDecks[deckIdx][cardIdx].isHighlighted = true;
  }
  setgame(prevState => ({
    ...prevState,
    highlightedCard: card,
    highlightedDeck: deck,
    decks: tempDecks,
  }));
}

export function drop(event, card, game, setgame) {
  if (game.highlightedCard === "") {
    if (card.rank === "K") {
      if (checkMovable(game.selectedCard, game.selectedDeck)) {
        moveCards(
          game.highlightedDeck,
          game.selectedDeck,
          game.selectedCard,
          setgame,
          game,
        );
        isHandComplete(game.highlightedDeck, game, setgame);
        removeSelection(game, setgame);
      } else {
        removeSelection(game, setgame);
      }
    }
  }
  if (checkMove(game.highlightedCard, game.highlightedDeck, game)) {
    if (checkMovable(game.selectedCard, game.selectedDeck)) {
      game.selected.forEach(card => {
        let child = document.getElementById(
          card.rank + " " + card.suit + " " + card.deck,
        ).children[0];
        let css = "z-index:0;pointer-events:auto;display:none;";
        child.style.cssText = css;
      });
      moveCards(
        game.highlightedDeck,
        game.selectedDeck,
        game.selectedCard,
        setgame,
        game,
      );
      isHandComplete(game.highlightedDeck, game, setgame);
      removeSelection(game, setgame);
      return;
    } else {
      game.selected.forEach(card => {
        let child = document.getElementById(
          card.rank + " " + card.suit + " " + card.deck,
        ).children[0];
        let css = "z-index:0;pointer-events:auto;";
        child.style.cssText = css;
      });
      removeSelection(game, setgame);
    }
  } else {
    game.selected.forEach(card => {
      let child = document.getElementById(
        card.rank + " " + card.suit + " " + card.deck,
      ).children[0];
      let css = "z-index:0;pointer-events:auto;";
      child.style.cssText = css;
    });
    removeSelection(game, setgame);
  }
}

export function distributeRemCards(game, setgame) {
  if (game.decks[10].length !== 0) {
    let tempDecks = [...game.decks];
    let curScore = game.score;
    tempDecks.forEach(tempDeck => {
      if (tempDecks[10].length > 0) {
        let tempCard = tempDecks[10].pop();
        tempCard.isDown = false;
        tempDeck.push(tempCard);
      }
    });
    setgame(prevState => ({
      ...prevState,
      decks: tempDecks,
      score: curScore - 50,
    }));
    tempDecks.forEach(tempDeck => {
      isHandComplete(tempDeck, game, setgame);
    });
  }
}
