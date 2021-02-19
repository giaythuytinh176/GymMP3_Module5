import {Component, OnInit} from '@angular/core';
import {Song} from '../../../model/song/song';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogDeleteSongComponent} from '../../songManager/delete-song/dialog-delete-song/dialog-delete-song.component';
import {MatDialog} from '@angular/material/dialog';
import {TokenStorageService} from '../../../auth/token-storage.service';
import {UpdateInfo} from '../../../model/userManager/updateinfo';
import {UserService} from '../../../services/userManager/user.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {FormBuilder} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {SongService} from '../../../services/song/song.service';
import {CreatePlaylistComponent} from '../../playlist/create-playlist/create-playlist.component';

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.css']
})
export class TracksComponent implements OnInit {

  songs: Song[];
  user: UpdateInfo;
  userinfo!: UpdateInfo;
  name: string;
  address: string;
  email: string;
  phone: string;
  avatar: string;
  username: string;
  isLoading = false;

  constructor(
    private userService: UserService,
    private storage: AngularFireStorage,
    private route: ActivatedRoute,
    private routes: Router,
    private fb: FormBuilder,
    private token: TokenStorageService,
    private toastr: ToastrService,
    private songService: SongService,
    public dialog: MatDialog,
    public createPlaylist: CreatePlaylistComponent,
  ) {
  }

  ngOnInit(): void {
    this.isLoading = true;

    this.songs = this.route.snapshot.data.getSongByUserID;
    this.userinfo = this.route.snapshot.data.getUserInfo.user;
  }

  deleteSong(id: number, user_id: number): void {
    this.songService.deleteSong(id, user_id).subscribe(
      data => {
        // console.log(data);
        this.getSongByUserID();
        this.toastr.success('Deleted song successfully!');
        this.routes.navigate(['/user/profile', this.userinfo.id]);
      }, error => console.log(error)
    );
  }

  getSongByUserID(): void {
    this.songService.getSongByUserID(this.userinfo.id)
      .subscribe((data: any) => {
        if (data.status) {
          this.token.signOut();
          this.routes.navigate(['/user/login']);
        } else {
          // console.log(data);
          this.songs = data;
        }
      }, error => {
        console.log(error);
      });
  }

  // tslint:disable-next-line:variable-name
  openDialogDeleteSong(id: number, nameSong: string, user_id: number): void {
    const dialogRef = this.dialog.open(DialogDeleteSongComponent, {
      width: '300px',
      data: {id, nameSong, user_id},
      // panelClass: 'custom-dialog',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.title = result;
      if (result) {
        this.deleteSong(id, user_id);
      }
      // console.log(result);
    });
  }
}
