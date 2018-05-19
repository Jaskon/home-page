import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StickersComponent } from '../stickers.component';

@Component({
  selector: 'app-add-sticker-dialog',
  templateUrl: './add-sticker-dialog.component.html',
  styleUrls: ['./add-sticker-dialog.component.scss']
})
export class AddStickerDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<StickersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }


  onNoClick() {
    this.dialogRef.close();
  }

  onOkClick() {
    if (!this.data.output.text) {
      return;
    }

    if (!this.data.output.title) {
      this.data.output.title = null;
    }

    this.dialogRef.close(this.data.output);
  }

}
