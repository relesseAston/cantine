import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { NavbarComponent } from './component/navbar/navbar.component';
import { FooterComponent } from './component/footer/footer.component';
import { MenusComponent } from './layout/menus/menus.component';
import { AccueilComponent } from './layout/accueil/accueil.component';
import { LoginComponent } from './layout/login/login.component';
import { AuthInterceptor } from './helpers/auth.interceptor';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { ProfileComponent } from './layout/profile/profile.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { InscriptionComponent } from './layout/inscription/inscription.component';
import { ForgotpasswordComponent } from './layout/forgotpassword/forgotpassword.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { AdminComponent } from './layout/admin/admin.component';
import { MatTabsModule } from '@angular/material/tabs';
import { DetailMealComponent } from './layout/detail-meal/detail-meal.component';
import { CartComponent } from './layout/cart/cart.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './component/confirm-dialog/confirm-dialog.component';
import { DialogBoxCreditComponent } from './component/dialog-box-credit/dialog-box-credit.component';
import { DialogBoxDebitComponent } from './component/dialog-box-debit/dialog-box-debit.component';
import { MatTableModule } from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatMenuModule} from '@angular/material/menu';

import { NewMenuComponent } from './layout/new-menu/new-menu.component';
import { MatSelectModule } from '@angular/material/select';
import { NewMealComponent } from './layout/new-meal/new-meal.component';
import { NewIngredientComponent } from './layout/new-ingredient/new-ingredient.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LoginSnackbarComponent } from './component/login-snackbar/login-snackbar.component';
import { ModifMenuComponent } from './layout/modif-menu/modif-menu.component';
import { ModifMealComponent } from './layout/modif-meal/modif-meal.component';
import { WalletSnackbarComponent } from './component/wallet-snackbar/wallet-snackbar.component';
import { ToolateSnackbarComponent } from './component/toolate-snackbar/toolate-snackbar.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    MenusComponent,
    AccueilComponent,
    LoginComponent,
    ProfileComponent,
    InscriptionComponent,
    ForgotpasswordComponent,
    AdminComponent,
    DetailMealComponent,
    CartComponent,
    ConfirmDialogComponent,
    DialogBoxCreditComponent,
    DialogBoxDebitComponent,
    NewMenuComponent,
    NewMealComponent,
    NewIngredientComponent,
    LoginSnackbarComponent,
    ModifMenuComponent,
    ModifMealComponent,
    WalletSnackbarComponent,
    ToolateSnackbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    MatGridListModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatRadioModule,
    MatButtonModule,
    MatTabsModule,
    MatDialogModule,
    MatTableModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatSnackBarModule,
    MatMenuModule
  ],
  providers: [
    //{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
