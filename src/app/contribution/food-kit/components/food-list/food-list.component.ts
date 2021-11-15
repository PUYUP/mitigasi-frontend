import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.scss'],
})
export class FoodListComponent implements OnInit {
  foods: any = [];
  foodsSelected: any = [];

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    for (let i = 0; i < 25; i++) {
      this.foods.push({
        id: i + 1,
        label: 'Barang alfaf daa g asg fasf sfs fasgasg' + (i + 1),
        metric: 'Kilogram',
        amount: 0,
        selected: false,
      });
    }
  }

  onSelect(item: any) {
    this.foods = this.foods.map((d: any) => {
      if (d.id == item.id) {
        d = { ...d, selected: true, amount: 1 };
      }
      return d;
    });

    this.foodsSelected = this.foods.filter((d: any) => {
      return d.amount > 0;
    });
  }

  onAmountChange(value: any, item: any) {
    if (!value || value <= 0) {
      this.foods = this.foods.map((d: any) => {
        if (d.id == item.id) {
          d = { ...d, selected: false, amount: 0 };
        }
        return d;
      });

      this.foodsSelected = this.foodsSelected.filter((d: any) => {
        return d.amount > 0;
      });
    }
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
