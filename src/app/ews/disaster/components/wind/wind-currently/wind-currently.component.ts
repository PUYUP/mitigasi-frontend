import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-wind-currently',
  templateUrl: './wind-currently.component.html',
  styleUrls: ['./wind-currently.component.scss'],
})
export class WindCurrentlyComponent implements OnInit {
  @Input('item') item: any;
  @Input('last') last: boolean;

  constructor() {}

  ngOnInit() {}
}
