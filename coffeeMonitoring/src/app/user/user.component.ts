import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCardHorizontalComponent } from '../user-card-horizontal/user-card-horizontal.component';
import { UserCardVerticalComponent } from '../user-card-vertical/user-card-vertical.component';
import { apiDataLog, apiDataUser, logData, userData } from '../../datatypes/database_interaction';
import { DatabaseService } from '../../services/database.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [UserCardHorizontalComponent, UserCardVerticalComponent, CommonModule, FormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit{

  constructor(private db:DatabaseService) {}

  unregistered:apiDataLog={};
  unregisteredArray: logData[] = []; // Array für ngFor

  user:apiDataUser={};
  userArray: userData[]=[];
  ngOnInit(): void {
    this.db.getUnregisteredUser().subscribe({
      next: (data) => {
        this.unregistered = data;
        this.unregisteredArray = Object.values(this.unregistered);
        for(let test of this.unregisteredArray){
          console.log(test)
        }
      }
    });
    this.db.getAllUsers().subscribe({
      next: (data) => {
        this.user = data;
        this.userArray = Object.values(this.user);
      }
    });
  }
  registration: userData = {
    UID: '',
    REGISTERED_SINCE: '', // Beispiel: '2024-10-21'
    SURNAME: '',
    NAME: '',
    MAIL: '',
    CREDIT: 0,
    COFFEE_COUNT: 0
  };

  onSubmit() {
      // Hier kannst du die Logik einfügen, um die Daten zu verarbeiten
      
      if(this.registration.REGISTERED_SINCE==null){
        this.registration.REGISTERED_SINCE=new Date().toLocaleString();
      }
      console.log('Benutzerdaten:', this.registration);
      this.db.insertUser(this.registration).subscribe(
        response => {
          console.log('Benutzer erfolgreich eingefügt:', response);
          // Füge hier eine Benachrichtigung oder Erfolgsmeldung hinzu
          alert('Benutzer erfolgreich eingefügt');
          // Optional: Formular zurücksetzen
          // this.resetForm();
        },
        error => {
          console.error('Fehler beim Einfügen des Benutzers:', error);
          // Füge hier Fehlerbehandlung hinzu
          alert('Fehler beim Einfügen des Benutzers');
        }
      );
    }

  }