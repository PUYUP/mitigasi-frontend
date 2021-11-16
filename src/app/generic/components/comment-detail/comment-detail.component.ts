import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/reducers';
import {
  loadComment,
  loadComments,
} from '../../store/actions/comment/comment.actions';
import { selectComment } from '../../store/selectors/comment/comment.selectors';

@Component({
  selector: 'app-comment-detail',
  templateUrl: './comment-detail.component.html',
  styleUrls: ['./comment-detail.component.scss'],
})
export class CommentDetailComponent implements OnInit {
  contentType: string;
  objectId: string;
  commentUuid: string;

  comment$: Observable<any>;

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {}

  ngOnInit() {
    this.contentType = this.route.snapshot.queryParamMap.get('content_type');
    this.objectId = this.route.snapshot.queryParamMap.get('object_id');
    this.commentUuid = this.route.snapshot.paramMap.get('comment_uuid');

    this.store.dispatch(loadComment({ uuid: this.commentUuid }));

    this.comment$ = this.store.pipe(
      select(selectComment({ uuid: this.commentUuid }))
    );
  }
}
