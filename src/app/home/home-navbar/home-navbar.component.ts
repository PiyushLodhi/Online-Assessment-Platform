import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-home-navbar',
  templateUrl: './home-navbar.component.html',
  styleUrls: ['../home.component.scss']
})
export class HomeNavbarComponent implements OnInit {

  isCollapsed: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  @HostListener('window:scroll', ['$event'])

  onWindowScroll(e) {
    if (window.pageYOffset > 50) {
      let element = document.getElementById('mainNav');
      element.classList.add('navbar-scrolled');
    } else {
     let element = document.getElementById('mainNav');
       element.classList.remove('navbar-scrolled'); 
    }
 }

 navbarOpen = false;

 toggleNavbar() {
   this.navbarOpen = !this.navbarOpen;
 } 

}
