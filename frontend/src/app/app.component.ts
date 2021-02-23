import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked, AfterViewInit, ChangeDetectorRef,
  Component,
  DoCheck, NgZone,
  OnChanges, OnDestroy,
  OnInit, ViewChild
} from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart, ResolveEnd,
  ResolveStart,
  Router,
  RouterEvent
} from '@angular/router';
import {PlaylistDetailComponent} from './component/playlist/playlist-detail/playlist-detail.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'frontend';
  audio: any;

  // Sets initial value to true to show loading spinner on first load
  loading = true;
  mySubscription;

  // https://stackoverflow.com/questions/37069609/show-loading-screen-when-navigating-between-routes-in-angular-2
  // https://stackoverflow.com/questions/42048142/angular-2-resolver-with-loading-indicator
  constructor(
    private router: Router,
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.mySubscription = this.router.events.subscribe((e: RouterEvent) => {
      this.navigationInterceptor(e);
    });
  }

  ngOnInit(): void {
    const $ = document.querySelector.bind(document);

    // Xử lý CD quay / dừng
    // Handle CD spins / stops
    const mejstrackartwork = $('.mejs-track-artwork');
    const progress = $('.mejs-time-current');
    this.audio = $('audio');
    const mejstrackartworkAnimate = mejstrackartwork.animate(
      [{transform: 'rotate(360deg)'}], {
        duration: 10000, // 10 seconds
        iterations: Infinity
      });
    mejstrackartworkAnimate.pause();

    this.audio.onpause = () => {
      mejstrackartworkAnimate.pause();
    };
    this.audio.onplay = () => {
      mejstrackartworkAnimate.play();
    };

  }

  // Shows and hides the loading spinner during RouterEvent changes
  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart
    ) {
      this.loading = true;
    }
    if (event instanceof NavigationEnd) {
      this.loading = false;
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.loading = false;
    }
    if (event instanceof NavigationError) {
      this.loading = false;
    }
  }

  ngOnDestroy(): void {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }
}
