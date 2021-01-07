import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/service/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/service/order.service';
import { Commande } from 'src/app/models/Commande';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  id_user: any;
  currentUser: any;
  readonly : Boolean = true;
  userForm: FormGroup;
  /*name: String;
  firstname: String;
  email: String;
  phone: String;
  address: String;
  postalCode: String;
  town: String;*/
  commandes: Commande[] = [];
  panelOpenState = false;

  constructor(private fb: FormBuilder, private order_service: OrderService, private user_service: UserService, private route: ActivatedRoute) { 
    this.id_user =+ this.route.snapshot.paramMap.get('idUser');
  }

  ngOnInit(): void {
    this.getUserById(this.id_user);
    this.generateUserForm();
    this.recapOrder(this.id_user);
  }

  async getUserById(id_user : number) {
    const response = await this.user_service.getUserById(id_user);
    this.currentUser = response;
    console.log(this.currentUser);
    this.getUserImg(id_user);
  }

  async getUserImg(id_user:number) {
    const response = await this.user_service.getImgUser(id_user);
    this.currentUser.image64 = response.image64;
    this.patchValue();
  }

  generateUserForm() {
    this.userForm = this.fb.group({
      name: [''],
      firstname: [''],
      email: [''],
      phone: [''],
      address: [''],
      postalCode: [''],
      town: [''],
      wallet: [''],
      password: [''],
      sex: [''],
      isLunchLady: [''],
    });
  }

  patchValue() {
    this.userForm.setValue({
      name: [this.currentUser.name],
      firstname: [this.currentUser.firstname],
      email: [this.currentUser.email],
      phone: [this.currentUser.phone],
      address: [this.currentUser.address],
      postalCode: [this.currentUser.postalCode],
      town: [this.currentUser.town],
      wallet: [this.currentUser.wallet],
      password: [''],
      sex: [this.currentUser.sex],
      isLunchLady: [this.currentUser.isLunchLady],
    })
  }

  readonlyOn() {
    this.readonly = false;
  }

  readonlyOff() {
    this.readonly = true;
  }

  modificationProfile(idUser: number) {
    console.log(idUser);
    console.log(this.userForm.value);
    this.user_service.updateProfile(idUser, JSON.stringify(this.userForm.value))
    .then(res => {
      console.log('res', res)
    })
    .catch(err => {
      console.log('err', err);
    });
  }

  recapOrder(id_user: number) {
    this.order_service.findAllbyUser(id_user)
    .subscribe(data => {
      this.commandes = data;
      console.log(data);
    })
  }


}
