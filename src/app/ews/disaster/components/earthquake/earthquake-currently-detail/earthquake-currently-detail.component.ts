import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-earthquake-currently-detail',
  templateUrl: './earthquake-currently-detail.component.html',
  styleUrls: ['./earthquake-currently-detail.component.scss'],
})
export class EarthquakeCurrentlyDetailComponent implements OnInit {
  @Input('item') item: any;

  constructor() {}

  ngOnInit() {}
}
