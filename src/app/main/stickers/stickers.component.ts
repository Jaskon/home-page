import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddStickerDialogComponent } from './add-sticker-dialog/add-sticker-dialog.component';


interface Sticker {
  title: string,
  text: string,
  index: number
}


@Component({
  selector: 'app-stickers',
  templateUrl: './stickers.component.html',
  styleUrls: ['./stickers.component.scss']
})
export class StickersComponent implements OnInit {

  stickers: Array<Sticker>/* = [{
    title: 'Sticker title',
    text: 'Sticker text 123 asdf',
    index: 2
  }, {
    title: 'Sticker 2 title',
    text: 'Sticker 2 text asdf 123',
    index: 1
  }]*/;


  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    this.loadStickers();
  }

  /** Find an item from stickers object by its 'index' field */
  findIndexOfElem(one: Sticker): number {
    for (var i = 0; i < this.stickers.length; i++) {
      if (this.stickers[i].index === one.index) {
        return i;
      }
    }
  }

  /** Save stickers object to the localStorage */
  saveStickers() {
    localStorage.setItem('stickers', JSON.stringify(this.stickers));
  }

  /** Load stickers object from the localStorage */
  loadStickers() {
    var stickers: Array<Sticker> = JSON.parse(localStorage.getItem('stickers'));
    stickers = stickers ? stickers : [];
    this.stickers = stickers;
  }


  /** Show the gui to add a new sticker */
  addStickerGUI() {
    var dialogRef = this.dialog.open(AddStickerDialogComponent, {
      width: '350px',
      data: {
        output: { title: null, text: null }
      }
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (!data) {
        return;
      }

      console.log('New sticker created: ' + data);
      this.addSticker(data.title, data.text);
    });
  }

  /** Logic of sticker adding */
  addSticker(title, text) {
    this.stickers.unshift({
      title: title,
      text: text,
      index: this.stickers[0] ? this.stickers[0].index + 1 : 1
    });
    this.saveStickers();
  }

  /** Show the gui to edit a new sticker */
  editStickerGUI(sticker) {
    var dialogRef = this.dialog.open(AddStickerDialogComponent, {
      width: '350px',
      data: {
        output: { title: sticker.title, text: sticker.text }
      }
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (!data) {
        return;
      }

      console.log('Sticker edited: ' + sticker + ' to ' + data);
      this.editSticker(sticker, data.title, data.text);
    });
  }

  /** Logic of sticker editing */
  editSticker(sticker, title, text) {
    sticker.title = title;
    sticker.text = text;
    this.saveStickers();
  }

  /** Remove sticker from stickers list */
  deleteSticker(sticker) {
    this.stickers.splice(this.findIndexOfElem(sticker), 1);
    this.saveStickers();
  }

}
