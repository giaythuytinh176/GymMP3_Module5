import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SongService } from 'src/app/services/song/song.service';
import {Song} from "../../../model/song/song";

@Component({
  selector: 'app-search-song',
  templateUrl: './search-song.component.html',
  styleUrls: ['./search-song.component.css']
})
export class SearchSongComponent implements OnInit {
  song!: Song[];
  search!: any;
  count!: any;

  constructor(
    private songService: SongService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.songService.searchSong(this.search).subscribe(
      data => {
        this.song = data;
        console.log(this.song)
      },
      error => {
        console.log(error);
      }
    );
  }

  onInput(event): any{
    this.search = event.target.value;
    this.songService.searchSong(this.search).subscribe(
      data => {
        this.song = data;
       this.count = data.song.length;
        console.log()
      },
      error => {
        console.log(error);
      }
    );
  }
}
