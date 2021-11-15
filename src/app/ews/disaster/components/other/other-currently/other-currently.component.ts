import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-other-currently',
  templateUrl: './other-currently.component.html',
  styleUrls: ['./other-currently.component.scss'],
})
export class OtherCurrentlyComponent implements OnInit {
  @Input('item') item: any;
  @Input('last') last: boolean;

  constructor() {}

  ngOnInit() {}
}
