import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DroughtCurrentlyDetailComponent } from './drought-currently-detail.component';

describe('DroughtCurrentlyDetailComponent', () => {
  let component: DroughtCurrentlyDetailComponent;
  let fixture: ComponentFixture<DroughtCurrentlyDetailComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [DroughtCurrentlyDetailComponent],
        imports: [IonicModule.forRoot()],
      }).compileComponents();

      fixture = TestBed.createComponent(DroughtCurrentlyDetailComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
