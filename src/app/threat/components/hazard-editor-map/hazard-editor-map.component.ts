import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import {
  NativeGeocoder,
  NativeGeocoderOptions,
  NativeGeocoderResult,
} from '@ionic-native/native-geocoder/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import * as L from 'leaflet';
import { Platform } from '@ionic/angular';

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
  selector: 'app-hazard-editor-map',
  templateUrl: './hazard-editor-map.component.html',
  styleUrls: ['./hazard-editor-map.component.scss'],
})
export class HazardEditorMapComponent implements OnInit {
  @Input('locations') locations: any;

  @Output('enableSwiperEvent')
  enableSwiperEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output('geocoderResultEvent')
  geocoderResultEvent: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('mapEl')
  mapEl: ElementRef;

  private map: any;
  private marker: any;

  locationCoords: any;
  geocoderResult: any;
  inputLatitude: any;
  inputLongitude: any;
  isApp: boolean = false;

  constructor(
    private androidPermissions: AndroidPermissions,
    private geolocation: Geolocation,
    private locationAccuracy: LocationAccuracy,
    private nativeGeocoder: NativeGeocoder,
    private platform: Platform
  ) {
    this.locationCoords = {
      latitude: '',
      longitude: '',
      accuracy: '',
      timestamp: '',
    };
  }

  ngOnInit() {
    this.isApp = this.platform.is('cordova');

    if (this.locations && this.locations?.length > 0) {
      this.locationCoords = {
        ...this.locations[0],
      };

      this.setLatLngInput(
        this.locationCoords?.latitude,
        this.locationCoords?.longitude
      );
    }
  }

  /**
   * Contruct the leaflet map
   */
  triggerMap() {
    setTimeout(() => {
      this.initMap();
    }, 100);
  }

  private initMap(): void {
    if (!this.map) {
      this.map = L.map(this.mapEl.nativeElement, {
        center: [this.locationCoords.latitude, this.locationCoords.longitude],
        zoom: 2,
      });

      const tiles = L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          maxZoom: 18,
          minZoom: 1,
          attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }
      );

      // draw map
      tiles.addTo(this.map);

      // draw marker
      this.marker = L.marker([
        this.locationCoords.latitude,
        this.locationCoords.longitude,
      ]).addTo(this.map);

      this.map.on('drag zoom', (e: any) => {
        this.marker.setLatLng(e.target.getCenter());
        this.enableSwiperEvent.emit(false);
      });

      this.map.on('dragend zoomend', (e: any) => {
        let lat = e.target.getCenter().lat;
        let lng = e.target.getCenter().lng;

        this.geocoderResultEvent.emit({
          latitude: lat,
          longitude: lng,
        });

        this.setLatLngInput(lat, lng);
      });
    }
  }

  setLatLngInput(lat, lng) {
    let latitude = Math.round(lat * 1000000) / 1000000;
    let longitude = Math.round(lng * 1000000) / 1000000;

    this.inputLatitude = latitude;
    this.inputLongitude = longitude;
  }

  reloadMapMarker() {
    if (this.inputLatitude && this.inputLongitude) {
      let newLatLng = new L.LatLng(this.inputLatitude, this.inputLongitude);

      this.map.flyTo(newLatLng);
      this.marker.setLatLng(newLatLng);
    }
  }

  /**
   * LOCATION REQUEST
   */
  initGeo() {
    if (this.isApp) {
      this.checkGPSPermission();
    } else {
      this.startGeo();
    }
  }

  // Check if application having GPS access permission
  checkGPSPermission() {
    this.androidPermissions
      .checkPermission(
        this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION
      )
      .then(
        (result) => {
          if (result.hasPermission) {
            //If having permission show 'Turn On GPS' dialogue
            this.askToTurnOnGPS();
          } else {
            //If not having permission ask for permission
            this.requestGPSPermission();
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }

  requestGPSPermission() {
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if (canRequest) {
        console.log('4');
      } else {
        //Show 'GPS Permission Request' dialogue
        this.androidPermissions
          .requestPermission(
            this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION
          )
          .then(
            () => {
              // call method to turn on GPS
              this.askToTurnOnGPS();
            },
            (error) => {
              //Show alert if user click on 'No Thanks'
              //alert(
              //  'requestPermission Error requesting location permissions ' +
              //    error
              //);
              console.log(error);
            }
          );
      }
    });
  }

  askToTurnOnGPS() {
    this.locationAccuracy
      .request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY)
      .then(
        () => {
          // When GPS Turned ON call method to get Accurate location coordinates
          this.getLocationCoordinates();
        },
        (error) => {
          //alert(
          //  'Error requesting location permissions ' + JSON.stringify(error)
          //)

          console.log(error);
        }
      );
  }

  // Methos to get device accurate coordinates using device GPS
  getLocationCoordinates() {
    this.geolocation
      .getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      })
      .then((resp) => {
        this.locationCoords.latitude = resp.coords.latitude;
        this.locationCoords.longitude = resp.coords.longitude;
        this.locationCoords.accuracy = resp.coords.accuracy;
        this.locationCoords.timestamp = resp.timestamp;

        let options: NativeGeocoderOptions = {
          useLocale: true,
          maxResults: 5,
        };

        this.nativeGeocoder
          .reverseGeocode(
            this.locationCoords.latitude,
            this.locationCoords.longitude,
            options
          )
          .then((result: NativeGeocoderResult[]) => {
            this.geocoderResult = result[0];
            this.geocoderResultEvent.emit({ ...this.geocoderResult });
            this.setLatLngInput(
              this.geocoderResult.latitude,
              this.geocoderResult.longitude
            );
            this.reloadMapMarker();
          })
          .catch((error: any) => console.log(error));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // HTML5 LOCATION
  startGeo() {
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    navigator.geolocation.getCurrentPosition(
      (position) => this.geoSuccess(position),
      (error) => this.geoError(error),
      options
    );
  }

  geoSuccess(pos: any) {
    var crd = pos.coords;

    this.locationCoords.latitude = crd.latitude;
    this.locationCoords.longitude = crd.longitude;
    this.locationCoords.accuracy = crd.accuracy;
    this.locationCoords.timestamp = new Date();

    this.geocoderResultEvent.emit(this.locationCoords);
    this.setLatLngInput(crd.latitude, crd.longitude);
    this.reloadMapMarker();
  }

  geoError(err: any) {
    console.log(`ERROR(${err.code}): ${err.message}`);
  }
}
