import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Playlist} from 'src/app/model/playlist/playlist';
import {Song} from 'src/app/model/song/song';
import {PlaylistService} from 'src/app/services/playlist/playlist.service';
import {SongService} from 'src/app/services/song/song.service';
import {Track} from 'ngx-audio-player';

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
  tracks: Track[];
  songOfPlaylist: Song[];

  constructor(
    private songService: SongService,
    private router: Router,
    private playlistService: PlaylistService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.songOfPlaylist = this.route.snapshot.data.getSongOfPlaylistGuest;
    this.id = +this.route.snapshot.paramMap.get('id');
    this.loadTrackPlaylist();
    this.getDetailPlaylist();
    this.getSongOfLastPlaylist();
  }

  loadTrackPlaylist(): void {
    this.tracks = this.songOfPlaylist.map((data) => {
      return {
        title: data.nameSong,
        link: data.mp3Url,
        artist: data.author,
      };
    });
  }

  getDetailPlaylist(): void {
    this.playlistService.getDetailPlaylist(this.id)
      .subscribe((data: any) => {
        this.lastPlaylist = data;
      }, error => {
      });
  }

  getSongOfLastPlaylist(): void {
    this.playlistService.getShowSongsToLastPlaylist(this.id)
      .subscribe((data: any) => {

        this.songOfLastPlaylist = data;
      }, error => {
        console.log(error);
      });
  }

}
