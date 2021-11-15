import { Component, HostListener } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import {
  ActionSheetController,
  AlertController,
  MenuController,
  ModalController,
  NavController,
  Platform,
  PopoverController,
} from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  getUserFromCookie,
  signoutUser,
} from './person/store/actions/user/user.actions';
import { personSelectUser } from './person/store/selectors/user/user.selectors';
import { AutocloseOverlaysService } from './services/AutocloseOverlaysService';
import { AppState } from './store/reducers';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  @HostListener('window:popstate', ['$event'])
  onPopState() {
    this.autocloseOverlaysService.trigger();
  }

  user$: Observable<any>;

  // pages
  public appPages = [
    { title: 'Beranda', url: '/Home', icon: 'home' },
    { title: 'Aktifitas', url: '/Activity', icon: 'reader' },
    { title: 'Profil', url: '/Profile', icon: 'person' },
    { title: 'Keamanan', url: '/Security', icon: 'shield' },
  ];

  constructor(
    private platform: Platform,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private actionShetCtrl: ActionSheetController,
    private popoverCtrl: PopoverController,
    private menuCtrl: MenuController,
    private alertCtrl: AlertController,
    private router: Router,
    private autocloseOverlaysService: AutocloseOverlaysService,
    private store: Store<AppState>
  ) {
    this.platform.backButton.subscribeWithPriority(999, async () => {
      const MODAL = await this.modalCtrl.getTop();
      const ACTION_SHEET = await this.actionShetCtrl.getTop();
      const POPOVER = await this.popoverCtrl.getTop();
      const MENU = await this.menuCtrl.getOpen();
      const ALERT = await this.alertCtrl.getTop();

      if (ACTION_SHEET) {
        // ACTIONSHEET
        this.actionShetCtrl.dismiss();
        return;
      } else if (MODAL) {
        // MODAL
        this.modalCtrl.dismiss();
        return;
      } else if (POPOVER) {
        // POPOVER
        this.popoverCtrl.dismiss();
        return;
      } else if (MENU) {
        // MENU
        this.menuCtrl.close();
        return;
      } else if (ALERT) {
        this.alertCtrl.dismiss();
        return;
      } else {
        this.navCtrl.pop();
      }
    });

    // close all popovers on back navigation, if open.
    this.router.events.subscribe((event: any): void => {
      this.store.dispatch(getUserFromCookie());

      if (event instanceof NavigationStart) {
        if (event.navigationTrigger === 'popstate') {
          this.autocloseOverlaysService.trigger();
        }
      }
    });

    // User
    this.user$ = this.store.pipe(select(personSelectUser));
  }

  signout(): void {
    this.menuCtrl.close().then(() => {
      this.store.dispatch(signoutUser());
    });
  }
}
