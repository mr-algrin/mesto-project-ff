export const cardsCollection = [];

const setCards = (newCards) => {
  cardsCollection.splice(0, cardsCollection.length);
  newCards.forEach(card => cardsCollection.push(card));
}

const addCard = (card) => {
  console.log('before insert:', cardsCollection.length);
  cardsCollection.unshift(card);
  console.log('after insert:', cardsCollection.length);
}

export const CardsStateManager = {
  setCards,
  addCard,
}
