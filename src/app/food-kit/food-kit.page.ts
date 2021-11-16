import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FoodListComponent } from './components/food-list/food-list.component';

@Component({
  selector: 'app-food-kit',
  templateUrl: './food-kit.page.html',
  styleUrls: ['./food-kit.page.scss'],
})
export class FoodKitPage implements OnInit {
  amount: number = 50;
  foodCategories = [
    {
      id: '101',
      name: 'Beras',
      qty: '2kg',
      subtotal: 'Rp35.000',
      checked: true,
    },
    {
      id: '102',
      name: 'Gula',
      qty: '2kg',
      subtotal: 'Rp35.000',
      checked: true,
    },
    {
      id: '103',
      name: 'Kopi',
      qty: '2kg',
      subtotal: 'Rp35.000',
      checked: true,
    },
    {
      id: '104',
      name: 'Tech',
      qty: '2kg',
      subtotal: 'Rp35.000',
      checked: true,
    },
    {
      id: '105',
      name: 'Susu',
      checked: false,
    },
    {
      id: '106',
      name: 'Minyak Goreng',
      checked: false,
    },
    {
      id: '107',
      name: 'Garam',
      qty: '2kg',
      subtotal: 'Rp35.000',
      checked: true,
    },
    {
      id: '108',
      name: 'Telur',
      qty: '2kg',
      subtotal: 'Rp35.000',
      checked: true,
    },
    {
      id: '110',
      name: 'Kecap',
      qty: '2kg',
      subtotal: 'Rp35.000',
      checked: true,
    },
    {
      id: '111',
      name: 'Mi Instan',
      qty: '2kg',
      subtotal: 'Rp35.000',
      checked: true,
    },
    {
      id: '112',
      name: 'Bumbu Instan',
      checked: false,
    },
  ];

  constructor(private modalCtrl: ModalController) {}

  async showFoodList(data: any) {
    const modal = await this.modalCtrl.create({
      component: FoodListComponent,
      backdropDismiss: false,
      componentProps: { ...data },
    });

    modal.onDidDismiss().then((ret: any) => {
      if (!ret?.data) {
        // uncheck again
        this.foodCategories = this.foodCategories.map((d: any) => {
          if (d.id == data.id) {
            d = { ...d, checked: false };
          }
          return d;
        });
      }
    });

    return await modal.present();
  }

  ngOnInit() {}

  onFoodCategoryChange(value: any, data: any): void {
    if (value) {
      this.showFoodList(data);

      this.foodCategories = this.foodCategories.map((d: any) => {
        if (d.id == data.id && !data.checked) {
          d = { ...d, checked: true };
        }
        return d;
      });
    }
  }
}
