import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/service/auth.service';
import { TokenStorageService } from 'src/service/token-storage.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form = {
    email: "toto@gmail.com",
    password: "bonjour"
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, ) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }

  connexion(): void {
    this.authService.login(JSON.stringify(this.form))
    .then( res => {
        console.log(res);
        let token = res.headers.get('Authorization').split('Bearer').pop()
        let user = jwt_decode(token);
        this.tokenStorage.saveToken(token);
        this.tokenStorage.saveUser(user);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.reloadPage();
    },
    ).catch(err => {
      console.log('err : ', err);
      this.errorMessage = err.error.message;
      //console.log(this.errorMessage);
      this.isLoginFailed = true;
    }

    )/*.subscribe(
      data => {
        console.log(data);
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
        //console.log(this.errorMessage);
        this.isLoginFailed = true;
      }
    );*/
  }

  reloadPage(): void {
    window.location.reload();
  }



}
