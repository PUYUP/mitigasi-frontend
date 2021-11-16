import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-donate-history',
  templateUrl: './donate-history.component.html',
  styleUrls: ['./donate-history.component.scss'],
})
export class DonateHistoryComponent implements OnInit {
  histories: any = [];

  constructor() {}

  ngOnInit() {
    for (let i = 1; i < 25; i++) {
      let d = {
        id: i,
        amount: Math.floor(Math.random() * 100000) + i,
        used: true,
      };

      this.histories.push(d);
    }
  }
}
