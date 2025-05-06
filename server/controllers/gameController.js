const express = require('express');
const router = express.Router();
const blackjack = require('../utils/blackjackEngine');

let currentGame = {}; // In-memory game state

// Start a new game
router.get('/start', (req, res) => {
  currentGame = blackjack.startGame();
  res.json({
    playerHand: currentGame.playerHand,
    // Show only the dealer’s first card; hide the second card
    dealerHand: [currentGame.dealerHand[0], { hidden: true }]
  });
});

// Player chooses to hit
router.post('/hit', (req, res) => {
  if (!currentGame.deck) {
    return res.status(400).json({ error: "Game not started" });
  }
  const card = blackjack.playerHit(currentGame.deck, currentGame.playerHand);
  const playerValue = blackjack.calculateHandValue(currentGame.playerHand);
  res.json({
    card,
    playerHand: currentGame.playerHand,
    playerValue
  });
});

// Player chooses to stand; dealer plays then outcome is determined
router.post('/stand', (req, res) => {
  if (!currentGame.deck) {
    return res.status(400).json({ error: "Game not started" });
  }
  const dealerHandComplete = blackjack.dealerPlay(currentGame.deck, currentGame.dealerHand);
  const playerValue = blackjack.calculateHandValue(currentGame.playerHand);
  const dealerValue = blackjack.calculateHandValue(dealerHandComplete);
  let outcome = '';
  if (playerValue > 21) {
    outcome = "Player busts. You lose!";
  } else if (dealerValue > 21) {
    outcome = "Dealer busts. You win!";
  } else if (playerValue > dealerValue) {
    outcome = "You win!";
  } else if (playerValue < dealerValue) {
    outcome = "You lose!";
  } else {
    outcome = "Push (tie)";
  }
  
  // Clear the game
  const result = {
    playerHand: currentGame.playerHand,
    dealerHand: dealerHandComplete,
    playerValue,
    dealerValue,
    outcome
  };
  currentGame = {};
  res.json(result);
});

module.exports = router;