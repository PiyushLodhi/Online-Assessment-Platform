import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['../home.component.scss']
})
export class HomeContentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public navigateToSection(section: string) {
    window.location.hash = '';
    window.location.hash = section;
  }
  

}
