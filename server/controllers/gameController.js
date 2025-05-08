const express   = require('express');
const router    = express.Router();
const blackjack = require('../utils/blackjackEngine');

let currentGame = {}; // In-memory game state

// START (now a POST so we can accept the bet amount)
router.post('/start', (req, res) => {
  const bet = Number(req.body.bet);
  if (!bet || bet <= 0) {
    return res.status(400).json({ error: 'Invalid bet' });
  }

  // create new deck / hands
  currentGame       = blackjack.startGame();
  currentGame.bet   = bet;                       
  const playerValue = blackjack.calculateHandValue(currentGame.playerHand);
  const dealerValue = blackjack.calculateHandValue(currentGame.dealerHand);

  // check for player blackjack on first two cards
  if (playerValue === 21) {
    const outcome   = 'Blackjack! You win!';
    const chipDelta = bet * 2.5;                   // return bet + 1.5× winnings

    // return full hands (no hidden card), values, outcome & payout
    return res.json({
      playerHand: currentGame.playerHand,
      dealerHand: currentGame.dealerHand,
      playerValue,
      dealerValue,
      outcome,
      chipDelta
    });
  }

  // otherwise, normal start: hide dealer’s hole card
  res.json({
    playerHand:  currentGame.playerHand,
    dealerHand: [currentGame.dealerHand[0], { hidden: true }],
    playerValue
  });
});

// HIT (unchanged)
router.post('/hit', (req, res) => {
  if (!currentGame.deck) return res.status(400).json({ error: "Game not started" });
  blackjack.playerHit(currentGame.deck, currentGame.playerHand);
  const playerValue = blackjack.calculateHandValue(currentGame.playerHand);
  res.json({ playerHand: currentGame.playerHand, playerValue });
});

// STAND (uses stored bet)
router.post('/stand', (req, res) => {
  if (!currentGame.deck) return res.status(400).json({ error: "Game not started" });

  const dealerHandComplete = blackjack.dealerPlay(
    currentGame.deck,
    currentGame.dealerHand
  );
  const playerValue = blackjack.calculateHandValue(currentGame.playerHand);
  const dealerValue = blackjack.calculateHandValue(dealerHandComplete);
  let   outcome     = '';

  // bust checks first
  if (playerValue > 21)          outcome = "Player busts. You lose!";
  else if (dealerValue > 21)     outcome = "Dealer busts. You win!";
  else if (playerValue > dealerValue)  outcome = "You win!";
  else if (playerValue < dealerValue)  outcome = "You lose!";
  else                              outcome = "Push (tie)";

  // compute chipDelta off the stored bet
  let chipDelta = 0;
  if (outcome.includes("You win"))   chipDelta = currentGame.bet * 2;
  else if (outcome.startsWith("Push")) chipDelta = currentGame.bet;
  
  // respond
  const result = {
    playerHand:  currentGame.playerHand,
    dealerHand:  dealerHandComplete,
    playerValue,
    dealerValue,
    outcome,
    chipDelta
  };

  currentGame = {};  // reset
  res.json(result);
});

module.exports = router;
