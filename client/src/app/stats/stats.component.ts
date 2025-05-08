import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsService } from '../services/stats.service';
import { AuthService } from '../services/auth.service';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

// Import Chart.js components
import { Chart, registerables } from 'chart.js';

// Register all chart.js components
Chart.register(...registerables);

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css'],
  standalone: true,
  imports: [CommonModule, BaseChartDirective]
})
export class StatsComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  
  stats: any = {
    gamesPlayed: 0,
    gamesWon: 0,
    winRate: 0,
    chipHistory: []
  };


  public chipsChartData: ChartConfiguration<'line'>['data'] = {
    labels: [], 
    datasets: [
      {
        data: [],
        label: 'Chips Balance',
        borderColor: '#1e7e34',
        fill: false,
      },
    ],
  };
  
  public chipsChartOptions: ChartOptions<'line'> = {
    responsive: true,
  };

  constructor(private statsService: StatsService, private auth: AuthService) {}

  ngOnInit() {
    console.log('Stats component initialized');
    const user = this.auth.getUser();
    console.log('Current user:', user);
    
    if (user && user.id) {
      this.statsService.getStats(user.id).subscribe({
        next: (data) => {
          console.log('Stats data received:', data);
          if (data && data.stats) {
            this.stats = data.stats;
            
            // Ensure chipHistory exists and has values
            if (this.stats.chipHistory && this.stats.chipHistory.length > 0) {
              // Populate chart data
              this.chipsChartData.labels = this.stats.chipHistory.map((_: any, index: number) => `Game ${index + 1}`);
              this.chipsChartData.datasets[0].data = this.stats.chipHistory;
            } else {
              // Default data if chipHistory is empty
              this.chipsChartData.labels = ['Start'];
              this.chipsChartData.datasets[0].data = [this.stats.chips || 1000];
            }
            
            // Update chart if it exists
            if (this.chart) {
              this.chart.update();
            }
          } else {
            console.error('Invalid stats data format:', data);
          }
        },
        error: (err) => {
          console.error('Error fetching stats:', err);
        },
      });
    } else {
      console.error('User not found or not logged in');
    }
  }
}