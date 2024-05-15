import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditaisComponent } from './editais.component';

describe('EditaisComponent', () => {
  let component: EditaisComponent;
  let fixture: ComponentFixture<EditaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditaisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
