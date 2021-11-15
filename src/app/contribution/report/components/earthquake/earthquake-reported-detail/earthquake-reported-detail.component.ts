import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-earthquake-reported-detail',
  templateUrl: './earthquake-reported-detail.component.html',
  styleUrls: ['./earthquake-reported-detail.component.scss'],
})
export class EarthquakeReportedDetailComponent implements OnInit {
  @Input('item') item: any;

  constructor() {}

  ngOnInit() {}
}
