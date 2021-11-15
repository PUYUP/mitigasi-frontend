import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.page.html',
  styleUrls: ['./comment.page.scss'],
})
export class CommentPage implements OnInit {
  applied_uuid: string;
  applied_model: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.applied_uuid = this.route.snapshot.paramMap.get('applied_uuid');
    this.applied_model = this.route.snapshot.paramMap.get('applied_model');

    if (this.applied_model) {
      this.applied_model = this.applied_model.replace(/\s/g, '').toLowerCase();
    }
  }
}
