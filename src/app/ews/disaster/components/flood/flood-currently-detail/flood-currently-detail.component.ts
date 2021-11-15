import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-flood-currently-detail',
  templateUrl: './flood-currently-detail.component.html',
  styleUrls: ['./flood-currently-detail.component.scss'],
})
export class FloodCurrentlyDetailComponent implements OnInit {
  @Input('item') item: any;

  constructor() {}

  ngOnInit() {}
}
