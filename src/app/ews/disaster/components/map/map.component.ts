import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as L from 'leaflet';

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
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  @ViewChild('mapEl') mapEl: ElementRef;
  @Input('item') item: any;

  private map;

  constructor() {}

  ngOnInit() {}

  ionViewDidEnter(): void {
    setTimeout(() => {
      this.initMap(this.item);
    }, 1500);
  }

  private initMap(item: any): void {
    let locations = item.locations;

    if (locations?.length > 0) {
      this.map = L.map(this.mapEl.nativeElement, {
        center: [locations[0].latitude, locations[0].longitude],
        zoom: 12,
      });

      const tiles = L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          maxZoom: 18,
          minZoom: 3,
          attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }
      );

      // draw map
      tiles.addTo(this.map);

      // draw marker
      for (let loc of locations) {
        L.marker([loc.latitude, loc.longitude])
          .bindPopup(loc.locality ? loc.locality : loc.sub_administrative_area)
          .addTo(this.map);
      }
    }
  }
}
