import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-landslide-currently',
  templateUrl: './landslide-currently.component.html',
  styleUrls: ['./landslide-currently.component.scss'],
})
export class LandslideCurrentlyComponent implements OnInit {
  @Input('item') item: any;
  @Input('last') last: boolean;

  constructor() {}

  ngOnInit() {}
}
