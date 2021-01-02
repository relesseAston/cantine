import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccueilComponent } from './layout/accueil/accueil.component';
import { AdminComponent } from './layout/admin/admin.component';
import { DetailMealComponent } from './layout/detail-meal/detail-meal.component';
import { LoginComponent } from './layout/login/login.component';
import { MenusComponent } from './layout/menus/menus.component';
import { ProfileComponent } from './layout/profile/profile.component';
import { InscriptionComponent } from './layout/inscription/inscription.component';
import { ForgotpasswordComponent } from './layout/forgotpassword/forgotpassword.component';
import { CartComponent } from './layout/cart/cart.component';
import { AuthGuard } from './helpers/auth.guard';
import { NewMenuComponent } from './layout/new-menu/new-menu.component';
import { NewMealComponent } from './layout/new-meal/new-meal.component';
import { NewIngredientComponent } from './layout/new-ingredient/new-ingredient.component';

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
    component: LoginComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'inscription',
    component: InscriptionComponent
  },
  {
    path: 'forgotpassword', 
    component: ForgotpasswordComponent },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { lunchLadyRole: true } 
  },
  {
    path: 'meal/:mealId',
    component: DetailMealComponent
  },
  { 
    path: 'cart', 
    component:CartComponent 
  },
  {
    path: 'new-menu',
    component: NewMenuComponent,
    canActivate: [AuthGuard],
    data: { lunchLadyRole: true } 
  },
  {
    path: 'new-meal',
    component: NewMealComponent,
    canActivate: [AuthGuard],
    data: { lunchLadyRole: true } 
  },
  {
    path: 'new-ingredient',
    component: NewIngredientComponent,
    canActivate: [AuthGuard],
    data: { lunchLadyRole: true } 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
