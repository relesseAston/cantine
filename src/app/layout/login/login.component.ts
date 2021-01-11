import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/service/auth.service';
import { TokenStorageService } from 'src/service/token-storage.service';
import { FormGroup, FormControl, FormBuilder,Validators } from '@angular/forms';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userProfile: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  // form = {
  //   email: this.userProfile.get('email').value,//"toto@gmail.com"
  //   password:"bonjour"// this.userProfile.get('password').value//
  // };

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private fb:FormBuilder) { }
  
  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
    this.editForm();
  }
  
  editForm(){
    this.userProfile = this.fb.group({
      email:['',Validators.required],
      password:['',Validators.required],
    })
  }

  onSubmit(): void {
    const form = this.userProfile.value;
    this.authService.login(JSON.stringify(form))
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
      // console.log(this.errorMessage);
      this.isLoginFailed = true;
    }

    )
  }

  reloadPage(): void {
    window.location.replace("/admin");
  }



}
