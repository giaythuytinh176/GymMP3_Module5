import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {TokenStorageService} from '../../auth/token-storage.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {ToastrService} from 'ngx-toastr';
import {UpdateInfo} from '../../model/userManager/updateinfo';
import {Song} from '../../model/song/song';
import {SongService} from '../../services/song/song.service';
import {MatDialog} from '@angular/material/dialog';
import {UserService} from '../../services/userManager/user.service';
import {CreatePlaylistComponent} from '../playlist/create-playlist/create-playlist.component';
import {PlaylistService} from 'src/app/services/playlist/playlist.service';
import {Playlist} from 'src/app/model/playlist/playlist';
import {DialogCreatePlaylistComponent} from '../playlist/dialog-create-playlist/dialog-create-playlist.component';
import {DialogDeletePlaylistComponent} from '../playlist/dialog-delete-playlist/dialog-delete-playlist.component';
import {DialogEditPlaylistComponent} from "../playlist/dialog-edit-playlist/dialog-edit-playlist.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userinfo!: UpdateInfo;
  songs: Song[];
  playlists: Playlist[];

  constructor(private userService: UserService,
              private storage: AngularFireStorage,
              private route: ActivatedRoute,
              private routes: Router,
              private fb: FormBuilder,
              private token: TokenStorageService,
              private toastr: ToastrService,
              private songService: SongService,
              private playlistService: PlaylistService,
              public dialog: MatDialog,
              public createPlaylist: CreatePlaylistComponent,
  ) {
  }

  ngOnInit(): void {
    this.userinfo = this.route.snapshot.data.getUserInfo.user;
    this.songs = this.route.snapshot.data.getSongByUserID;
    this.playlists = this.route.snapshot.data.getPlaylistByUSerID;

  }

  getPlaylistByUSerId(): void {
    // console.log(this.playlists);
    this.playlistService.getPlaylistByUserID(this.userinfo.id)
      .subscribe((data: any) => {
        if (data.status) {
          this.token.signOut();
          this.routes.navigate(['/user/login']);
        } else {
          console.log(data);
          this.playlists = data;
        }
      }, error => {
        console.log(error);
      });
  }

  deletePlaylist(id: number, user_id: number): void {
    this.playlistService.deletePlaylist(id, user_id).subscribe(
      data => {
        // console.log(data);
        this.getPlaylistByUSerId();
        this.toastr.success('Deleted playlist successfully!');
      }, error => console.log(error)
    );
  }

  // tslint:disable-next-line:variable-name
  openDialogDeletePlaylist(id: number, name_playlist: string, user_id: number): void {
    const dialogRef = this.dialog.open(DialogDeletePlaylistComponent, {
      width: '300px',
      data: {id, name_playlist, user_id},
      // panelClass: 'custom-dialog',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.title = result;
      if (result) {
        this.deletePlaylist(id, user_id);
      }
      console.log(result);
    });
  }

  // tslint:disable-next-line:variable-name
  openDialogEditPlaylist(playlist: Playlist, user_id: number): void {
    const dialogRef = this.dialog.open(DialogEditPlaylistComponent, {
      width: '35%',
      height: '50%',
      data: {playlist: playlist, user_id: user_id},
      // panelClass: 'custom-dialog',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.title = result;
      if (result) {
        console.log(result);

      }
    });
  }

  openDialogPlaylist(user_id: number): void {
    const dialogRef = this.dialog.open(DialogCreatePlaylistComponent, {
      width: '35%',
      height: '50%',
      data: {
        user_id,
      },
      // panelClass: 'model-background',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log('result', result);
      if (result === undefined) {
      } else if (result.valid) {
        console.log(result);
        this.getPlaylistByUSerId();
        // this.notFoundCategory = false;
        // this.createMusicForm.get('myControl_category').reset();
        // this.categoryService.getAllCategories().subscribe((res: any) => {
        //   this.categories = res.data;
        // });
      }
    });
  }
}
