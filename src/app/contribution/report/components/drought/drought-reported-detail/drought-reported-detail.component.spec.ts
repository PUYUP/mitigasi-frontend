import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DroughtReportedDetailComponent } from './drought-reported-detail.component';

describe('DroughtReportedDetailComponent', () => {
  let component: DroughtReportedDetailComponent;
  let fixture: ComponentFixture<DroughtReportedDetailComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [DroughtReportedDetailComponent],
        imports: [IonicModule.forRoot()],
      }).compileComponents();

      fixture = TestBed.createComponent(DroughtReportedDetailComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
