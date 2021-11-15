import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-volcano-currently-detail',
  templateUrl: './volcano-currently-detail.component.html',
  styleUrls: ['./volcano-currently-detail.component.scss'],
})
export class VolcanoCurrentlyDetailComponent implements OnInit {
  @Input('item') item: any;

  constructor() {}

  ngOnInit() {}
}
