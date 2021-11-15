import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DroughtSensorDetailComponent } from './drought-sensor-detail.component';

describe('DroughtSensorDetailComponent', () => {
  let component: DroughtSensorDetailComponent;
  let fixture: ComponentFixture<DroughtSensorDetailComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [DroughtSensorDetailComponent],
        imports: [IonicModule.forRoot()],
      }).compileComponents();

      fixture = TestBed.createComponent(DroughtSensorDetailComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
