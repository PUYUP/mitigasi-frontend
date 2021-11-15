import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-boarding',
  templateUrl: './boarding.component.html',
  styleUrls: ['./boarding.component.css'],
})
export class BoardingComponent implements OnInit {
  challenge: string | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.challenge =
      this.route.snapshot.queryParamMap.get('challenge') || undefined;
  }
}
