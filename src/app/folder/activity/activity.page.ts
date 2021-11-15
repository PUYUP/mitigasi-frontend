import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/person/services/user/user.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.page.html',
  styleUrls: ['./activity.page.scss'],
})
export class ActivityPage implements OnInit {
  user: any;
  segmentSelected: string = 'hazard';

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.user = this.userService.getCurrentUser()?.user;
  }

  /**
   * Sgement start here
   */
  segmentChanged(event: any) {
    this.segmentSelected = event.detail.value;
  }
}
