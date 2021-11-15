import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-volcano-reported-detail',
  templateUrl: './volcano-reported-detail.component.html',
  styleUrls: ['./volcano-reported-detail.component.scss'],
})
export class VolcanoReportedDetailComponent implements OnInit {
  @Input('item') item: any;

  constructor() {}

  ngOnInit() {}
}
