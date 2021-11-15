import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WildfireSensorDetailComponent } from './wildfire-sensor-detail.component';

describe('WildfireSensorDetailComponent', () => {
  let component: WildfireSensorDetailComponent;
  let fixture: ComponentFixture<WildfireSensorDetailComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [WildfireSensorDetailComponent],
        imports: [IonicModule.forRoot()],
      }).compileComponents();

      fixture = TestBed.createComponent(WildfireSensorDetailComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
