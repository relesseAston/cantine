import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { OrderService } from '../../../service/order.service';
import { Commande } from '../../models/Commande';
import { User } from '../../models/User';
import { ConfirmDialogComponent } from '../../component/confirm-dialog/confirm-dialog.component';

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

  constructor(
    private cantiniere_api: OrderService,
    private route: ActivatedRoute,
    private dialog: MatDialog
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
        // console.log("Commande n°" + id + " validée et payée !");
      }
    });
  }

  ngOnInit(): void {}
}
