import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.page.html',
  styleUrls: ['./sensor.page.scss'],
})
export class SensorPage implements OnInit {
  identifier: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.identifier = this.route.snapshot.paramMap.get('identifier_id');
  }
}
