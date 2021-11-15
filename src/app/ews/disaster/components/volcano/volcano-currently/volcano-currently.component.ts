import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-volcano-currently',
  templateUrl: './volcano-currently.component.html',
  styleUrls: ['./volcano-currently.component.scss'],
})
export class VolcanoCurrentlyComponent implements OnInit {
  @Input('item') item: any;
  @Input('last') last: boolean;

  constructor() {}

  ngOnInit() {}
}
