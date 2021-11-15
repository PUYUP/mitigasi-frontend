import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DisasterIncidents } from 'src/app/core/disaster-identifier';

@Component({
  selector: 'app-sensor-detail',
  templateUrl: './sensor-detail.page.html',
  styleUrls: ['./sensor-detail.page.scss'],
})
export class SensorDetailPage implements OnInit {
  identifier_id: string;
  identifier_label: string;
  sensor_uuid: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.identifier_id = this.route.snapshot.paramMap.get('identifier_id');
    this.identifier_label = DisasterIncidents[this.identifier_id];
    this.sensor_uuid = this.route.snapshot.paramMap.get('sensor_uuid');
  }
}
