import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LandslideCurrentlyDetailComponent } from './landslide-currently-detail.component';

describe('LandslideCurrentlyDetailComponent', () => {
  let component: LandslideCurrentlyDetailComponent;
  let fixture: ComponentFixture<LandslideCurrentlyDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LandslideCurrentlyDetailComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LandslideCurrentlyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
