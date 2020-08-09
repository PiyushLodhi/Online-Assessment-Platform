import { Component, OnInit } from '@angular/core';
import {LoaderService} from '../services/loader.service';
import { Subject, Observable } from 'rxjs';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { filter } from 'rxjs/operators';
import { IsLoadingService } from '@service-work/is-loading';


@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  color = 'primary';
  mode = 'indeterminate';
  value = 50;

  isnavigate: Observable<boolean>;
  isLoading: Subject<boolean> = this.loaderService.isLoading;

  constructor(private loaderService: LoaderService,private router: Router,private isLoadingService: IsLoadingService){}

  ngOnInit(): void {
    this.isLoadingService.remove();
    this.isnavigate = this.isLoadingService.isLoading$();
    this.router.events
      .pipe(
        filter(
          event =>
            event instanceof NavigationStart ||
            event instanceof NavigationEnd ||
            event instanceof NavigationCancel ||
            event instanceof NavigationError,
        ),
      )
      .subscribe(event => {
        // If it's the start of navigation, `add()` a loading indicator
        if (event instanceof NavigationStart) {
          this.isLoadingService.add();
          return;
        }

        // Else navigation has ended, so `remove()` a loading indicator
        this.isLoadingService.remove();
      });
  }

}
