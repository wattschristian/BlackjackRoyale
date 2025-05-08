import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  user: any;
  dealerHand: any[] = [];
  playerHand: any[] = [];
  dealerValue: number = 0;
  playerValue: number = 0;
  outcome: string = ' ';
  gameStarted = false;
  playerBet: number = 0;
  chipsAvailable: number = 0;

  buttonsAvailable = false;

  constructor(private gameService: GameService, private auth: AuthService) {}

  ngOnInit() {
    this.user = this.auth.getUser();
    if (this.user && this.user.chips !== undefined) {
      this.chipsAvailable = this.user.chips;
    } else {
      this.chipsAvailable = 1000;
      console.warn('No user data found. Chips set to 1000.');
    }
  }

  startGame() {
    if (this.playerBet <= 0 || this.playerBet > this.chipsAvailable) {
      return alert('Please place a valid bet within your available chips.');
    }

    if (this.playerBet > 0 && this.playerBet <= this.chipsAvailable) {
      this.chipsAvailable -= this.playerBet; // Subtract bet from chips
      this.updateChips(); // Sync with backend and localStorage
      this.gameService.startGame(this.playerBet).subscribe({
        next: (data: any) => {
          this.playerHand = data.playerHand;
          this.dealerHand = data.dealerHand;
          this.dealerValue = data.dealerValue ?? 0;
          this.playerValue = data.playerValue;

          // If server returned an outcome (i.e. blackjack), stop immediately:
          if(data.outcome) {
            this.outcome = data.outcome;
            this.buttonsAvailable = false;
            this.gameStarted = false;
            this.chipsAvailable += data.chipDelta; // Adjust chips based on outcome
            return this.updateChips(); // Sync with backend and localStorage
          }
          // otherwise, normal game flow
          this.outcome = '';
          this.gameStarted = true;
          this.buttonsAvailable = true;
        },
        error: (error) => {
          console.error(error);
          // Restore chips if game start fails
          this.chipsAvailable += this.playerBet;
          this.updateChips();
        }
      });
    } else {
      alert('Please place a valid bet within your available chips.');
    }
  }

  stand() {
    this.gameService.stand().subscribe({
      next: (data: any) => {
        // 1) Update the UI with whatever the server sent
        this.playerHand   = data.playerHand;
        this.dealerHand   = data.dealerHand;
        this.playerValue  = data.playerValue;
        this.dealerValue  = data.dealerValue;
        this.outcome      = data.outcome;
  
        // 2) Turn the UI state off
        this.gameStarted      = false;
        this.buttonsAvailable = false;
  
        // 3) (Optional) adjust chips based on outcome
        if (data.outcome.includes("You win")) {
          // win → return bet + winnings
          this.chipsAvailable += data.chipDelta;
        } else if (data.outcome.startsWith("Push")) {
          // tie → return bet only
          this.chipsAvailable += this.playerBet;
        }
        // else on a loss, we already subtracted the bet at startGame()
  
        this.updateChips();
      },
      error: (err) => console.error(err)
    });
  }

  hit() {
    this.gameService.hit().subscribe({
      next: (data: any) => {
        this.playerHand = data.playerHand;
        this.playerValue = data.playerValue;
        if (this.playerValue > 21) {
          this.gameService.stand().subscribe({
            next: (data: any) => {
              this.playerHand = data.playerHand;
              this.dealerHand = data.dealerHand;
              this.playerValue = data.playerValue;
              this.dealerValue = data.dealerValue;
              this.outcome = `You bust! Dealer wins. You lose: ${this.playerBet}`;
              this.gameStarted = false;
              this.buttonsAvailable = false;
              this.updateChips();
            },
            error: (error) => {
              console.error(error);
            }
          });
        }
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  updateChips() {
    if (this.user) {
      this.auth.updateChips(this.user.id, this.chipsAvailable).subscribe({
        next: (response) => {
          console.log('Chips updated:', response);
          this.user.chips = response.user.chips; // Update local user data
          this.auth.setUser(this.user); // Update localStorage
        },
        error: (error) => {
          console.error('Error updating chips:', error);
        }
      });
    }
  }

  placeBet(amount: number) {
    if (this.gameStarted) {
      alert("Cannot change bet during the game!");
      return;
    }
    if (amount <= this.chipsAvailable) {
      this.playerBet += amount;
    } else {
      alert("You don't have enough chips to place this bet!");
    }
  }

  clearBet() {
    if (this.gameStarted) {
      alert("Cannot change bet during the game!");
      return;
    }
    this.playerBet = 0;
  }
}
