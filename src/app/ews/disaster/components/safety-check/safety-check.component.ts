import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-safety-check',
  templateUrl: './safety-check.component.html',
  styleUrls: ['./safety-check.component.scss'],
})
export class SafetyCheckComponent implements OnInit {
  allowAutoGrow: boolean = false;
  needhelp: string;
  formGroup: FormGroup;

  constructor(private modalCtrl: ModalController, private fb: FormBuilder) {}

  ionViewDidEnter() {
    this.allowAutoGrow = true;
  }

  ngOnInit() {
    if (!window.history.state.modal) {
      const modalState = { modal: true };
      history.pushState(modalState, null);
    }

    this.buildForm();
  }

  buildForm() {
    this.formGroup = this.fb.group({
      necessary: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(255),
        ],
      ],
    });
  }

  onSubmit() {
    console.log(this.formGroup.value);
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
