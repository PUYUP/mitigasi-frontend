import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-drought-currently-detail',
  templateUrl: './drought-currently-detail.component.html',
  styleUrls: ['./drought-currently-detail.component.scss'],
})
export class DroughtCurrentlyDetailComponent implements OnInit {
  @Input('item') item: any;

  constructor() {}

  ngOnInit() {}
}
