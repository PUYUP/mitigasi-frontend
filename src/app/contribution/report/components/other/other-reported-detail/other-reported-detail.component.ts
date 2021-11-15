import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-other-reported-detail',
  templateUrl: './other-reported-detail.component.html',
  styleUrls: ['./other-reported-detail.component.scss'],
})
export class OtherReportedDetailComponent implements OnInit {
  @Input('item') item: any;

  constructor() {}

  ngOnInit() {}
}
