import {Component, OnInit} from '@angular/core';
import {SongService} from '../../../services/song/song.service';
import {Song} from '../../../model/song/song';

@Component({
  selector: 'app-lastest-song',
  templateUrl: './lastest-song.component.html',
  styleUrls: ['./lastest-song.component.css']
})
export class LastestSongComponent implements OnInit {
  showmore = false;
  show = true;
  lastestSong: Song[];
  allsongs: Song[];

  constructor(
    private songService: SongService,
  ) {
  }

  ngOnInit(): void {
    this.getLastestSongs();
  }

  getLastestSongs(): void {
    this.songService.getLastestSongs().subscribe((data: any) => {
      this.lastestSong = data?.lastRecordData;
    });
  }

  showMoreSongs(): void {
    this.showmore = true;
    this.show = false;
  }
}
