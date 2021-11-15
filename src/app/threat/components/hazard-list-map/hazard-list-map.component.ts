import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { AppState } from 'src/app/store/reducers';
import { loadHazardMaps } from '../../store/actions/hazard-map/hazard-map.actions';
import { selectHazardMaps } from '../../store/selectors/hazard-map/hazard-map.selectors';
import * as L from 'leaflet';
import { takeUntil } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';

const iconRetinaUrl = 'assets/map/marker-icon-2x.png';
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

@Component({
  selector: 'app-hazard-list-map',
  templateUrl: './hazard-list-map.component.html',
  styleUrls: ['./hazard-list-map.component.scss'],
})
export class HazardListMapComponent implements OnInit {
  @ViewChild('mapEl') mapEl: ElementRef;
  @Input('classify') classify: string;

  private map;
  marker: any;
  markers: any = [];
  coords: any = [];

  coordinate$: Observable<any>;
  onDestroy$ = new Subject<void>();

  event: any;
  next: string;

  constructor(
    private store: Store<AppState>,
    public loadingCtrl: LoadingController
  ) {
    this.coordinate$ = this.store.pipe(select(selectHazardMaps));
    this.coordinate$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(async (state: any) => {
        if (state?.status == 'loading') {
          this._presentLoading();
        } else {
          if (await this.loadingCtrl.getTop()) await this.loadingCtrl.dismiss();
        }

        if (state?.status == 'loaded') {
          if (this.markers?.length > 0) {
            for (let index in this.markers) {
              this.map.removeLayer(this.markers[index]);
            }
          }

          for (let index in state?.data) {
            let loc = state?.data[index];
            let latitude = loc?.latitude;
            let longitude = loc?.longitude;
            let incident = loc?.incident;

            if (latitude && longitude) {
              this.coords.push([latitude, longitude]);

              let marker = L.marker([latitude, longitude])
                .bindPopup(incident)
                .addTo(this.map);

              this.markers.push(marker);
            }
          }
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
    this.store.dispatch(loadHazardMaps({ classify: this.classify }));

    setTimeout(() => {
      this.initMap();
    }, 100);
  }

  onRefresh(event: any, classify: any = null) {
    this.event = event;
    this.classify = classify;

    this.store.dispatch(loadHazardMaps({ classify: this.classify }));
  }

  private initMap(): void {
    this.map = L.map(this.mapEl.nativeElement, {
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

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
