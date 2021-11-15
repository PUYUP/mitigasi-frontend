import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-landslide-currently-detail',
  templateUrl: './landslide-currently-detail.component.html',
  styleUrls: ['./landslide-currently-detail.component.scss'],
})
export class LandslideCurrentlyDetailComponent implements OnInit {
  @Input('item') item: any;

  constructor() {}

  ngOnInit() {}
}
