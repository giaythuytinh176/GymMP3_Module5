<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> b26a701020202ac5aa1f1ec9552bfc805380cd98
import {Component, OnInit} from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {TokenStorageService} from 'src/app/auth/token-storage.service';
import {UpdateInfo} from 'src/app/model/userManager/updateinfo';
import {UserService} from 'src/app/services/user.service';
import {FirebaseComponent} from '../firebase/firebase.component';
import {SongService} from '../../services/song/song.service';
import {Song} from '../../model/song/song';
<<<<<<< HEAD
=======
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { Songs } from 'src/app/model/songs/songs';
import { UpdateInfo } from 'src/app/model/userManager/updateinfo';
import { SongsService } from 'src/app/services/songs/songs.service';
import { UserService } from 'src/app/services/user.service';
import { FirebaseComponent } from '../firebase/firebase.component';
>>>>>>> e69b538d68601004c425fe92b2324963dd22f113
=======
>>>>>>> b26a701020202ac5aa1f1ec9552bfc805380cd98

@Component({
  selector: 'app-show-songs-user',
  templateUrl: './show-songs-user.component.html',
  styleUrls: ['./show-songs-user.component.css']
})
export class ShowSongsUserComponent implements OnInit {

<<<<<<< HEAD
<<<<<<< HEAD
  songs: Song;
=======
  songs: Songs;
>>>>>>> e69b538d68601004c425fe92b2324963dd22f113
=======
  songs: Song;
>>>>>>> b26a701020202ac5aa1f1ec9552bfc805380cd98
  success: string;
  fail: string;
  username: string;
  isUpdate = false;
  isUpdateFailed = false;
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> b26a701020202ac5aa1f1ec9552bfc805380cd98
  songsinfo!: Song;
  userInfor!: UpdateInfo;

  constructor(private userService: UserService,
              private songService: SongService,
              private storage: AngularFireStorage,
              private route: ActivatedRoute,
              private routes: Router,
              private fb: FormBuilder,
              private token: TokenStorageService,
              private toastr: ToastrService,
              public firebase: FirebaseComponent,
<<<<<<< HEAD
=======
  songsinfo!: Songs;
  userInfor!: UpdateInfo;

  constructor(private userService: UserService,
    private songService: SongsService,
    private storage: AngularFireStorage,
    private route: ActivatedRoute,
    private routes: Router,
    private fb: FormBuilder,
    private token: TokenStorageService,
    private toastr: ToastrService,
    public firebase: FirebaseComponent,
>>>>>>> e69b538d68601004c425fe92b2324963dd22f113
=======
>>>>>>> b26a701020202ac5aa1f1ec9552bfc805380cd98
  ) {
  }

  ngOnInit(): void {
    this.userService.getInfoUserToken().subscribe((data: any) => {
      console.log(data);
      if (data.status) {
        this.token.signOut();
        this.toastr.warning('You must login to see list songs.');
      }
      this.userInfor = data.user;
    }, error => console.log(error));
<<<<<<< HEAD
<<<<<<< HEAD
  }

=======

  }
>>>>>>> e69b538d68601004c425fe92b2324963dd22f113
=======
  }

>>>>>>> b26a701020202ac5aa1f1ec9552bfc805380cd98
  getListSongs() {
    this.songService.getSongDetail(this.userInfor.id)
      .subscribe((data: any) => {
        console.log(data);
        this.songs = data;
        if (data.status) {
          this.token.signOut();
        }
      }, error => {
        console.log(error);
        this.isUpdate = false;
        this.isUpdateFailed = true;
      });
  }

}
