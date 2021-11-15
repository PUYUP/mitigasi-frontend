import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SafetyCheckEditorComponent } from './safetycheck-editor.component';

describe('SafetyCheckEditorComponent', () => {
  let component: SafetyCheckEditorComponent;
  let fixture: ComponentFixture<SafetyCheckEditorComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SafetyCheckEditorComponent],
        imports: [IonicModule.forRoot()],
      }).compileComponents();

      fixture = TestBed.createComponent(SafetyCheckEditorComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
