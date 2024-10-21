import { Component, OnInit } from '@angular/core';
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

  constructor(private db:DatabaseService) {}

  unregistered:apiDataLog={};
  ngOnInit(): void {
    this.db.getUnregisteredUser().subscribe({
      next: (data) => {
        this.unregistered = data;
        console.log(data);
      }
    });
  }
  
}
