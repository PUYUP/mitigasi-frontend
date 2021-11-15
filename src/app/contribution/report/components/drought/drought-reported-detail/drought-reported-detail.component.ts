import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-drought-reported-detail',
  templateUrl: './drought-reported-detail.component.html',
  styleUrls: ['./drought-reported-detail.component.scss'],
})
export class DroughtReportedDetailComponent implements OnInit {
  @Input('item') item: any;

  constructor() {}

  ngOnInit() {}
}
