import { Component, OnInit } from '@angular/core';
import { UserRecap } from '../../models/UserRecap';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DialogBoxCreditComponent } from '../../component/dialog-box-credit/dialog-box-credit.component';
import { DialogBoxDebitComponent } from '../../component/dialog-box-debit/dialog-box-debit.component';
import { UsersService } from '../../../service/users.service';
import { WalletService } from '../../../service/wallet.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: UserRecap[] = [];
  displayedColumns: string[] = ['name', 'firstname', 'wallet', 'id'];
  dataSource = new MatTableDataSource<UserRecap>(this.users);

  constructor(
    private usersService: UsersService,
    public dialog: MatDialog,
    private walletService: WalletService
    ){}

  ngOnInit(): void {
    this.getUsers();
  }
  
  // get users list
  getUsers() {
    this.usersService.getUsers().subscribe( (data) => {
      this.users = data.body;
      this.users = this.sortUsersByName(this.users);
      console.log(this.users);
      this.dataSource.data = this.users;
    })
  }

  // function that orders users alphabetically by name
  sortUsersByName(users :UserRecap[])  {
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

  // callback function to credit user on dialogbox interaction
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
