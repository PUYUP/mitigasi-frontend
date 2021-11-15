import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WildfireCurrentlyComponent } from './wildfire-currently.component';

describe('WildfireCurrentlyComponent', () => {
  let component: WildfireCurrentlyComponent;
  let fixture: ComponentFixture<WildfireCurrentlyComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [WildfireCurrentlyComponent],
        imports: [IonicModule.forRoot()],
      }).compileComponents();

      fixture = TestBed.createComponent(WildfireCurrentlyComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
