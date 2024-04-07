export const cardsCollection = [];

const setCards = (newCards) => {
  cardsCollection.splice(0, cardsCollection.length);
  newCards.forEach(card => cardsCollection.push(card));
}

const addCard = (card) => {
  cardsCollection.unshift(card);
}

export const cardsStateManager = {
  setCards,
  addCard,
}
