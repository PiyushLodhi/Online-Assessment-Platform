import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-premium-card',
  templateUrl: './premium-card.component.html',
  styleUrls: ['./premium-card.component.scss']
})
export class PremiumCardComponent implements OnInit {

  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {
  }
  goToTestDetail(){
    this.router.navigate(['./premiumTests/premiumTestDetails'],
          {
            queryParams: {'id': '1'}
          }
        );
  }

}
