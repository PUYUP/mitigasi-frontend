import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { AppState } from 'src/app/store/reducers';
import * as L from 'leaflet';
import 'leaflet.heat/dist/leaflet-heat.js';

import { takeUntil } from 'rxjs/operators';
import { LoadingController, ModalController } from '@ionic/angular';
import { selectSafetyCheckMaps } from '../../store/selectors/safetycheck-map/safetycheck-map.selectors';
import { loadSafetyCheckMaps } from '../../store/actions/safetycheck-map/safetycheck-map.actions';

let iconRetinaUrl = 'assets/map/marker-icon-2x.png';
const iconUrl = 'assets/map/marker-icon.png';

const shadowUrl = 'assets/map/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = iconDefault;

const greenIcon = L.icon({
  iconRetinaUrl: 'assets/map/marker-icon-2x-green.png',
  iconUrl: 'assets/map/marker-icon-green.png',
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

const redIcon = L.icon({
  iconRetinaUrl: 'assets/map/marker-icon-2x-red.png',
  iconUrl: 'assets/map/marker-icon-red.png',
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

@Component({
  selector: 'app-safetycheck-list-map',
  templateUrl: './safetycheck-list-map.component.html',
  styleUrls: ['./safetycheck-list-map.component.scss'],
})
export class SafetyCheckListMapComponent implements OnInit {
  @ViewChild('safetyCheckMapEl') safetyCheckMapEl: ElementRef;

  @Input('content_type') content_type: string;
  @Input('object_id') object_id: string;

  private map;
  marker: any;
  markers: any = [];
  coords: any = [];
  condition: string = '';

  coordinate$: Observable<any>;
  onDestroy$ = new Subject<void>();

  event: any;
  next: string;

  constructor(
    private store: Store<AppState>,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController
  ) {
    this.coordinate$ = this.store.pipe(select(selectSafetyCheckMaps));
    this.coordinate$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(async (state: any) => {
        if (state?.status == 'loaded') {
          if (this.markers?.length > 0) {
            for (let index in this.markers) {
              this.map.removeLayer(this.markers[index]);
            }
          }

          for (let index in state?.data?.list) {
            let loc = state?.data?.list[index];
            let latitude = loc?.latitude;
            let longitude = loc?.longitude;
            let situation = loc?.situation;
            let condition = loc?.condition;
            let activity_author = loc?.activity_author;
            let icon = condition == 'affected' ? redIcon : greenIcon;

            if (latitude && longitude) {
              this.coords.push([latitude.toFixed(1), longitude.toFixed(1)]);

              let marker = L.marker([latitude, longitude], { icon: icon })
                .bindPopup(activity_author + ': ' + situation)
                .addTo(this.map);

              this.markers.push(marker);
            }
          }

          let heat = L.heatLayer(state?.data?.intensity, {
            radius: 15,
          }).addTo(this.map);
        }
      });
  }

  async _presentLoading() {
    const loading = await this.loadingCtrl.create({
      backdropDismiss: false,
      message: 'Memuat data...',
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  ngOnInit() {
    setTimeout(() => {
      this.store.dispatch(
        loadSafetyCheckMaps({
          condition: this.condition,
          content_type: this.content_type,
          object_id: this.object_id,
        })
      );
    }, 200);

    setTimeout(() => {
      this.initMap();
    }, 100);
  }

  onRefresh(event: any, condition: any = null) {
    this.event = event;
    this.condition = condition;

    this.store.dispatch(
      loadSafetyCheckMaps({
        condition: this.condition,
        content_type: this.content_type,
        object_id: this.object_id,
      })
    );
  }

  private initMap(): void {
    this.map = L.map(this.safetyCheckMapEl.nativeElement, {
      center: [-2.548926, 118.0148634],
      zoom: 3,
    });

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );

    // draw map
    tiles.addTo(this.map);
  }

  onConditionChange(event: any) {
    this.condition = event.detail.value;

    this.store.dispatch(
      loadSafetyCheckMaps({
        condition: this.condition,
        content_type: this.content_type,
        object_id: this.object_id,
      })
    );
  }

  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true,
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
