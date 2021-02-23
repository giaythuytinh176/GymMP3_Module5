import {Component, OnInit} from '@angular/core';
import {SongService} from '../../../services/song/song.service';
import {Song} from '../../../model/song/song';

@Component({
  selector: 'app-showmore-song-lastest',
  templateUrl: './showmore-song-lastest.component.html',
  styleUrls: ['./showmore-song-lastest.component.css']
})
export class ShowmoreSongLastestComponent implements OnInit {

  showmoreSongLastest: Song[];
  allsongs: Song[];

  constructor(
    private songService: SongService,
  ) {
  }

  ngOnInit(): void {
    this.getShowmoreSongLastest();
  }

  getShowmoreSongLastest(): void {
    this.songService.getShowmoreSongLastest().subscribe((data: any) => {
      this.showmoreSongLastest = data;
    });
  }

}
