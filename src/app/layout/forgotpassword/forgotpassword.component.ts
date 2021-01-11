import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/service/auth.service';


@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit,OnDestroy {

  forgotForm: FormGroup;

  constructor(private fb: FormBuilder,private service: AuthService) { 
    this.forgotForm = fb.group({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  ngOnInit(): void {
  }

  onSubmit(){  
    this.service.forgotPassword(this.forgotForm.value)
    .subscribe(
      res => {
         console.log('Votre mot de passe à été réinitialisé, veillez vérifier votre boite mail'); },
        (err) => { console.log('err', err)},
        () => {});
      }

  ngOnDestroy(){

  }

}
