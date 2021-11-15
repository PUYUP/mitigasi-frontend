import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import {
  IonicModule,
  IonicRouteStrategy,
  IonRouterOutlet,
  NavController,
} from '@ionic/angular';
import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DatePipe, DecimalPipe, registerLocaleData } from '@angular/common';
import { AppEffects } from './store/effects';
import { AppReducers } from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { Camera } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import {
  FileTransfer,
  FileTransferObject,
} from '@ionic-native/file-transfer/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { HTTPInterceptor } from './core/http-interceptor';

import localeId from '@angular/common/locales/id';
import { metaReducers } from './person/store';
import { NativeHttpInterceptor } from './core/native-http.interceptor';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { HttpCancelService } from './core/httpcancel.service';
import { ManageHttpInterceptor } from './core/managehttp.interceptor';
registerLocaleData(localeId, 'id');

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot({ mode: 'md' }),
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(AppReducers, { metaReducers }),
    EffectsModule.forRoot(AppEffects),
  ],
  providers: [
    NavController,
    DecimalPipe,
    DatePipe,
    AndroidPermissions,
    Geolocation,
    LocationAccuracy,
    NativeGeocoder,
    CookieService,
    HTTP,
    Camera,
    FileTransfer,
    FileTransferObject,
    File,
    FileChooser,
    FilePath,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: LOCALE_ID, useValue: 'id-ID' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NativeHttpInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HTTPInterceptor,
      multi: true,
    },
    HttpCancelService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ManageHttpInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
