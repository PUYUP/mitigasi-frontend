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
  selector: 'app-hazard-detail-map',
  templateUrl: './hazard-detail-map.component.html',
  styleUrls: ['./hazard-detail-map.component.scss'],
})
export class HazardDetailMapComponent implements OnInit {
  @ViewChild('mapEl') mapEl: ElementRef;
  @Input('item') item: any;

  private map;
  marker: any;

  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      this.initMap(this.item);
    }, 100);
  }

  getItemLatLng(item: any) {
    let latitude: any = null;
    let longitude: any = null;

    // earthquake epicentrum
    if (item?.classify == '105') {
      latitude = item?.disaster?.latitude;
      longitude = item?.disaster?.longitude;
    } else {
      if (item?.locations?.length > 0) {
        latitude = item?.locations[0].latitude;
        longitude = item?.locations[0].longitude;
      }
    }

    return {
      latitude: latitude,
      longitude: longitude,
    };
  }

  reloadMap(item: any) {
    this.item = item;

    let latitude = this.getItemLatLng(item).latitude;
    let longitude = this.getItemLatLng(item).longitude;

    if (latitude && longitude) {
      let newLatLng = new L.LatLng(latitude, longitude);

      this.map.flyTo(newLatLng);
      this.marker.setLatLng(newLatLng);
    }
  }

  private initMap(item: any): void {
    let latitude = this.getItemLatLng(item).latitude;
    let longitude = this.getItemLatLng(item).longitude;

    if (latitude && longitude) {
      this.map = L.map(this.mapEl.nativeElement, {
        center: [latitude, longitude],
        zoom: item?.classify == '105' ? 5 : 6,
        dragging: false,
        scrollWheelZoom: false,
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
      this.marker = L.marker([latitude, longitude])
        .bindPopup(item.incident)
        .addTo(this.map);
    }
  }
}
