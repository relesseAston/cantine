import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccueilComponent } from './layout/accueil/accueil.component';
import { AdminComponent } from './layout/admin/admin.component';
import { DetailMealComponent } from './layout/detail-meal/detail-meal.component';
import { LoginComponent } from './layout/login/login.component';
import { MenusComponent } from './layout/menus/menus.component';
import { ProfileComponent } from './layout/profile/profile.component';


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
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'detailMeal/:id',
    component: DetailMealComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
