import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConfirmartionComponent } from './dialog-confirmartion.component';

describe('DialogConfirmartionComponent', () => {
  let component: DialogConfirmartionComponent;
  let fixture: ComponentFixture<DialogConfirmartionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogConfirmartionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogConfirmartionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
