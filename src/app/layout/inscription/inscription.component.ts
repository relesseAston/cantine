import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/service/user.service';


@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  
  inscriptionForm: FormGroup

  name: string
  surname: string
  sex: string
  phone: string
  address: string
  postalCode: string
  town: string
  email: string
  password: string


  constructor(fb: FormBuilder, private user_service: UserService) { 
    this.inscriptionForm = fb.group({
      firstname: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      sex: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      address: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(40)]),
      isLunchLady: new FormControl('false'),
      postalCode: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]),
      town: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      image64: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      wallet: new FormControl(0),
      registrationDate: Date(),
      status: new FormControl(1)
    })
  }

  ngOnInit(): void {
  }
  createUser() {


    if (this.inscriptionForm.valid) {
      this.user_service.setInscription(this.inscriptionForm.value)
        .subscribe(
          rest => {
            console.log(rest)
          }
        )
      this.inscriptionForm.reset()

    }

   
  }

}
