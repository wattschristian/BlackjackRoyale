import { Component } from '@angular/core';
import { GameService } from '../services/game.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  dealerHand: any[] = [];
  playerHand: any[] = [];
  dealerValue: number = 0;
  playerValue: number = 0;
  outcome: string = ' ';
  gameStarted = false;
  playerBet: number = 0; // Bet amount
  chipsAvailable: number = 100; // Total chips available
  buttonsAvailable = false;


  constructor(private gameService: GameService) {}

  startGame() {
    if (this.playerBet > 0 && this.playerBet <= this.chipsAvailable) {
      this.gameService.startGame().subscribe({
        next: (data: any) => {
          this.playerHand = data.playerHand;
          this.dealerHand = data.dealerHand;
          this.dealerValue = 0;
          this.outcome = '';
          this.gameStarted = true;
          this.chipsAvailable -= this.playerBet; // Deduct bet from available chips
          this.buttonsAvailable = true;
          this.playerValue = data.playerValue;
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          // Optional: Handle completion
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
        this.chipsAvailable += this.playerBet * 2
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        // Optional: Handle completion
      }
    });
  }

  hit() {
    this.gameService.hit().subscribe({
      next: (data: any) => {
        this.playerHand = data.playerHand;
        this.playerValue = data.playerValue;
        // Check bust condition here
        if (this.playerValue > 21) {
          this.gameService.stand().subscribe({ // Call stand logic if player busts
            next: (data: any) => {
              this.playerHand = data.playerHand;
              this.dealerHand = data.dealerHand;
              this.playerValue = data.playerValue;
              this.dealerValue = data.dealerValue;
              this.outcome = 'You bust! Dealer wins.'; // Set outcome here
              this.gameStarted = false;
              this.buttonsAvailable = false;
            },
            error: (error) => {
              console.error(error);
            }
          });
        } else if (this.playerValue == 21) {
          this.outcome = 'Blackjack! You win.';
          this.gameStarted = false;
          this.buttonsAvailable = false;
          this.chipsAvailable += this.playerBet * (3/2)
        }
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        // Optional:  Handle completion if needed
        console.log('Hit operation completed.');
      }
    });
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
