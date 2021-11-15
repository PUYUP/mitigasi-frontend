import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tsunami-currently',
  templateUrl: './tsunami-currently.component.html',
  styleUrls: ['./tsunami-currently.component.scss'],
})
export class TsunamiCurrentlyComponent implements OnInit {
  @Input('item') item: any;
  @Input('last') last: boolean;

  constructor() {}

  ngOnInit() {}
}
