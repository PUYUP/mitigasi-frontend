import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VolcanoSensorDetailComponent } from './volcano-sensor-detail.component';

describe('VolcanoSensorDetailComponent', () => {
  let component: VolcanoSensorDetailComponent;
  let fixture: ComponentFixture<VolcanoSensorDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VolcanoSensorDetailComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VolcanoSensorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
