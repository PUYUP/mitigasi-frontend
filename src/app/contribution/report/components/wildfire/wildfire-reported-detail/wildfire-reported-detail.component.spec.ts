import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WildfireReportedDetailComponent } from './wildfire-reported-detail.component';

describe('WildfireReportedDetailComponent', () => {
  let component: WildfireReportedDetailComponent;
  let fixture: ComponentFixture<WildfireReportedDetailComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [WildfireReportedDetailComponent],
        imports: [IonicModule.forRoot()],
      }).compileComponents();

      fixture = TestBed.createComponent(WildfireReportedDetailComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
