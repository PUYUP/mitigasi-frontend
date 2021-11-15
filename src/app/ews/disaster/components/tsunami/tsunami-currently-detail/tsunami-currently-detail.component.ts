import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tsunami-currently-detail',
  templateUrl: './tsunami-currently-detail.component.html',
  styleUrls: ['./tsunami-currently-detail.component.scss'],
})
export class TsunamiCurrentlyDetailComponent implements OnInit {
  @Input('item') item: any;

  constructor() {}

  ngOnInit() {}
}
