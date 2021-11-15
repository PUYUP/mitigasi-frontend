import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LandslideCurrentlyComponent } from './landslide-currently.component';

describe('LandslideCurrentlyComponent', () => {
  let component: LandslideCurrentlyComponent;
  let fixture: ComponentFixture<LandslideCurrentlyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LandslideCurrentlyComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LandslideCurrentlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
