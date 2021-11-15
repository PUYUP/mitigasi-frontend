import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WildfireCurrentlyDetailComponent } from './wildfire-currently-detail.component';

describe('WildfireCurrentlyDetailComponent', () => {
  let component: WildfireCurrentlyDetailComponent;
  let fixture: ComponentFixture<WildfireCurrentlyDetailComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [WildfireCurrentlyDetailComponent],
        imports: [IonicModule.forRoot()],
      }).compileComponents();

      fixture = TestBed.createComponent(WildfireCurrentlyDetailComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
