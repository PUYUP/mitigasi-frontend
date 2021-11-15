import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurecodeValidationDialogComponent } from './securecode-validation-dialog.component';

describe('SecurecodeValidationDialogComponent', () => {
  let component: SecurecodeValidationDialogComponent;
  let fixture: ComponentFixture<SecurecodeValidationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecurecodeValidationDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurecodeValidationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
