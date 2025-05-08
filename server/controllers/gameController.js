const express   = require('express');
const router    = express.Router();
const blackjack = require('../utils/blackjackEngine');
const UserModel = require('../models/User'); // Corrected import

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

// HIT (updated to check for bust)
router.post('/hit', (req, res) => {
  if (!currentGame.deck) return res.status(400).json({ error: "Game not started" });
  
  blackjack.playerHit(currentGame.deck, currentGame.playerHand);
  const playerValue = blackjack.calculateHandValue(currentGame.playerHand);
  
  // Check if player busted
  const busted = playerValue > 21;
  
  res.json({ 
    playerHand: currentGame.playerHand, 
    playerValue,
    busted  // Add this flag to indicate if player busted
  });
});

// STAND (updated to include user stats and chip history)
router.post('/stand', async (req, res) => {
  const { userId } = req.body;
  console.log('Processing stand request for user ID:', userId);
  
  if (!currentGame.deck) {
    return res.status(400).json({ error: "Game not started" });
  }

  const dealerHandComplete = blackjack.dealerPlay(currentGame.deck, currentGame.dealerHand);
  const playerValue = blackjack.calculateHandValue(currentGame.playerHand);
  const dealerValue = blackjack.calculateHandValue(dealerHandComplete);
  let chipDelta = 0;

  let outcome = '';
  let gameWon = false;
  
  if (playerValue > 21) {
    outcome = "Player busts. You lose!";
  } else if (dealerValue > 21) {
    outcome = "Dealer busts. You win!";
    chipDelta = currentGame.bet * 2; // Return bet + winnings
    gameWon = true;
  } else if (playerValue > dealerValue) {
    outcome = "You win!";
    chipDelta = currentGame.bet * 2; // Return bet + winnings
    gameWon = true;
  } else if (playerValue < dealerValue) {
    outcome = "You lose!";
  } else {
    outcome = "Push (tie)";
    chipDelta = currentGame.bet; // Return the bet
  }

  // Update user stats and chip history
  try {
    if (userId) {
      const user = await UserModel.findById(userId);
      if (user) {
        // Update stats
        user.stats.gamesPlayed += 1;
        
        // Update win status and chips
        if (gameWon) {
          user.stats.gamesWon += 1;
          user.chips += chipDelta;
          
          // Track highest win if applicable
          if (currentGame.bet > user.stats.highestWin) {
            user.stats.highestWin = currentGame.bet;
          }
          
          // Track total chips won
          user.stats.totalChipsWon += currentGame.bet;
        } else if (outcome.includes("Push")) {
          // For push, return the original bet
          user.chips += currentGame.bet;
        }
        
        // Update chip history
        if (!user.chipHistory) {
          user.chipHistory = [];
        }
        user.chipHistory.push(user.chips);
        
        await user.save();
        console.log(`Updated stats for user ${userId}: Games played: ${user.stats.gamesPlayed}, Games won: ${user.stats.gamesWon}, Chips: ${user.chips}`);
      }
    }

    // Return game result
    res.json({
      playerHand: currentGame.playerHand,
      dealerHand: dealerHandComplete,
      playerValue,
      dealerValue,
      outcome,
      chipDelta
    });
  } catch (error) {
    console.error('Error updating user stats:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
