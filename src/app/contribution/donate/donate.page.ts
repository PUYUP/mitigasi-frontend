import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DonateAmountComponent } from './components/donate-amount/donate-amount.component';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.page.html',
  styleUrls: ['./donate.page.scss'],
})
export class DonatePage implements OnInit {
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  async showDonateAmount() {
    const modal = await this.modalCtrl.create({
      component: DonateAmountComponent,
      backdropDismiss: false,
      componentProps: {},
    });

    return modal.present();
  }

  selectDonateAmount() {
    this.showDonateAmount();
  }
}
