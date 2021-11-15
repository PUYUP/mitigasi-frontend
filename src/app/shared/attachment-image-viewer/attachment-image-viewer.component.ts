import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonicSwiper, ModalController } from '@ionic/angular';
import SwiperCore, { Manipulation, SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';

SwiperCore.use([IonicSwiper, Manipulation]);

@Component({
  selector: 'app-attachment-image-viewer',
  templateUrl: './attachment-image-viewer.component.html',
  styleUrls: ['./attachment-image-viewer.component.scss'],
})
export class AttachmentImageViewerComponent implements OnInit {
  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;

  @Input('attachments') attachments: any = [];

  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 0,
    speed: 100,
    enabled: true,
    navigation: false,
    pagination: false,
    scrollbar: false,
    autoplay: false,
    zoom: true,
  };

  constructor(public modalCtrl: ModalController) {}

  ngOnInit() {
    //console.log(this.attachments);
  }

  ionViewDidEnter() {
    //console.log(this.swiper.swiperRef);
  }

  onSwiper(swiper: any) {
    //console.log(swiper.appendSlide('<div>aad</div>'));
    //swiper.update();
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
