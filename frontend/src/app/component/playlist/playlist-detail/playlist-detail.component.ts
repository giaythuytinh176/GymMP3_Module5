import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {Observable} from 'rxjs';
import {Song} from 'src/app/model/song/song';
import { PlaylistService } from 'src/app/services/playlist/playlist.service';
import {SongService} from 'src/app/services/song/song.service';
import {Playlist} from '../../../model/playlist/playlist';
import {UpdateInfo} from "../../../model/userManager/updateinfo";

@Component({
  selector: 'app-playlist-detail',
  templateUrl: './playlist-detail.component.html',
  styleUrls: ['./playlist-detail.component.css']
})
export class PlaylistDetailComponent implements OnInit {
  allsongs: Song[];
  id: number;
  playlistInfo: Playlist;
  getUserInfo: UpdateInfo;

  constructor(
    private songService: SongService,
    private readonly route: ActivatedRoute,
    private router: Router,
    private playlistService: PlaylistService,
    private toastr: ToastrService,
  ) {
  }

  ngOnInit(): void {
    this.playlistInfo = this.route.snapshot.data.getPlaylistInfo;
    this.getUserInfo = this.route.snapshot.data.getUserInfo.user;
    this.allsongs = this.route.snapshot.data.getAllSongs.data;
    this.id = +this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    console.log(this.allsongs);
  }

  addToPlaylist(id: number): void {
    console.log('abc', id);
    this.playlistService.addSong(id, this.id).subscribe(
        data => {
          console.log(this.id);
          console.log(id);
          this.toastr.success('Add song to playlist successfully!');
          // this.router.navigate(['/user/playlist/this.id']);
        }, error => {
          // console.log(error);
          this.toastr.warning('Something wrong.');
        }
    );
  }
}
