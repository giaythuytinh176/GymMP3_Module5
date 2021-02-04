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

@Component({
  selector: 'app-show-songs-user',
  templateUrl: './show-songs-user.component.html',
  styleUrls: ['./show-songs-user.component.css']
})
export class ShowSongsUserComponent implements OnInit {

  songs: Song;
  success: string;
  fail: string;
  username: string;
  isUpdate = false;
  isUpdateFailed = false;
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

  deleteSong(id:number){
    this.songService.deleteSong(id).subscribe(
      data=>{
        console.log(data);
        this.getListSongs();
      }, error => console.log(error)
    )
  }

}
