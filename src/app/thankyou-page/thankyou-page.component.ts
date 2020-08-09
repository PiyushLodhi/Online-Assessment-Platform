import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-thankyou-page',
  templateUrl: './thankyou-page.component.html',
  styleUrls: ['./thankyou-page.component.scss'],
})
export class ThankyouPageComponent implements OnInit {
  constructor() {}

  rating: number;

  inputName: string;

  ngOnInit() {}

  
  onClick(rating: number): void {
    this.rating = rating;
  }
}
