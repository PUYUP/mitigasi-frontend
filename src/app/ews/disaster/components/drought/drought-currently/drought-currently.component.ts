import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-drought-currently',
  templateUrl: './drought-currently.component.html',
  styleUrls: ['./drought-currently.component.scss'],
})
export class DroughtCurrentlyComponent implements OnInit {
  @Input('item') item: any;
  @Input('last') last: boolean;

  constructor() {}

  ngOnInit() {}
}
