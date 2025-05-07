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
      this.chipsAvailable = 0;
      console.warn('No user data found. Chips set to 0.');
    }
  }

  startGame() {
    if (this.playerBet > 0 && this.playerBet <= this.chipsAvailable) {
      this.chipsAvailable -= this.playerBet; // Subtract bet from chips
      this.updateChips(); // Sync with backend and localStorage
      this.gameService.startGame().subscribe({
        next: (data: any) => {
          this.playerHand = data.playerHand;
          this.dealerHand = data.dealerHand;
          this.dealerValue = 0;
          this.outcome = '';
          this.gameStarted = true;
          this.buttonsAvailable = true;
          this.playerValue = data.playerValue;
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
        this.playerHand = data.playerHand;
        this.dealerHand = data.dealerHand;
        this.playerValue = data.playerValue;
        this.dealerValue = data.dealerValue;
        this.outcome = data.outcome;
        this.gameStarted = false;
        this.buttonsAvailable = false;
        if (this.playerValue === this.dealerValue) {
          this.chipsAvailable += this.playerBet; // Return bet on tie
          this.outcome = `You tie! You get ${this.playerBet}`;
        } else if (this.playerValue > this.dealerValue && this.playerValue <= 21) {
          this.chipsAvailable += this.playerBet * 2; // Win: return bet + winnings
          this.outcome = `You win! You get ${this.playerBet * 2}`;
        } else {
          this.outcome = `Dealer wins! You lose: ${this.playerBet}`;
        }
        this.updateChips(); // Sync with backend and localStorage
      },
      error: (error) => {
        console.error(error);
      }
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
        } else if (this.playerValue === 21) {
          this.outcome = `Blackjack! You win ${this.playerBet * (3/2)}`;
          this.gameStarted = false;
          this.buttonsAvailable = false;
          this.chipsAvailable += this.playerBet + this.playerBet * (3/2); // Return bet + 1.5x winnings
          this.updateChips();
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
