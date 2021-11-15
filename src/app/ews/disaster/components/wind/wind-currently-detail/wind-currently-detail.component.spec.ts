import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WindCurrentlyDetailComponent } from './wind-currently-detail.component';

describe('WindCurrentlyDetailComponent', () => {
  let component: WindCurrentlyDetailComponent;
  let fixture: ComponentFixture<WindCurrentlyDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WindCurrentlyDetailComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WindCurrentlyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
