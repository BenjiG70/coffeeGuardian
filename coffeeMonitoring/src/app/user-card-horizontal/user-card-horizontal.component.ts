import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-card-horizontal',
  standalone: true,
  imports: [],
  templateUrl: './user-card-horizontal.component.html',
  styleUrl: './user-card-horizontal.component.scss'
})
export class UserCardHorizontalComponent {

  @Input() Name:string="Max Mustermann";
  @Input() UID:string= "0";
}
