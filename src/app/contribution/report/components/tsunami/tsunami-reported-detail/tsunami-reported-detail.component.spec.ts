import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TsunamiReportedDetailComponent } from './tsunami-reported-detail.component';

describe('TsunamiReportedDetailComponent', () => {
  let component: TsunamiReportedDetailComponent;
  let fixture: ComponentFixture<TsunamiReportedDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TsunamiReportedDetailComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TsunamiReportedDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
