import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-other-currently-detail',
  templateUrl: './other-currently-detail.component.html',
  styleUrls: ['./other-currently-detail.component.scss'],
})
export class OtherCurrentlyDetailComponent implements OnInit {
  @Input('item') item: any;

  constructor() {}

  ngOnInit() {}
}
