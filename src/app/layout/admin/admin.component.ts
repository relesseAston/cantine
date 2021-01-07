import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { OrderService } from '../../../service/order.service';
import { Commande } from '../../models/Commande';
import { User } from '../../models/User';
import { ConfirmDialogComponent } from '../../component/confirm-dialog/confirm-dialog.component';
import { WalletService } from 'src/service/wallet.service';
import { UserService } from 'src/service/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { DialogBoxCreditComponent } from 'src/app/component/dialog-box-credit/dialog-box-credit.component';
import { DialogBoxDebitComponent } from 'src/app/component/dialog-box-debit/dialog-box-debit.component';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CantiniereServiceService } from 'src/service/cantiniere-service.service';
import { MealService } from 'src/service/meal.service';
import { IngredientService } from 'src/service/ingredient.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  commandes_passees: Commande[] = [];
  users: User[] = [];
  userId: any;
  displayedColumns2: string[] = ['id', 'idUser', 'firstName', 'name', 'creationDate', 'creationTime', 'status', 'action'];
  dataSource2 = new MatTableDataSource<Commande>(this.commandes_passees);

  //Variable Max

  usersTab: User[] = [];
  displayedColumns: string[] = ['name', 'firstname', 'wallet', 'id'];
  dataSource = new MatTableDataSource<User>(this.usersTab);

  //Variable Rélesse

  menus = [];
  meals = [];
  panelOpenState = false;

  constructor(
    private router: Router,
    private cantiniere_api: OrderService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private walletService: WalletService,
    private userService: UserService,
    private cantiniere_service : CantiniereServiceService,
    private meal_service: MealService,
    private ingredient_service: IngredientService
  ) {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.cantiniere_api.findAll().subscribe((data) => {
      this.commandes_passees = data;
      this.dataSource2.data = this.commandes_passees;
      //console.log(this.commandes_passees);
    });

    this.dataSource2.filterPredicate = function(data, filter:string):boolean {
      return data.user.name.toLowerCase().includes(filter) || data.user.firstname.toLowerCase().includes(filter);
    }
  }

  cancelOrder(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Annulation de la commande',
        message: "Confirmer l'annulation de la commande n°" + id + ' ?',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'confirm') {
        this.cantiniere_api
          .cancel(id)
          .subscribe(() => window.location.reload());
          //console.log("Commande n°" + id + " annulée !");
      }
    });
  }

  payOrder(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmation de la commande',
        message: "Confirmer et payer la commande n°" + id + ' ?',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'confirm') {
        this.cantiniere_api
          .pay(id)
          .subscribe(() => window.location.reload());
          //console.log("Commande n°" + id + " validée et payée !");
      }
    });
  }

  ngOnInit(): void {
    this.getUsers();
    this.getAllMenus();
    this.getAllMeals();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource2.filter = filterValue;
  }

  /**
   * Code de Max
   */

  // get users list
  async getUsers() {
    const response = await this.userService.getAllUser();
    this.usersTab = response;
    this.usersTab = this.sortUsersByName(this.usersTab);
    this.dataSource.data = this.usersTab;
    /*.subscribe( (data) => {
      this.users = data.body;
      this.users = this.sortUsersByName(this.users);
      // console.log(this.users);
      this.dataSource.data = this.users;
    })*/
  }

  // function that orders users alphabetically by name
  sortUsersByName(users :User[])  {
    let sortedUsers = users.sort((a,b) => {
      if( a.name.toLowerCase() < b.name.toLowerCase()) {
        return - 1;
      }
      if( a.name.toLowerCase() > b.name.toLowerCase()) {
        return - 0;
     }
     return 0;
     })
     return sortedUsers;
  }

  creditUser(id: number) {
    //open dialog-box-credit
    let dialogRef = this.dialog.open(DialogBoxCreditComponent, {data: {userId: id}})

    //callback func. on dialog-box closing
    dialogRef.afterClosed().subscribe( creditAmount => {
      
      // credit amount check
      parseInt(creditAmount);
      if (isNaN(creditAmount) || creditAmount <= 0) {
        alert('veuillez entrer un montant valide');
      } else {

        // call walletService to credit the user and reload
        this.walletService.creditUser(id, creditAmount).subscribe( (res) => {
        window.alert(`${res.name} ${res.firstname} a été crédité de : ${creditAmount}€`);
        window.location.reload();
        })
      }
    })
  }

  //callback function to debit user on dialogbox interaction (function detail similar to  creditUser() )
  debitUser(id: number) {
    let dialogRef = this.dialog.open(DialogBoxDebitComponent, {data: {userId: id}})
    dialogRef.afterClosed().subscribe( debitAmount => {
      parseInt(debitAmount);
      if (isNaN(debitAmount) || debitAmount <= 0) {
        alert('veuillez entrer un montant valide');
      } else {
        this.walletService.debitUser(id, debitAmount).subscribe( (res) => {
        window.alert(`${res.name} ${res.firstname} a été débité de : ${debitAmount}€`);
        window.location.reload();
        })
      }
    })
  }

  /**
   * Partie Rélesse (gestion des menus)
   */

  async getAllMenus() {
    const response = await this.cantiniere_service.getMenus();
    this.menus = response;
    this.menus.forEach(element => {
      this.getImageMenu(element.id);
      if(element.meals) {
        element.meals.forEach(element_meal => {
          this.getImageMeal(element_meal.id);
        });
      }
    })
  }

  async getImageMenu(id_menu) {
    const response = await this.cantiniere_service.getImageMenus(id_menu);
    this.menus.forEach(element => {
      if(element.imageId === response.id){
        element.img = response.image64;
      }
    });
    
  }

  async getImageMeal(id_meal: number) {
    const response = await this.cantiniere_service.getImageMeal(id_meal);
    this.menus.forEach(element => {
      if(element.meals) {
        element.meals.forEach(element_meal => {
          if(element_meal.imageId === response.id){
            element_meal.img64 = response.image64;
          }
        });
      }
    })
  }

  modifMenu(menuId: number) {
    this.router.navigateByUrl('modif-menu/'+menuId);
  }

  modifMeal(mealId: number) {
    this.router.navigateByUrl('modif-meal/'+mealId);
  }

  voirProfil(id_user) {
    this.router.navigateByUrl('profile/'+id_user);
  }

  async getAllMeals() {
    const response = await this.meal_service.findAll();
    this.meals = response;
    this.meals.forEach(element => {
      this.imageMeal(element.id);
      if(element.ingredients){
        element.ingredients.forEach(element_igrd => {
          this.getIgrdImage(element_igrd.id);
        })
      } 
    })


  }

  async imageMeal(id_meal) {
    const response = await this.cantiniere_service.getImageMeal(id_meal);
    this.meals.forEach(element => {
      if(element.imageId === response.id){
        element.img = response.image64;
      }
    });

  }

  async getIgrdImage(id_igrd) {
    const response = await this.ingredient_service.getIgrdImage(id_igrd);
    this.meals.forEach(element => {
      if(element.ingredients) {
        element.ingredients.forEach(element_igrd => {
          if(element_igrd.imageId === response.id) {
            element_igrd.img64 = response.image64;
          }
        })
      }
    })
  }



}
