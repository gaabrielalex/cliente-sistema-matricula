import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditaisDialogAddEditComponent } from './editais-dialog-add-edit.component';

describe('EditaisDialogAddEditComponent', () => {
  let component: EditaisDialogAddEditComponent;
  let fixture: ComponentFixture<EditaisDialogAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditaisDialogAddEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditaisDialogAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
