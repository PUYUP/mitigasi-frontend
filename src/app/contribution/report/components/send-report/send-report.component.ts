import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, Platform, ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import {
  NativeGeocoder,
  NativeGeocoderResult,
  NativeGeocoderOptions,
} from '@ionic-native/native-geocoder/ngx';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';
import {
  createReport,
  updateReport,
} from 'src/app/contribution/store/actions/report/report.actions';

import * as momentjs from 'moment';

@Component({
  selector: 'app-send-report',
  templateUrl: './send-report.component.html',
  styleUrls: ['./send-report.component.scss'],
})
export class SendReportComponent implements OnInit {
  @Input('item') item;
  @Input('identifier_id') identifier_id;
  @Input('identifier_label') identifier_label;

  allowAutoGrow: boolean = false;
  formGroup: FormGroup;

  locationCoords: any;
  geocoderResult: any;
  isApp: boolean = false;
  segment_selected: string = 'basic';

  constructor(
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private toastController: ToastController,
    private fb: FormBuilder,
    private androidPermissions: AndroidPermissions,
    private geolocation: Geolocation,
    private locationAccuracy: LocationAccuracy,
    private nativeGeocoder: NativeGeocoder,
    private store: Store<AppState>,
    private platform: Platform
  ) {
    this.locationCoords = {
      latitude: '',
      longitude: '',
      accuracy: '',
      timestamp: '',
    };
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
    });
    toast.present();
  }

  async presentLoading(message: string) {
    const loading = await this.loadingCtrl.create({
      message: message,
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.allowAutoGrow = true;
    }, 2000);
  }

  ngOnInit() {
    this.isApp = this.platform.is('cordova');

    if (!window.history.state.modal) {
      const modalState = { modal: true };
      history.pushState(modalState, null);
    }

    this.buildForm();

    if (this.isApp) {
      this.checkGPSPermission();
    } else {
      this.startGeo();
    }
  }

  buildForm() {
    this.formGroup = this.fb.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(255),
        ],
      ],
      description: [''],
      reason: [''],
      necessary: [''],
      chronology: [''],
    });

    // set value
    if (this.item) {
      this.formGroup.patchValue({
        title: this.item.title,
        description: this.item.description,
        reason: this.item.reason,
        necessary: this.item.necessary,
        chronology: this.item.chronology,
      });
    }
  }

  onSubmit() {
    const locationData = {
      country: this.geocoderResult?.countryName,
      country_code: this.geocoderResult?.countryCode,
      administrative_area: this.geocoderResult?.administrativeArea,
      sub_administrative_area: this.geocoderResult?.subAdministrativeArea,
      locality: this.geocoderResult?.locality,
      sub_locality: this.geocoderResult?.subLocality,
      thoroughfare: this.geocoderResult?.thoroughfare,
      sub_thoroughfare: this.geocoderResult?.subThoroughfare,
      areas_of_interest: this.geocoderResult?.areasOfInterest.join(';'),
      postal_code: this.geocoderResult?.postalCode,
      latitude: this.locationCoords.latitude,
      longitude: this.locationCoords.longitude,
    };

    let data = {
      ...this.formGroup.value,
      occur_at: momentjs(Date.now()).format('YYYY-MM-DD HH:mm'),
      location: locationData,
      identifier: this.identifier_id,
    };

    if (this.item) {
      this.store.dispatch(updateReport({ uuid: this.item.uuid, data: data }));
    } else {
      this.store.dispatch(createReport({ data: data }));
    }

    this.close();
  }

  close() {
    this.modalCtrl.dismiss();
  }

  segmentChanged(event: any) {
    this.segment_selected = event.detail.value;
  }

  segmentNext(value: string) {
    this.segment_selected = value;
  }

  /**
   * LOCATION REQUEST
   */
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
          this.close();
          this.presentToast('Lokasi (GPS) harus aktif.');
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
              this.close();
              this.presentToast('Memerlukan akses ke lokasi (GPS) ponsel.');
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
          this.close();
          this.presentToast('Memerlukan akses ke lokasi (GPS) ponsel.');
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
          })
          .catch((error: any) => console.log(error));
      })
      .catch((error) => {
        //alert('Error getting location' + error);
        this.close();
        this.presentToast('Memerlukan akses ke lokasi (GPS) ponsel.');
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
  }

  geoError(err: any) {
    this.close();
    this.presentToast(`ERROR(${err.code}): ${err.message}`);
  }
}
