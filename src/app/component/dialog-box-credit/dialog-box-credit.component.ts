import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-box-credit',
  templateUrl: './dialog-box-credit.component.html',
  styleUrls: ['./dialog-box-credit.component.css']
})
export class DialogBoxCreditComponent implements OnInit {

  creditAmount: string = "";  
  //allow dialog box to receive data

  constructor(@Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
  }

}
