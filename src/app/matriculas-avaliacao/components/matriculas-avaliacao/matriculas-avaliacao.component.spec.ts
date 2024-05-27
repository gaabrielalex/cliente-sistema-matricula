import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatriculasAvaliacaoComponent } from './matriculas-avaliacao.component';

describe('MatriculasAvaliacaoComponent', () => {
  let component: MatriculasAvaliacaoComponent;
  let fixture: ComponentFixture<MatriculasAvaliacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatriculasAvaliacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatriculasAvaliacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
