import { Component, OnInit } from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-toolate-snackbar',
  templateUrl: './toolate-snackbar.component.html',
  styleUrls: ['./toolate-snackbar.component.css']
})
export class ToolateSnackbarComponent implements OnInit {

  constructor(private snackBarRef: MatSnackBarRef<ToolateSnackbarComponent>){}
  close(){
    this.snackBarRef.dismiss();
  }

  ngOnInit(): void {
  }

}
