import { Component, OnInit } from '@angular/core';
import { ChartcardComponent } from '../chartcard/chartcard.component';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [ChartcardComponent],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']  // Correct the typo here (plural styleUrls)
})
export class LandingComponent implements OnInit {

  constructor(private db: DatabaseService) {}

  labels_year = ['January', 'February', 'March', 'April', 'May', 'Juni', 'July', 'August', 'September', 'October', 'November', 'Dezember'];
  labels_week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  labels_workweek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  labels_hours = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];

  options_bar = {
    responsive: false,
    scales: {
      x: {},
      y: {
        beginAtZero: true
      }
    }
  };

  data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  ngOnInit() {
    // // Fetch logs and log them to the console
    this.db.getAllLogs().subscribe({
      next: (data) => {
        console.log('Logs:', data);
      },
      error: (err) => {
        console.error('Error fetching logs:', err);
      }
    });
  }
}
