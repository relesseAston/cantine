import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/service/user.service';


@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

  img64 : any;
  
  inscriptionForm: FormGroup;

  name: string;
  surname: string;
  email: string;
  password: string;
  sex: string;
  phone: string;
  address: string;
  postalCode: string;
  town: string;



  constructor(private fb: FormBuilder, private user_service: UserService) { 
    this.inscriptionForm = this.fb.group({
      firstname: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      sex: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(12)]),
      address: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(40)]),
      isLunchLady: new FormControl(false),
      postalCode: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]),
      town: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      wallet: new FormControl(0),
      image: fb.group({
        imagePath: new FormControl(''),
        image64: new FormControl('')
      })
      //registrationDate: new Date('YYYY-mm-dd'),
      //status: new FormControl(1)
    })
  }

  ngOnInit(): void {
  
  }

  createUser() {   
    if (this.inscriptionForm.valid) {
      const form = this.inscriptionForm.value;
      this.user_service.setInscription(form)
        .subscribe(
          rest => {
             console.log(rest);
          }
        )
      this.inscriptionForm.reset();
       console.log("form is valid");
    } 
    else {
       console.log("error");
      if (this.inscriptionForm.controls.name.invalid) {

        this.name = "Le prénom est obligatoire"
      }
      if (this.inscriptionForm.controls.surname.invalid) {

        this.surname = "Le nom est obligatoir"
      }
      if (this.inscriptionForm.controls.sex.invalid) {

        this.sex = "Veuillez choisir votre sexe"
      }
      if (this.inscriptionForm.controls.phone.invalid) {

        this.phone = "Votre numéro est obligatoire et doit comporter 10 ou 12 chiffres"
      }
      if (this.inscriptionForm.controls.address.invalid) {

        this.address = "Votre adresse est obligatoire"
      }
      if (this.inscriptionForm.controls.postalCode.invalid) {

        this.postalCode = "Votre code postale est obligatoire"
      }
      if (this.inscriptionForm.controls.town.invalid) {

        this.town = "La ville est obligatoire"
      }
      if (this.inscriptionForm.controls.email.invalid) {

        this.email = "Veuillez rentrer une adresse email valide"
      }
      if (this.inscriptionForm.controls.password.invalid) {

        this.password = "Votre mot de passe est obligatoire, doit comporter au moins 6  caractères"
      }
    }
  }
}
