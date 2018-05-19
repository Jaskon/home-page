import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FeaturesComponent } from '../features.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<FeaturesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }


  onNoClick() {
    this.dialogRef.close();
  }

  onOkClick() {
    if (!this.data.output.date) {
      return;
    }

    if (!this.data.output.text) {
      this.data.output.text = null;
    }

    this.dialogRef.close(this.data.output);
  }

}
