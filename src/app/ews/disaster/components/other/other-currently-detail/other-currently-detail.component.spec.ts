import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OtherCurrentlyDetailComponent } from './other-currently-detail.component';

describe('OtherCurrentlyDetailComponent', () => {
  let component: OtherCurrentlyDetailComponent;
  let fixture: ComponentFixture<OtherCurrentlyDetailComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [OtherCurrentlyDetailComponent],
        imports: [IonicModule.forRoot()],
      }).compileComponents();

      fixture = TestBed.createComponent(OtherCurrentlyDetailComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
