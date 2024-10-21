import { Component } from '@angular/core';
import { UserCardHorizontalComponent } from '../user-card-horizontal/user-card-horizontal.component';
import { UserCardVerticalComponent } from '../user-card-vertical/user-card-vertical.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [UserCardHorizontalComponent, UserCardVerticalComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {

}
