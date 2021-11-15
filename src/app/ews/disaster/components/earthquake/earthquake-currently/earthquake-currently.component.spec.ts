import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EarthquakeCurrentlyComponent } from './earthquake-currently.component';

describe('EarthquakeCurrentlyComponent', () => {
  let component: EarthquakeCurrentlyComponent;
  let fixture: ComponentFixture<EarthquakeCurrentlyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EarthquakeCurrentlyComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EarthquakeCurrentlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
