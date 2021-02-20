import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Playlist } from 'src/app/model/playlist/playlist';
import { Song } from 'src/app/model/song/song';
import { PlaylistService } from 'src/app/services/playlist/playlist.service';
import { SongService } from 'src/app/services/song/song.service';

@Component({
  selector: 'app-show-songs-last-playlist',
  templateUrl: './show-songs-last-playlist.component.html',
  styleUrls: ['./show-songs-last-playlist.component.css']
})
export class ShowSongsLastPlaylistComponent implements OnInit {

  id: number;
  lastPlaylist: Playlist;
  songOfLastPlaylist: Song[];
  auth: boolean;
  
  constructor(
    private songService: SongService,
    private router: Router,
    private playlistService: PlaylistService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.getDetailPlaylist();
    this.getSongOfLastPlaylist();
    console.log(this.id);
  }

  getDetailPlaylist(): void {
    this.playlistService.getDetailPlaylist(this.id)
      .subscribe((data: any) => {
         
          this.lastPlaylist = data;
          console.log(data);
        }, error => {
        console.log(error);
      });
  }

  getSongOfLastPlaylist(): void {
    this.playlistService.getShowSongsToLastPlaylist(this.id)
      .subscribe((data: any) => {
         
          this.songOfLastPlaylist = data;
          console.log(data);
        }, error => {
        console.log(error);
      });
  }

}
