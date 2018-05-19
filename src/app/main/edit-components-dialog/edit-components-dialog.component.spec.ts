import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditComponentsDialogComponent } from './edit-components-dialog.component';

describe('EditComponentsDialogComponent', () => {
  let component: EditComponentsDialogComponent;
  let fixture: ComponentFixture<EditComponentsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditComponentsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditComponentsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
