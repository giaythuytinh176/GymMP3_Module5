import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Observable} from 'rxjs';
import {Song} from 'src/app/model/song/song';
import {PlaylistService} from 'src/app/services/playlist/playlist.service';
import {SongService} from 'src/app/services/song/song.service';
import {Playlist} from '../../../model/playlist/playlist';
import {UpdateInfo} from '../../../model/userManager/updateinfo';
import {DialogDeletePlaylistComponent} from '../dialog-delete-playlist/dialog-delete-playlist.component';
import {UserService} from '../../../services/userManager/user.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {FormBuilder} from '@angular/forms';
import {TokenStorageService} from '../../../auth/token-storage.service';
import {MatDialog} from '@angular/material/dialog';
import {CreatePlaylistComponent} from '../create-playlist/create-playlist.component';
import {DialogDeleteSongOfPlaylistComponent} from '../dialog-delete-song-of-playlist/dialog-delete-song-of-playlist.component';
import {Track} from 'ngx-audio-player';

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
  songOfPlaylist: Song[];
  auth: boolean;
  getRandomImagePlaylist: { error: string, image: string };
  tracks: Track[];

  constructor(
    private songService: SongService,
    private router: Router,
    private playlistService: PlaylistService,
    private toastr: ToastrService,
    private userService: UserService,
    private storage: AngularFireStorage,
    private route: ActivatedRoute,
    private routes: Router,
    private fb: FormBuilder,
    private token: TokenStorageService,
    public dialog: MatDialog,
    public createPlaylist: CreatePlaylistComponent,
  ) {
  }

  ngOnInit(): void {
    this.playlistInfo = this.route.snapshot.data.getPlaylistInfo.data;
    this.auth = this.route.snapshot.data.getPlaylistInfo.auth;
    this.getUserInfo = this.route.snapshot.data.getUserInfo.user;
    this.allsongs = this.route.snapshot.data.getAllSongs.data;
    this.songOfPlaylist = this.route.snapshot.data.getSongOfPlaylist;
    this.getRandomImagePlaylist = this.route.snapshot.data.getRandomImagePlaylist;

    this.loadTrackPlaylist();
    this.getAllSongsExceptInPlaylist();
    this.id = +this.route.snapshot.paramMap.get('id');
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

  getAllSongsExceptInPlaylist(): any {
    this.playlistService.getAllSongsExceptInPlaylist(this.songOfPlaylist).subscribe((data: any) => {
      this.allsongs = data;
      this.loadTrackPlaylist();
    }, error => console.log(error));
  }

  deleteSongOfPlaylist(song_id: number, user_id: number, id: number): void {
    this.playlistService.deleteSongOfPlaylist(song_id, user_id, id).subscribe(
      (data: any) => {
        this.getSongOfPlaylist();
        this.toastr.success('Deleted song successfully!');
      }, error => console.log(error)
    );
  }

  // tslint:disable-next-line:variable-name
  openDialogDeleteSongOfPlaylist(song_id: number, nameSong: string, user_id: number): void {
    const dialogRef = this.dialog.open(DialogDeleteSongOfPlaylistComponent, {
      width: '300px',
      data: {song_id, nameSong, user_id},
      // panelClass: 'custom-dialog',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.title = result;
      if (result === undefined) {
      } else if (result) {
        this.deleteSongOfPlaylist(song_id, user_id, this.id);
      }
    });
  }

  getSongOfPlaylist(): void {
    // console.log(this.playlists);
    this.playlistService.getListSongOfPlaylist(this.id)
      .subscribe((data: any) => {
        if (data.status) {
          this.token.signOut();
          this.routes.navigate(['/user/login']);
        } else {
          this.songOfPlaylist = data;
          this.getAllSongsExceptInPlaylist();
        }
      }, error => {
        console.log(error);
      });
  }

  addToPlaylist(id: number): void {
    console.log('abc', id);
    this.playlistService.addSong(id, this.id).subscribe(
      (data: any) => {
        if (data.status) {
          this.token.signOut();
          this.routes.navigate(['/user/login']);
        } else {
          if (data.exist) {
            this.toastr.warning('Song existed in your playlist!');
          } else if (data.pl && !data.exist) {
            this.getSongOfPlaylist();
            this.getAllSongsExceptInPlaylist();
            this.toastr.success('Add song to playlist successfully!');
          } else {
            this.toastr.success('Something wrong. Please contact to admin!');
          }
          // this.router.navigate(['/user/playlist/this.id']);
        }
      }, error => {
        // console.log(error);
        this.toastr.warning('Something wrong.');
      }
    );
  }
}
