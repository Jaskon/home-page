import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStickerDialogComponent } from './add-sticker-dialog.component';

describe('AddStickerDialogComponent', () => {
  let component: AddStickerDialogComponent;
  let fixture: ComponentFixture<AddStickerDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStickerDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStickerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
