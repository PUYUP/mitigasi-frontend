import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule, IonRouterOutlet } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { HazardListComponent } from 'src/app/threat/components/hazard-list/hazard-list.component';
import { HazardEditorComponent } from 'src/app/threat/components/hazard-editor/hazard-editor.component';
import { SwiperModule } from 'swiper/angular';
import { AutosizeModule } from 'ngx-autosize';
import { HazardListMapComponent } from 'src/app/threat/components/hazard-list-map/hazard-list-map.component';
import { FileUploadModule } from 'ng2-file-upload';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    HomePageRoutingModule,
    SwiperModule,
    AutosizeModule,
    FileUploadModule,
    SharedModule,
  ],
  declarations: [
    HomePage,
    HazardListComponent,
    HazardEditorComponent,
    HazardListMapComponent,
  ],
  entryComponents: [
    HazardListComponent,
    HazardEditorComponent,
    HazardListMapComponent,
  ],
  providers: [AndroidPermissions],
})
export class HomePageModule {}
