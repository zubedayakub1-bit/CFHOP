import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Financialhealth } from './financialhealth';

describe('Financialhealth', () => {
  let component: Financialhealth;
  let fixture: ComponentFixture<Financialhealth>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Financialhealth],
    }).compileComponents();

    fixture = TestBed.createComponent(Financialhealth);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
