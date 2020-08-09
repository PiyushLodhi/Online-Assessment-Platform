import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../create-test-page/service/http-service.service';
import { PremiumTest } from '../create-test-page/models/test-model.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-premium-dashboard',
  templateUrl: './premium-dashboard.component.html',
  styleUrls: ['./premium-dashboard.component.scss']
})
export class PremiumDashboardComponent implements OnInit {

  panelOpenState = false;
  allTests: string[] = ['abc', 'b', 'c', 'd', 'e', 'f', 'ab', 'b', 'c', 'd', 'e', 'f', 'a', 'b', 'c', 'd', 'e', 'f', 'a', 'b', 'c', 'd', 'e', 'f'];
  searchTest: string;
  premiumTests: PremiumTest[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.premiumTests = this.route.snapshot.data.httpData;
    console.log(this.premiumTests);
  }

  goToTestDetail(testId:string) {
    console.log(testId);
    this.router.navigate(['./premiumTests/premiumTestDetails'],
      {
        queryParams: { 'id': testId }
      }
    );
  }

}
