import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  commandes_passees: Commande[] = [];
  commandes: Commande[] = [];
  users: User[] = [];
  userId: any;

  //Variable Max

  usersTab: User[] = [];
  displayedColumns: string[] = ['name', 'firstname', 'wallet', 'id'];
  dataSource = new MatTableDataSource<User>(this.usersTab);

  constructor(
    private cantiniere_api: OrderService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private walletService: WalletService,
    private userService: UserService
  ) {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.cantiniere_api.findAll().subscribe((data) => {
      this.commandes_passees = data;
      console.log(this.commandes_passees);
    });
    this.cantiniere_api.findAllbyUser(this.userId).subscribe((data) => {
      this.commandes = data;
      console.log(this.commandes);
    });
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
        // console.log("Commande n°" + id + " annulée !");
      }
    });
  }

  ngOnInit(): void {
    this.getUsers();
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



}
