import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { personSelectUser } from 'src/app/person/store/selectors/user/user.selectors';
import { AppState } from 'src/app/store/reducers';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {
  user$: Observable<any>;

  constructor(private store: Store<AppState>) {
    this.user$ = this.store.pipe(select(personSelectUser));
  }

  ngOnInit() {}
}
