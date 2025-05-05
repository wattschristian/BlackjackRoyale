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

  constructor(private gameService: GameService) {}

  startGame() {
    this.gameService.startGame().subscribe({
      next: (data: any) => {
        this.playerHand = data.playerHand;
        this.dealerHand = data.dealerHand;
        this.dealerValue = 0;
        this.playerValue = this.calculateHandValue(this.playerHand);
        this.outcome = '';
        this.gameStarted = true;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        // Optional: Handle completion
      }
    });
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
        // Optionally check bust condition here
        if (this.playerValue > 21) {
          this.outcome = 'You bust! Dealer wins.';
          this.gameStarted = false;
        }
        else if (this.playerValue == 21) {
          this.outcome = 'Blackjack! You win.';
          this.gameStarted = false;
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



  // Optional local hand value calculator (if needed)
  calculateHandValue(hand: any[]): number {
    // Implement client-side calculation or simply rely on the backend values.
    return hand.reduce((sum, card) => {
      let value = parseInt(card.rank);
      if (isNaN(value)) {
        // For face cards or Aces, you might adjust the logic or rely on backend values.
        value = card.rank === 'A' ? 11 : 10;
      }
      return sum + value;
    }, 0);
  }
}
