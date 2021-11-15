import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EarthquakeCurrentlyDetailComponent } from './earthquake-currently-detail.component';

describe('EarthquakeCurrentlyDetailComponent', () => {
  let component: EarthquakeCurrentlyDetailComponent;
  let fixture: ComponentFixture<EarthquakeCurrentlyDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EarthquakeCurrentlyDetailComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EarthquakeCurrentlyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
