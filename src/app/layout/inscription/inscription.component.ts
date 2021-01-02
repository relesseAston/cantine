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
    var final_form = this.inscriptionForm.value;
    if(final_form.image.imagePath != "") final_form.image.image64 = "data:image/jpeg;base64,"+this.img64;
    this.user_service.setInscription(final_form)
    .then(res => {
      console.log("res : ",res);
    })
    .catch(err => {
      console.log("err : ", err);
    })
      /*.subscribe(
        rest => {
          console.log(rest)
        }
      )*/
      //this.inscriptionForm.reset()

    }

   
  }

  handleFileSelect($event) {
    var files = $event.target.files;
      //console.log(files);
      var file = files[0];
      //console.log(file);
    
    if (files && file) {
        var reader = new FileReader();

        reader.onload =this._handleReaderLoaded.bind(this);

        reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.img64= btoa(binaryString);
  }


}
