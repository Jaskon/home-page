import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MainComponent } from '../main.component';
import { Globals } from '../../globals';

@Component({
  selector: 'app-edit-components-dialog',
  templateUrl: './edit-components-dialog.component.html',
  styleUrls: ['./edit-components-dialog.component.scss']
})
export class EditComponentsDialogComponent implements OnInit {

  chooseComponent: boolean = false;
  fileInput: HTMLInputElement;
  predefinedComponents = [{name: 'asdf'}, {name: 'fdsa'}];

  constructor(public dialogRef: MatDialogRef<MainComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private globals: Globals) { }

  ngOnInit() {
    this.fileInput = (document.getElementById('fileInput') as HTMLInputElement);

    // When file selected
    this.fileInput.onchange = () => {
      if (this.fileInput.files.length > 0) {
        var fileReader = new FileReader();
        fileReader.readAsText(this.fileInput.files[0]);
        fileReader.onloadend = () => {
          var file = fileReader.result;

          // Check this file with regExp
          if (!this.data.fileRegExp.test(file)) {
            alert('Неверный формат файла');
            return;
          }

          this.data.components.push({
            htmlContent: file,
            toAdd: true
          });

          // Clear the input
          this.fileInput.value = '';
        }
      }
    }
  }


  addPredefinedComponent(component) {
    this.data.components.push(component);
    this.chooseComponent = false;
  }

  addComponentFromFile() {
    // TODO: Вызвать окно выбора файла
    this.fileInput.click();

    // The rest logic is in the ngOnInit fuction (fileInput.onchange)
  }

  deleteComponent(index: number) {
    this.data.components.splice(index, 1);
  }


  onNoClick() {
    this.dialogRef.close();
  }

  onOkClick() {
    this.dialogRef.close(this.data.components);
  }

}
