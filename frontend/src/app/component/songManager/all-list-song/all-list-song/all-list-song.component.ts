import {Component, OnInit} from '@angular/core';
import {SongService} from "../../../../services/song/song.service";
import {Song} from "../../../../model/song/song";

@Component({
  selector: 'app-all-list-song',
  templateUrl: './all-list-song.component.html',
  styleUrls: ['./all-list-song.component.css']
})
export class AllListSongComponent implements OnInit {

  allsongs: Song[];

  constructor(
    private songService: SongService,
  ) {
  }

  ngOnInit(): void {
    this.songService.getAllSongs().subscribe((res: any) => {
      this.allsongs = res.data;
      console.log(this.allsongs);
    }, (error) => console.log(error));
  }

}
