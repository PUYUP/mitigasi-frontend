import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import * as Utils from '../../../../../core/chartjs-utils.js';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-flood-sensor-detail',
  templateUrl: './flood-sensor-detail.component.html',
  styleUrls: ['./flood-sensor-detail.component.scss'],
})
export class FloodSensorDetailComponent implements OnInit {
  @ViewChild('lineChart') private lineChart: ElementRef;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.lineChartInit();
  }

  lineChartInit() {
    const DATA_COUNT = 7;
    const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 20 };

    const data = {
      labels: [
        // Date Objects
        Utils.newHour(0),
        Utils.newHour(1),
        Utils.newHour(2),
        Utils.newHour(3),
        Utils.newHour(4),
        Utils.newHour(5),
        Utils.newHour(6),
      ],
      datasets: [
        {
          label: 'Dalam',
          backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red, 0.5),
          borderColor: Utils.CHART_COLORS.red,
          fill: false,
          data: Utils.numbers(NUMBER_CFG),
        },
      ],
    };

    let myChart = new Chart(this.lineChart.nativeElement, {
      type: 'line',
      data: data,
      options: {
        plugins: {
          title: {
            text: 'Perubahan Tinggi Muka Air',
            display: true,
          },
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            type: 'time',
            title: {
              display: true,
              text: 'Jam',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Kedalaman',
            },
          },
        },
      },
    });
  }
}
