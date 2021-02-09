import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked, ChangeDetectorRef,
  Component,
  DoCheck, NgZone,
  OnChanges, OnDestroy,
  OnInit
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewChecked, OnDestroy {
  title = 'frontend';
  isPlaying: any;
  audio: any;
  isPause: any;
  mep_status: any;
  mep_currentTime: any;

  constructor() {
    // console.log(0);
  }


  getPlayer() {
    return document.querySelector('audio');
  }

  play() {
    this.getPlayer().play();
    this.isPlaying = true;
    // this.interval = setInterval(() => {
    //   this.playedPercentage = this.getPlayer().currentTime / this.getPlayer().duration;
    // }, 500);
  }

  pause() {
    this.getPlayer().pause();
    this.isPlaying = false;
  }


  ngOnInit() {
    // console.log(1);
    // this.audio = document.querySelector('audio');
    // this.audio.addEventListener('play', () => {
    // // // console.log(audio);
    // // // console.log(1 + "'");
    // // // console.log(audio.autoplay);
    // // // console.log(audio.buffered);
    // // // console.log(audio.readyState);
    // // // console.log(audio.src);
    // // // console.log(audio.currentSrc);
    // // // console.log(audio.currentTime);
    // // // console.log(audio.duration);
    // this.isPlaying = this.isPlay();
    // this.isPause = this.isPaused();
    // // console.log(this.isPlaying);
    // // console.log(this.isPause);
    // });

    // audio.onplay = function () {
    //   // // // console.log(audio);
    //   // // // console.log(1 + "'");
    //   // // // console.log(audio.autoplay);
    //   // // // console.log(audio.buffered);
    //   // // // console.log(audio.readyState);
    //   // // // console.log(audio.src);
    //   // // // console.log(audio.currentSrc);
    //   // // // console.log(audio.currentTime);
    //   // // // console.log(audio.duration);
    // };


    // audio.pause = function () {
    //   // // // console.log(audio);
    //   // // // console.log(2+"'");
    // };
    //
    // const audio = document.querySelector('audio');
    //
    // audio.onplay = function () {
    //   if (audio.duration > 0 && !audio.paused) {
    //
    //     // // console.log(11);
    //     //Its playing...do your job
    //
    //   } else {
    //
    //     // // console.log(22);
    //     //Not playing...maybe paused, stopped or never played.
    //
    //   }
    //}
  }


  isPlay() {
    return !this.audio.paused;
  }

  isPaused() {
    return !this.audio.play;
  }


  ngOnChanges() {
    // console.log(2);
    // this.mep_status = (window.sessionStorage.getItem('mep-status'));

  }

  ngDoCheck() {
    // console.log(3);
    //this.mep_status = (window.sessionStorage.getItem('mep-status'));

  }

  ngAfterContentInit() {
    // console.log(4);

  }

  ngAfterContentChecked() {
    // console.log(5);
    //this.mep_status = (window.sessionStorage.getItem('mep-status'));

  }

  ngAfterViewInit() {
    // console.log(6);
    // setTimeout ( () => {
    //
    //
    // }, 0);

  }

  ngAfterViewChecked() {
    // console.log(7);
    // console.log(window.sessionStorage.getItem('mep-currentTime'));
    // console.log(window.sessionStorage.getItem('mep-status'));
    // // console.log(this.cdr);
    this.mep_currentTime = window.sessionStorage.getItem('mep-currentTime');
    this.mep_status = window.sessionStorage.getItem('mep-status');
    // this.cdr.detectChanges();
    // this.cdr.detectChanges();
    //  this.ngZone.runTask( () => {
    //    setTimeout( () => {
    //      this.mep_currentTime = window.localStorage.getItem('mep-currentTime');
    //      this.mep_status = window.localStorage.getItem('mep-status');
    //      // // console.log(this);
    //      // console.log(11);
    //      // this.cdr.detectChanges();
    //    }, 0);
    //  });
  }

  ngOnDestroy() {
    // // console.log(8);
  }

}
