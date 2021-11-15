import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-wind-currently-detail',
  templateUrl: './wind-currently-detail.component.html',
  styleUrls: ['./wind-currently-detail.component.scss'],
})
export class WindCurrentlyDetailComponent implements OnInit {
  @Input('item') item: any;

  constructor() {}

  ngOnInit() {}
}
