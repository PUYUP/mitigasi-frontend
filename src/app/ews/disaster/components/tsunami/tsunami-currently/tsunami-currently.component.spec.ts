import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TsunamiCurrentlyComponent } from './tsunami-currently.component';

describe('TsunamiCurrentlyComponent', () => {
  let component: TsunamiCurrentlyComponent;
  let fixture: ComponentFixture<TsunamiCurrentlyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TsunamiCurrentlyComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TsunamiCurrentlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
