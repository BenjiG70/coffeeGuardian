import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ChartcardComponent } from '../chartcard/chartcard.component';
import { DatabaseService } from '../../services/database.service';
import { apiDataCof, apiDataLog, apiDataUser } from '../../datatypes/database_interaction';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [ChartcardComponent],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']  // Correct the typo here (plural styleUrls)
})
export class LandingComponent implements OnInit {

  constructor(private db: DatabaseService, private cdr: ChangeDetectorRef) {}

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
  public logdata:any[] = [];
  logStatsDataProcessing(data:apiDataLog){
    let arr:any[]=[]
    // console.log("before for");
    // console.log(Object.keys(data).length);
    for(let i = 0; i < Object.keys(data).length; i++){
      // console.log(data[i].TIME, data[i].STATUS)
      arr.push(data[i].STATUS);
    }
    return arr;
    // console.log("after log");
  }

  processingUserData(data:apiDataUser){
    console.log("tbd")
  }
  processingCoffeeData(data:apiDataCof){
    console.log("tbd")
  }


  ngOnInit() {
    // Fetch logs and write them in logdata to get nice stats
    this.db.getAllLogs().subscribe({
      next: (data) => {
        // Datenverarbeitung innerhalb des subscribe-Blocks
        this.logdata = this.logStatsDataProcessing(data);
      }
    });
  }
}
