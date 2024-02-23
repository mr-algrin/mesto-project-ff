const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];


// -------------- extra cards collection ----------
const cardsCollection = [
  {
    name: 'Moscow',
    link: 'https://images.unsplash.com/photo-1520106212299-d99c443e4568?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW9zY293fGVufDB8fDB8fHww'
  },
  {
    name: 'Madrid',
    link: 'https://images.unsplash.com/photo-1578305698944-874fa44d04c9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWFkcmlkfGVufDB8fDB8fHww'
  },
  {
    name: 'Tashkent',
    link: 'https://images.unsplash.com/photo-1622021109028-8ba1d5374161?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGFzaGtlbnR8ZW58MHx8MHx8fDA%3D'
  },
  {
    name: 'Lisbon',
    link: 'https://images.unsplash.com/photo-1588535684923-900727736ac0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TGlzYm9ufGVufDB8fDB8fHww'
  },
  {
    name: 'St. Petersburg',
    link: 'https://images.unsplash.com/photo-1592029328294-dd71c43655c0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c2FpbnQlMjBwZXRlcnNidXJnfGVufDB8fDB8fHww'
  }
];

const getRandomCard = () => {
  const cardIndex = Math.trunc(Math.random() * cardsCollection.length);
  return cardsCollection[cardIndex];
}
