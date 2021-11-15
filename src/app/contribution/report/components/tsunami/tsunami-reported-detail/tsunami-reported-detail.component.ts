import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tsunami-reported-detail',
  templateUrl: './tsunami-reported-detail.component.html',
  styleUrls: ['./tsunami-reported-detail.component.scss'],
})
export class TsunamiReportedDetailComponent implements OnInit {
  @Input('item') item: any;

  constructor() {}

  ngOnInit() {}
}
