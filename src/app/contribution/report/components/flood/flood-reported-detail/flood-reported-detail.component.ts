import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-flood-reported-detail',
  templateUrl: './flood-reported-detail.component.html',
  styleUrls: ['./flood-reported-detail.component.scss'],
})
export class FloodReportedDetailComponent implements OnInit {
  @Input('item') item: any;

  constructor() {}

  ngOnInit() {}
}
