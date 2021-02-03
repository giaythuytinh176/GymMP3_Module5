import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../../services/user.service";
import {AngularFireStorage} from "@angular/fire/storage";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TokenStorageService} from "../../../../auth/token-storage.service";
import {ToastrService} from "ngx-toastr";
import {FirebaseComponent} from "../../../firebase/firebase.component";
import {UpdateInfo} from "../../../../model/userManager/updateinfo";
import {Song} from "../../../../model/song/song";
import {SongService} from "../../../../services/song/song.service";
import {FirebaseMP3Component} from "../../../firebaseMP3/firebaseMP3.component";
import {AlbumService} from "../../../../services/album.service";
import { Album } from '../../../../model/album';

@Component({
  selector: 'app-create-song',
  templateUrl: './create-song.component.html',
  styleUrls: ['./create-song.component.css']
})
export class CreateSongComponent implements OnInit {

  userinfo!: UpdateInfo;
  createMusicForm: FormGroup;
  song: Song;
  albums: Album[];

  constructor(private userService: UserService,
              private storage: AngularFireStorage,
              private route: ActivatedRoute,
              private routes: Router,
              private fb: FormBuilder,
              private token: TokenStorageService,
              private toastr: ToastrService,
              public firebase: FirebaseComponent,
              public firebaseMP3: FirebaseMP3Component,
              private songService: SongService,
              private albumService: AlbumService,
) {
    this.song = {
      nameSong: '',
      avatarUrl: '',
      mp3Url: '',
      describes: '',
      author: '',
      views: '',
      user_id: '',
      singer_id: '',
      category_id: '',
      album_id: '',
    };
  }

  ngOnInit(): void {
    this.albumService.getAllAlbum().subscribe( (albums: any) => {
      this.albums = albums.data;
      console.log(this.albums);
    }, (error) => console.log(error));
    this.userService.getInfoUserToken().subscribe((data: any) => {
      console.log(data);
      if (data.status) {
        this.token.signOut();
        this.toastr.warning('You must login to create Song.');
      }
      this.userinfo = data.user;
    }, error => console.log(error));

    this.createMusicForm = this.fb.group({
      nameSong: ['', [Validators.required]],
      avatarUrl: ['', [Validators.required]],
      mp3Url: ['', [Validators.required]],
      describes: ['', [Validators.required]],
      author: ['', [Validators.required]],
      views: ['', [Validators.required]],
      singer_id: ['', [Validators.required]],
      category_id: ['', [Validators.required]],
      album_id: ['', [Validators.required]],
    });
  }

  createSong() {
    this.createMusicForm.value.avatarUrl = this.firebase.fb;
    this.createMusicForm.value.mp3Url = this.firebaseMP3.fb;
    console.log(this.createMusicForm.value);
    this.song = this.createMusicForm.value;
    this.song.user_id = this.userinfo.id;

    console.log(this.song);
    this.songService.createSong(this.song).subscribe((data: any) => {
        console.log(data);
        alert('Bạn đã thêm thành công Bài Hát');
        // this.routes.navigate(['/']);
      }, error => {
        console.log(error),
          alert('Bạn chưa thêm thành công');
      }
    );
  }


}
