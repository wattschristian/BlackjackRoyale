class Deck {
    constructor() {
      this.cards = [];
      const suits = ['♠', '♥', '♦', '♣'];
      const ranks = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
      for (const suit of suits) {
        for (const rank of ranks) {
          this.cards.push({ rank, suit });
        }
      }
    }
  
    shuffle() {
      for (let i = this.cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
      }
    }
  
    draw(n = 1) {
      return this.cards.splice(0, n);
    }
  }
  
  function getCardValue(card) {
    if (card.rank === 'A') return 11;
    if (['K', 'Q', 'J'].includes(card.rank)) return 10;
    return parseInt(card.rank);
  }
  
  function calculateHandValue(hand) {
    let value = hand.reduce((sum, card) => sum + getCardValue(card), 0);
    let aces = hand.filter(card => card.rank === 'A').length;
    while (value > 21 && aces > 0) {
      value -= 10;
      aces--;
    }
    return value;
  }
  
  function startGame() {
    const deck = new Deck();
    deck.shuffle();
    const playerHand = deck.draw(2);
    const dealerHand = deck.draw(2);
    const playerValue = calculateHandValue(playerHand);

    return { deck, playerHand, dealerHand, playerValue};
  }
  
  function playerHit(deck, hand) {
    const card = deck.draw(1)[0];
    hand.push(card);
    return card;
  }
  
  function dealerPlay(deck, hand) {
    while (calculateHandValue(hand) < 17) {
      hand.push(deck.draw(1)[0]);
    }
    return hand;
  }
  
  module.exports = {
    startGame,
    playerHit,
    dealerPlay,
    calculateHandValue
  };
