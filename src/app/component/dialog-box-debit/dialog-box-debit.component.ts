import { Component, OnInit, Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-box-debit',
  templateUrl: './dialog-box-debit.component.html',
  styleUrls: ['./dialog-box-debit.component.css']
})
export class DialogBoxDebitComponent implements OnInit {

  debitAmount: string = "";  

  //allow dialog box to receive data
  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
  }

}
