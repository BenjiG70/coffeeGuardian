import { Component, Input, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { apiDataLog, apiDataUser, userData } from '../../datatypes/database_interaction';

@Component({
  selector: 'app-user-card-vertical',
  standalone: true,
  imports: [],
  templateUrl: './user-card-vertical.component.html',
  styleUrl: './user-card-vertical.component.scss'
})
export class UserCardVerticalComponent implements OnInit{

  @Input() TagID:string = "";
  @Input() Time:string="";

  ngOnInit(): void {
      this.Time = this.timeformatting(this.Time);
  }

  timeformatting(time:string){
    let formattedTime:string;
    let temp = new Date(time);
    formattedTime = temp.toLocaleString();
    return formattedTime
  }

}
