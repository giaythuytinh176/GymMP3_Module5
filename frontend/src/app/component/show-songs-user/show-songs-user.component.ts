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

@Component({
  selector: 'app-show-songs-user',
  templateUrl: './show-songs-user.component.html',
  styleUrls: ['./show-songs-user.component.css']
})
export class ShowSongsUserComponent implements OnInit {

  songs: Songs;
  success: string;
  fail: string;
  username: string;
  isUpdate = false;
  isUpdateFailed = false;
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

  }
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
