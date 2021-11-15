import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-flood-currently',
  templateUrl: './flood-currently.component.html',
  styleUrls: ['./flood-currently.component.scss'],
})
export class FloodCurrentlyComponent implements OnInit {
  @Input('item') item: any;
  @Input('last') last: boolean;

  constructor() {}

  ngOnInit() {}
}
