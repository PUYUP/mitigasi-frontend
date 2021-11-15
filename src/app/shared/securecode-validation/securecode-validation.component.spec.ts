import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurecodeValidationComponent } from './securecode-validation.component';

describe('SecurecodeValidationComponent', () => {
  let component: SecurecodeValidationComponent;
  let fixture: ComponentFixture<SecurecodeValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecurecodeValidationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurecodeValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
