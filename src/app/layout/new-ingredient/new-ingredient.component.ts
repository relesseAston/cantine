import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IngredientService } from 'src/service/ingredient.service';

@Component({
  selector: 'app-new-ingredient',
  templateUrl: './new-ingredient.component.html',
  styleUrls: ['./new-ingredient.component.css']
})
export class NewIngredientComponent implements OnInit {

  img64 : any;
  igrdForm : FormGroup;

  constructor(private fb: FormBuilder, private ingredient_service: IngredientService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.igrdForm = this.fb.group({
      description: [''],
      label: [''],
      image : this.fb.group({
        imagePath: [''],
        image64: ['']
      })
    });
  }

  handleFileSelect($event) {
    var files = $event.target.files;
    var file = files[0];

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

  async createIgrd() {
    var form = this.igrdForm.value
    if(form.image.imagePath != "") form.image.image64 = "data:image/jpeg;base64,"+this.img64;
    return await this.ingredient_service.addIgrd(JSON.stringify(form))
    .then(res => {
      // console.log('res : ', res);
    })
    .catch(err => {
      // console.log('err : ', err);
    })

  }

}
