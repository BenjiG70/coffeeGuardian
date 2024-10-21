import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { UserComponent } from './user/user.component';
import { CreditComponent } from './credit/credit.component';

export const routes: Routes = [
    {path:"", component:LandingComponent},
    {path:"user", component:UserComponent},
    {path:"credit", component:CreditComponent}
];
