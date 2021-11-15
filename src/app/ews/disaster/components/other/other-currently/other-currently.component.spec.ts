import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OtherCurrentlyComponent } from './other-currently.component';

describe('OtherCurrentlyComponent', () => {
  let component: OtherCurrentlyComponent;
  let fixture: ComponentFixture<OtherCurrentlyComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [OtherCurrentlyComponent],
        imports: [IonicModule.forRoot()],
      }).compileComponents();

      fixture = TestBed.createComponent(OtherCurrentlyComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
