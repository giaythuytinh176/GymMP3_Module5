import {Component, Input, OnInit} from '@angular/core';
import {Track} from 'ngx-audio-player';

@Component({
  selector: 'app-ngx-audio',
  templateUrl: './ngx-audio.component.html',
  styleUrls: ['./ngx-audio.component.css']
})
export class NgxAudioComponent implements OnInit {
  @Input() listTracks: Track[];

  msaapDisplayTitle = true;
  msaapDisplayPlayList = true;
  msaapPageSizeOptions = [5, 10, 15];
  msaapDisplayVolumeControls = true;
  msaapDisplayRepeatControls = true;
  msaapDisplayArtist = true;
  msaapDisplayDuration = false;
  msaapDisablePositionSlider = false;

  constructor() {
  }

  onEnded(event): void {
    console.log('ended', event);
  }

  ngOnInit(): void {
    // this.listTracks = [
    //   {
    //     title: 'Vùng Lá Me Bay',
    //     link: 'https://firebasestorage.googleapis.com/v0/b/dataimagemusic.appspot.com/o/test%2FVungLaMeBay1-NhuQuynh-4453354.mp3?alt=media&token=8af81cc7-c90b-4a28-b48f-137884833541',
    //     artist: 'Anh Việt Thanh',
    //   },
    // ];
  }

}
