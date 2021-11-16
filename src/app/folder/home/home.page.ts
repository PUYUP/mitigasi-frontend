import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/person/services/user/user.service';
import { personSelectUser } from 'src/app/person/store/selectors/user/user.selectors';
import { AppState } from 'src/app/store/reducers';
import { HazardEditorComponent } from 'src/app/threat/components/hazard-editor/hazard-editor.component';
import { HazardListMapComponent } from 'src/app/threat/components/hazard-list-map/hazard-list-map.component';
import { HazardListComponent } from 'src/app/threat/components/hazard-list/hazard-list.component';
import { resetHazard } from 'src/app/threat/store/actions/hazard/hazard.actions';
import { ThreatClassify } from 'src/app/threat/threat.classify';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(HazardListComponent) hazardList: HazardListComponent;

  user$: Observable<any>;
  threatClassify: any;
  classify: string = '';

  constructor(
    private store: Store<AppState>,
    public modalCtrl: ModalController,
    private userService: UserService,
    private router: Router
  ) {
    this.user$ = this.store.pipe(select(personSelectUser));
  }

  async _showHazardEditor() {
    const dialog = await this.modalCtrl.create({
      component: HazardEditorComponent,
      backdropDismiss: false,
      componentProps: {},
    });

    await dialog.present();
  }

  async _showHazardMap() {
    const dialog = await this.modalCtrl.create({
      component: HazardListMapComponent,
      backdropDismiss: false,
      componentProps: {
        classify: this.classify,
      },
    });

    await dialog.present();
  }

  ngOnInit() {
    this.threatClassify = ThreatClassify;
  }

  showHazardEditor() {
    if (this.userService.token) {
      this._showHazardEditor();
    } else {
      this.router.navigate(['/SignIn']);
    }
  }

  showHazardMap() {
    this._showHazardMap();
  }

  doRefresh(event: any) {
    if (this.hazardList) this.hazardList.onRefresh(event, this.classify);
  }

  onClassifyChange(event: any) {
    this.classify = event.detail.value;
    if (this.hazardList) this.hazardList.onRefresh(null, this.classify);
  }
}
