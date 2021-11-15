import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-wildfire-currently',
  templateUrl: './wildfire-currently.component.html',
  styleUrls: ['./wildfire-currently.component.scss'],
})
export class WildfireCurrentlyComponent implements OnInit {
  @Input('item') item: any;
  @Input('last') last: boolean;

  constructor() {}

  ngOnInit() {}
}
