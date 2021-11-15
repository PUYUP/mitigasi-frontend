import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-wildfire-currently-detail',
  templateUrl: './wildfire-currently-detail.component.html',
  styleUrls: ['./wildfire-currently-detail.component.scss'],
})
export class WildfireCurrentlyDetailComponent implements OnInit {
  @Input('item') item: any;

  constructor() {}

  ngOnInit() {}
}
