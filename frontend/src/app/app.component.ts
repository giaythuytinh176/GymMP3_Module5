import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  Component,
  DoCheck,
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
  isPlaying = false;

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
    const audio = document.querySelector('audio');
    audio.addEventListener('play', () => {
      // console.log(audio);
      // console.log(1 + "'");
      // console.log(audio.autoplay);
      // console.log(audio.buffered);
      // console.log(audio.readyState);
      // console.log(audio.src);
      // console.log(audio.currentSrc);
      // console.log(audio.currentTime);
      // console.log(audio.duration);
    });

    // audio.onplay = function () {
    //   // console.log(audio);
    //   // console.log(1 + "'");
    //   // console.log(audio.autoplay);
    //   // console.log(audio.buffered);
    //   // console.log(audio.readyState);
    //   // console.log(audio.src);
    //   // console.log(audio.currentSrc);
    //   // console.log(audio.currentTime);
    //   // console.log(audio.duration);
    // };


    // audio.pause = function () {
    //   // console.log(audio);
    //   // console.log(2+"'");
    // };

  }

  ngOnChanges() {
    // console.log(2);
  }

  ngDoCheck() {
    // console.log(3);
  }

  ngAfterContentInit() {
    // console.log(4);
  }

  ngAfterContentChecked() {
    // console.log(5);
  }

  ngAfterViewInit() {
    // console.log(6);
  }

  ngAfterViewChecked() {
    // console.log(7);
    // console.log(sessionStorage.getItem('mep-currentTime'));
    // console.log(sessionStorage.getItem('mep-status'));
  }

  ngOnDestroy() {
    // console.log(8);
  }

}
