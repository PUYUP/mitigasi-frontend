import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-wildfire-reported-detail',
  templateUrl: './wildfire-reported-detail.component.html',
  styleUrls: ['./wildfire-reported-detail.component.scss'],
})
export class WildfireReportedDetailComponent implements OnInit {
  @Input('item') item: any;

  constructor() {}

  ngOnInit() {}
}
