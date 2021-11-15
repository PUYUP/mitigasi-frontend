import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-earthquake-currently',
  templateUrl: './earthquake-currently.component.html',
  styleUrls: ['./earthquake-currently.component.scss'],
})
export class EarthquakeCurrentlyComponent implements OnInit {
  @Input('item') item: any;
  @Input('last') last: boolean;

  constructor() {}

  ngOnInit() {}
}
