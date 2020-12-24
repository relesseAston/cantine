import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccueilComponent } from './layout/accueil/accueil.component';
import { LoginComponent } from './layout/login/login.component';
import { MenusComponent } from './layout/menus/menus.component';
import { ProfileComponent } from './layout/profile/profile.component';
import { InscriptionComponent } from './layout/inscription/inscription.component';
import { ForgotpasswordComponent } from './layout/forgotpassword/forgotpassword.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/accueil',
    pathMatch: 'full'
  },
  {
    path: 'accueil',
    component: AccueilComponent
  },
  {
    path: 'menus',
    component: MenusComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'inscription',
    component: InscriptionComponent
  },
  {
    path: 'forgotpassword', 
    component: ForgotpasswordComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
