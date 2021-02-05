import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TokenStorageService} from "../../auth/token-storage.service";
import {AngularFireStorage} from "@angular/fire/storage";
import {ToastrService} from "ngx-toastr";
import {UpdateInfo} from "../../model/userManager/updateinfo";
import {FirebaseComponent} from "../firebase/firebase.component";
import {Song} from "../../model/song/song";
import {ShowSongsUserComponent} from "../show-songs-user/show-songs-user.component";
import {SongService} from "../../services/song/song.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: UpdateInfo;
  userinfo!: UpdateInfo;
  name: string;
  address: string;
  email: string;
  phone: string;
  avatar: string;
  username: string;
  songs: Song[];

  constructor(private userService: UserService,
              private storage: AngularFireStorage,
              private route: ActivatedRoute,
              private routes: Router,
              private fb: FormBuilder,
              private token: TokenStorageService,
              private toastr: ToastrService,
              public firebase: FirebaseComponent,
              public showSongsUser: ShowSongsUserComponent,
              private songService: SongService,
  ) {
  }

  ngOnInit(): void {
    this.userService.getInfoUserToken().subscribe((data: any) => {
      console.log(data);
      if (data.status) {
        this.token.signOut();
        this.toastr.warning('You must login to see profile.');
      } else {
        this.userinfo = data.user;
        this.name = this.userinfo.name;
        this.address = this.userinfo.address;
        this.email = this.userinfo.email;
        this.phone = this.userinfo.phone;
        this.avatar = this.userinfo.avatar;
        this.username = this.userinfo.username;
        this.songService.getSongDetail(this.userinfo.id)
          .subscribe((data: any) => {
            if (data.status) {
              this.token.signOut();
            } else {
              console.log(data);
              this.songs = data;
            }
          }, error => {
            console.log(error);
          });
        console.log(this.showSongsUser.songs);
      }
    }, error => console.log(error));

  }


}
