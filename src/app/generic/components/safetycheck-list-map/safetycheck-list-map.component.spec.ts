import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SafetyCheckListMapComponent } from './safetycheck-list-map.component';

describe('SafetyCheckListMapComponent', () => {
  let component: SafetyCheckListMapComponent;
  let fixture: ComponentFixture<SafetyCheckListMapComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SafetyCheckListMapComponent],
        imports: [IonicModule.forRoot()],
      }).compileComponents();

      fixture = TestBed.createComponent(SafetyCheckListMapComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
