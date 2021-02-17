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
import {DialogDeleteSongComponent} from '../songManager/delete-song/dialog-delete-song/dialog-delete-song.component';
import {FirebaseComponent} from '../firebase/firebase/firebase.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userinfo!: UpdateInfo;
  isLoading = false;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    public createPlaylist: CreatePlaylistComponent,
  ) {
  }

  ngOnInit(): void {
    this.userinfo = this.route.snapshot.data.getUserInfo.user;
  }
}
