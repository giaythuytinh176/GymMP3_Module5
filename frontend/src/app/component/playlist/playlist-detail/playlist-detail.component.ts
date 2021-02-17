import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Song } from 'src/app/model/song/song';
import { SongService } from 'src/app/services/song/song.service';

@Component({
  selector: 'app-playlist-detail',
  templateUrl: './playlist-detail.component.html',
  styleUrls: ['./playlist-detail.component.css']
})
export class PlaylistDetailComponent implements OnInit {
  allsongs$: Observable<Song[]>;
  allsongs: Song[];
  id: number;
  constructor(
    private songService: SongService,
    private readonly route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.allsongs = this.route.snapshot.data.getAllSongs.data;
    this.id = +this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    console.log(this.allsongs);
  }

  addToPlaylist(id: number){
    console.log("abc", id);
  }
}
