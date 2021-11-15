import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-donate-amount',
  templateUrl: './donate-amount.component.html',
  styleUrls: ['./donate-amount.component.scss'],
})
export class DonateAmountComponent implements OnInit {
  otherAmount: number;
  amounts: any = [
    { id: 1, amount: 10000 },
    { id: 1, amount: 20000 },
    { id: 1, amount: 50000 },
    { id: 1, amount: 100000 },
  ];

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  close() {
    this.modalCtrl.dismiss();
  }
}
