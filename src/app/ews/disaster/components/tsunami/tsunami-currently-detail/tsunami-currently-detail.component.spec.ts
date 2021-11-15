import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TsunamiCurrentlyDetailComponent } from './tsunami-currently-detail.component';

describe('TsunamiCurrentlyDetailComponent', () => {
  let component: TsunamiCurrentlyDetailComponent;
  let fixture: ComponentFixture<TsunamiCurrentlyDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TsunamiCurrentlyDetailComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TsunamiCurrentlyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
