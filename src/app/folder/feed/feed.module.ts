import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeedPageRoutingModule } from './feed-routing.module';

import { FeedPage } from './feed.page';
import { FeedListComponent } from './components/feed-list/feed-list.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, FeedPageRoutingModule],
  declarations: [FeedPage, FeedListComponent],
  entryComponents: [FeedListComponent],
})
export class FeedPageModule {}
