import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TsunamiSensorDetailComponent } from './tsunami-sensor-detail.component';

describe('TsunamiSensorDetailComponent', () => {
  let component: TsunamiSensorDetailComponent;
  let fixture: ComponentFixture<TsunamiSensorDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TsunamiSensorDetailComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TsunamiSensorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
