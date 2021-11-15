import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-landslide-reported-detail',
  templateUrl: './landslide-reported-detail.component.html',
  styleUrls: ['./landslide-reported-detail.component.scss'],
})
export class LandslideReportedDetailComponent implements OnInit {
  @Input('item') item: any;

  constructor() {}

  ngOnInit() {}
}
