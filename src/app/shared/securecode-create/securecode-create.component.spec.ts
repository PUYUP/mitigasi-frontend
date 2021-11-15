import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurecodeCreateComponent } from './securecode-create.component';

describe('SecurecodeCreateComponent', () => {
  let component: SecurecodeCreateComponent;
  let fixture: ComponentFixture<SecurecodeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecurecodeCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurecodeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
