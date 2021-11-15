import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FloodCurrentlyDetailComponent } from './flood-currently-detail.component';

describe('FloodCurrentlyDetailComponent', () => {
  let component: FloodCurrentlyDetailComponent;
  let fixture: ComponentFixture<FloodCurrentlyDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FloodCurrentlyDetailComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FloodCurrentlyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
