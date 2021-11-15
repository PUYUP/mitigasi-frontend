import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-wind-reported-detail',
  templateUrl: './wind-reported-detail.component.html',
  styleUrls: ['./wind-reported-detail.component.scss'],
})
export class WindReportedDetailComponent implements OnInit {
  @Input('item') item: any;

  constructor() {}

  ngOnInit() {}
}
