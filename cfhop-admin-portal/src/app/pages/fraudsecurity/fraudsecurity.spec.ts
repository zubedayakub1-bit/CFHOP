import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Fraudsecurity } from './fraudsecurity';

describe('Fraudsecurity', () => {
  let component: Fraudsecurity;
  let fixture: ComponentFixture<Fraudsecurity>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Fraudsecurity],
    }).compileComponents();

    fixture = TestBed.createComponent(Fraudsecurity);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
