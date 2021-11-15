import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import {
  ActionSheetController,
  IonicSwiper,
  LoadingController,
  ModalController,
  Platform,
  ToastController,
} from '@ionic/angular';
import { ActionsSubject, Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';

import * as momentjs from 'moment';

// import Swiper core and required modules
import SwiperCore, { SwiperOptions } from 'swiper';
SwiperCore.use([IonicSwiper]);

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import {
  FileTransfer,
  FileTransferObject,
  FileUploadOptions,
} from '@ionic-native/file-transfer/ngx';
import { Endpoints } from 'src/app/core/endpoints';
import { UserService } from 'src/app/person/services/user/user.service';
import { HazardEditorMapComponent } from 'src/app/threat/components/hazard-editor-map/hazard-editor-map.component';
import {
  createSafetyCheck,
  updateSafetyCheck,
} from '../../store/actions/safetycheck/safetycheck.actions';
import { FileItem, FileUploader } from 'ng2-file-upload';
import {
  FileChooser,
  FileChooserOptions,
} from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { skip } from 'rxjs/operators';

@Component({
  selector: 'app-safetycheck-editor',
  templateUrl: './safetycheck-editor.component.html',
  styleUrls: ['./safetycheck-editor.component.scss'],
})
export class SafetyCheckEditorComponent implements OnInit {
  @Input('hazard_uuid') hazard_uuid: any;
  @Input('item') item: any;
  @Input('condition') condition: any;

  @ViewChild(HazardEditorMapComponent) map: HazardEditorMapComponent;
  @ViewChild('documentEditForm') documentEditForm: FormGroupDirective;

  private swiper: any;
  formGroup: FormGroup;

  uploader: FileUploader;
  isApp: boolean = false;

  segmentSelected = '0';
  dateNow: any;
  geocoderResult: any;
  locationObj: any;
  locations: FormArray;
  attachments: any = [];
  pictures: any = [];
  currentLocations: any = [];
  isUploading: boolean = false;
  isLoading: boolean = false;
  progress: number = 0;

  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 0,
    speed: 100,
    enabled: true,
    navigation: false,
    pagination: false,
    scrollbar: false,
    autoplay: false,
  };

  constructor(
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private toastController: ToastController,
    private fb: FormBuilder,
    private store: Store<AppState>,
    private changeDetectorRef: ChangeDetectorRef,
    private camera: Camera,
    private transfer: FileTransfer,
    private userService: UserService,
    private platform: Platform,
    private actionSheetCtrl: ActionSheetController,
    private fileChooser: FileChooser,
    private filePath: FilePath,
    private androidPermissions: AndroidPermissions,
    private actionListener$: ActionsSubject
  ) {
    this.uploader = new FileUploader({
      autoUpload: true,
      url: Endpoints.attachment,
      authToken: 'Bearer ' + this.userService.token?.access,
    });

    this.uploader.onAfterAddingFile = (fileItem: any) => {
      this.isUploading = true;
      this.uploader.uploadAll();
    };

    this.uploader.onProgressItem = (fileItem: FileItem, progress: any) => {
      this.progress = progress;
    };

    this.uploader.onSuccessItem = (fileItem: any, response) => {
      this.progress = 0;
      this.isUploading = false;

      let responseJSON = JSON.parse(response);

      this.attachments.push(responseJSON.uuid);
      this.pictures.push({
        uuid: responseJSON?.uuid,
        uri: responseJSON?.file,
      });
    };
  }

  /**
   * Something like toast, loading, modal init here
   */
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

  close() {
    this.modalCtrl.dismiss({
      dismissed: true,
    });
  }

  ngOnInit() {
    this.isApp = this.platform.is('cordova');
    this.dateNow = momentjs.utc().format();

    if (!window.history.state.modal) {
      const modalState = { modal: true };
      history.pushState(modalState, null);
    }

    this.buildForm();

    if (this.condition == 'safe') {
      this.segmentSelected = '2';
    }

    this.actionListener$
      .pipe(
        skip(1) // optional: skips initial logging done by ngrx
      )
      .subscribe((action) => {
        if (
          action.type == '[SafetyCheck] Create SafetyCheck Success' ||
          action.type == '[SafetyCheck] Update SafetyCheck Success' ||
          action.type == '[SafetyCheck] Create SafetyCheck Failure'
        ) {
          this.isLoading = false;
        }
      });
  }

  /**
   * Start swiper
   */
  async setSwiperInstance(ev: any) {
    this.swiper = await ev;

    if (this.condition == 'safe') {
      this.swiper.activeIndex = 2;
      this.swiper.allowTouchMove = false;
      this.map.triggerMap();
    }
  }

  /**
   * On swiper slide change
   */
  async onSlideChange(swiper: any) {
    this.segmentSelected = await this.swiper.activeIndex;

    if (this.segmentSelected == '2') {
      this.swiper.allowTouchMove = false;
      this.map.triggerMap();
    } else {
      this.swiper.allowTouchMove = true;
    }

    this.changeDetectorRef.detectChanges();
  }

  async _presentSelectSource() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Ambil dari',
      buttons: [
        {
          text: 'Kamera',
          icon: 'camera-outline',
          handler: () => {
            this.takePicture();
          },
        },
        {
          text: 'File Manager',
          icon: 'folder-outline',
          handler: () => {
            this.chooseFile();
          },
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  /**
   * Event from map-editor
   */
  enableSwiperEmit(event: any) {
    this.swiper.allowTouchMove = event;
  }

  geocoderResultEmit(event: any) {
    this.geocoderResult = event;

    this.locationObj = {
      country: this.geocoderResult?.countryName,
      country_code: this.geocoderResult?.countryCode,
      administrative_area: this.geocoderResult?.administrativeArea,
      sub_administrative_area: this.geocoderResult?.subAdministrativeArea,
      locality: this.geocoderResult?.locality,
      sub_locality: this.geocoderResult?.subLocality,
      thoroughfare: this.geocoderResult?.thoroughfare,
      sub_thoroughfare: this.geocoderResult?.subThoroughfare,
      areas_of_interest: this.geocoderResult?.areasOfInterest?.join(';'),
      postal_code: this.geocoderResult?.postalCode,
      latitude: this.geocoderResult?.latitude,
      longitude: this.geocoderResult?.longitude,
    };

    this.addLocation(this.locationObj);
  }

  /**
   * Sgement start here
   */
  segmentChanged(event: any) {
    this.segmentSelected = event.detail.value;
    this.swiper.slideTo(+event.detail.value);
  }

  /**
   * Form and submitter
   */
  // Location
  get locationsArray(): FormArray {
    return this.formGroup.get('locations') as FormArray;
  }

  createLocation(locationObj: any): FormGroup {
    return this.fb.group({ ...locationObj });
  }

  addLocation(locationObj: any): void {
    // always reset locations
    if (this.locationsArray.value?.length > 0) {
      this.locationsArray.clear();
    }

    this.locationsArray.push(this.createLocation(locationObj));
  }

  buildForm() {
    let situationValidators =
      this.condition == 'affected'
        ? [Validators.required, Validators.minLength(5)]
        : [];

    this.formGroup = this.fb.group({
      situation: ['', situationValidators],
      locations: this.fb.array([], [Validators.required]),
      attachments: [''],
    });

    // set value
    if (this.item && this.item?.uuid) {
      this.currentLocations = this.item.locations;
      this.attachments = this.item.attachments.map((d: any) => d.uuid);
      this.pictures = this.item.attachments.map((d: any) => {
        d = {
          ...d,
          uri: d.file,
        };

        return d;
      });

      this.formGroup.patchValue({
        situation: this.item.situation,
        attachments: this.attachments,
      });

      for (let loc of this.currentLocations) {
        this.locationsArray.push(this.createLocation(loc));
      }
    }
  }

  removeAttachment(picture: any) {
    this.pictures = this.pictures.filter((d: any) => d.uuid != picture.uuid);
    this.attachments = this.attachments.filter((d: any) => d != picture.uuid);
  }

  onSubmit() {
    this.isLoading = true;

    let data = {
      ...this.formGroup.value,
      attachments: this.attachments,
      content_type: 'hazard',
      object_id: this.hazard_uuid,
      condition: this.condition,
    };

    if (this.item && this.item?.uuid) {
      this.store.dispatch(
        updateSafetyCheck({ uuid: this.item.uuid, data: data })
      );
    } else {
      this.store.dispatch(createSafetyCheck({ data: data }));
    }
  }

  /**
   * Start Camera
   */
  takePicture() {
    let options: CameraOptions = {
      quality: 20,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      allowEdit: false,
    };

    this.camera.getPicture(options).then(
      (imageData) => {
        let pic = {
          file: imageData,
          uri: (<any>window).Ionic.WebView.convertFileSrc(imageData),
        };

        // this.pictures.push(pic);
        this.upload(pic);
      },
      (err) => {
        // Handle error
      }
    );
  }

  /**
   * Upload picture
   */
  upload(pic: any) {
    const fileTransfer: FileTransferObject = this.transfer.create();

    this.isUploading = true;
    let url = Endpoints.attachment;
    let f = pic['file'];

    if (f) {
      let fileName = f.substr(f.lastIndexOf('/') + 1);

      // prettier-ignore
      let options: FileUploadOptions = {
        fileKey: 'file',
        fileName: fileName,
        mimeType: 'image/jpeg',
        chunkedMode: false,
        params: {},
        headers: {
          'Authorization': `Bearer ${this.userService.token?.access}`,
          'Content-Disposition': 'filename=' + fileName,
        },
      };

      fileTransfer.upload(f, url, options).then(
        (data) => {
          this.isUploading = false;
          let response = JSON.parse(data.response);

          this.attachments.push(response?.uuid);
          this.pictures.push({
            uuid: response?.uuid,
            uri: response?.file,
          });

          this.changeDetectorRef.detectChanges();
        },
        (err) => {
          // error
          console.log(err);
          this.isUploading = false;
        }
      );

      fileTransfer.onProgress((progressEvent) => {
        if (progressEvent.lengthComputable) {
          var perc = Math.floor(
            (progressEvent.loaded / progressEvent.total) * 100
          );
          this.progress = perc;
        }
      });
    }
  }

  chooseFile() {
    let options: FileChooserOptions = {
      mime: 'image/jpeg',
    };

    this.fileChooser
      .open(options)
      .then((uri) => {
        this.filePath
          .resolveNativePath(uri)
          .then((path) => {
            this.isUploading = true;
            this.changeDetectorRef.detectChanges();

            let pic = {
              file: path,
              uri: (<any>window).Ionic.WebView.convertFileSrc(path),
            };

            this.androidPermissions
              .checkPermission(
                this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE
              )
              .then(
                (result) => {
                  if (result.hasPermission) {
                    // code
                    // this.pictures.push(pic);
                    this.upload(pic);
                  } else {
                    this.androidPermissions
                      .requestPermission(
                        this.androidPermissions.PERMISSION
                          .WRITE_EXTERNAL_STORAGE
                      )
                      .then((result) => {
                        if (result.hasPermission) {
                          // code
                          // this.pictures.push(pic);
                          this.upload(pic);
                        }
                      });
                  }
                },
                (err) =>
                  this.androidPermissions.requestPermission(
                    this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE
                  )
              );
          })
          .catch((err) => console.log(err));
      })
      .catch((e) => console.log(e));
  }

  selectSource() {
    this._presentSelectSource();
  }

  ngOnDestroy() {
    this.changeDetectorRef.detach();
  }
}
