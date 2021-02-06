import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CategoryService} from "../../../services/category/caterory.service";
import {SingerService} from "../../../services/singer/singer.service";
import {AlbumService} from "../../../services/album/album.service";
import {FirebaseComponent} from "../../firebase/firebase.component";
import {FirebaseMP3Component} from "../../firebaseMP3/firebaseMP3.component";
import {SongService} from "../../../services/song/song.service";
import {Song} from "../../../model/song/song";
import {UpdateInfo} from "../../../model/userManager/updateinfo";
import {ToastrService} from "ngx-toastr";
import {TokenStorageService} from "../../../auth/token-storage.service";
import {transition, trigger, useAnimation} from "@angular/animations";
import {shake} from "ng-animate";
import {Album} from 'src/app/model/album/album';
import {Category} from "../../../model/category/category";
import {Singer} from "../../../model/singer/singer";
import {UserService} from "../../../services/userManager/user.service";

@Component({
  selector: 'app-update-song',
  templateUrl: './update-song.component.html',
  styleUrls: ['./update-song.component.css'],
  animations: [
    trigger('shake', [transition('* => *', useAnimation(shake))])
  ],
})
export class UpdateSongComponent implements OnInit {
  updateMusicForm: FormGroup
  albums: Album[];
  categories: Category[];
  singers: Singer[];
  song: Song;
  user_id: any;
  singer_id: any;
  category_id: any;
  album_id: any;
  userinfo!: UpdateInfo;
  nameSong: any;
  describes: any;
  author: any;
  views: any;
  id: number;
  shake: any;
  avatarUrl: any;
  mp3Url: any;
  old_avatar = '';
  old_mp3 = '';
  old_singer: any;
  old_category: any;
  old_album: any;

  constructor(private songService: SongService,
              private route: Router,
              private routes: ActivatedRoute,
              private categoryService: CategoryService,
              private singerService: SingerService,
              private albumService: AlbumService,
              public firebase: FirebaseComponent,
              public firebaseMP3: FirebaseMP3Component,
              private userService: UserService,
              private toastr: ToastrService,
              private fb: FormBuilder,
              private token: TokenStorageService,
  ) {
  }

  ngOnInit() {
    this.albumService.getAllAlbum().subscribe((albums: any) => {
      this.albums = albums.data;
      console.log(this.albums);
    }, (error) => console.log(error));
    this.categoryService.getAllCategories().subscribe((categories: any) => {
      this.categories = categories.data;
      console.log(this.categories);
    }, (error) => console.log(error));
    this.singerService.getAllSingers().subscribe((singers: any) => {
      this.singers = singers.data;
      console.log(this.singers);
    }, (error) => console.log(error));

    this.userService.getInfoUserToken().subscribe((data: any) => {
      console.log(data);
      if (data.status) {
        this.token.signOut();
        this.toastr.warning('You must login to create Song.');
        this.route.navigate(['/login'])
      } else {
        this.userinfo = data.user;
        this.old_avatar = this.userinfo.avatar;
      }
    }, error => console.log(error));

    this.routes.paramMap.subscribe(paramMap => {
      this.id = +paramMap.get('id');
      this.songService.getSongById(this.id).subscribe(
        (data: any) => {
          console.log(data);
          if (data.status) {
            this.toastr.warning('You must login to update song.');
            this.token.signOut();
            this.route.navigate(['/login'])
          } else {
            this.singerService.getSingerIDBySongID(this.id).subscribe((res: any) => {
              console.log(res);
              this.old_singer = JSON.stringify(res);
            }, (error: any) => console.log(error));
            // console.log(111);
            // console.log(data);
            // console.log(222);
            this.nameSong = data.nameSong;
            this.describes = data.describes;
            this.author = data.author;
            this.views = data.views;
            this.avatarUrl = data.avatarUrl;
            this.mp3Url = data.mp3Url;
            this.singer_id = data.singer_id;
            this.category_id = data.category_id;
            this.album_id = data.album_id;
            this.old_mp3 = data.mp3Url;
            this.old_category = data.category_id;
            this.old_album = data.album_id;
          }
        },
        error => {
          console.log(error);
        }
      );
    });

    this.updateMusicForm = this.fb.group({
      nameSong: ['', [Validators.required]],
      describes: ['', [Validators.required]],
      author: ['', [Validators.required]],
      views: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      avatarUrl: [''],
      mp3Url: [''],
      singer_id: [''],
      category_id: [''],
      album_id: [''],
      old_avatar: [this.old_avatar],
      old_mp3: [this.old_mp3],
      old_singer: [this.old_singer],
      old_category: [this.old_category],
      old_album: [this.old_album],
    });
  }

  updateSong() {
    // console.log(this.userinfo);
    this.updateMusicForm.value.avatarUrl = this.firebase.fb;
    this.updateMusicForm.value.mp3Url = this.firebaseMP3.fb;
    this.song = this.updateMusicForm.value;
    this.song.user_id = this.userinfo.id;
    // console.log(this.song);
    // console.log(this.updateMusicForm.value);
    if (!this.updateMusicForm.value.avatarUrl) {
      this.song.avatarUrl = this.old_avatar;
    } else {
      this.song.avatarUrl = this.updateMusicForm.value.avatarUrl;
    }
    if (!this.updateMusicForm.value.mp3Url) {
      this.song.mp3Url = this.old_mp3;
    } else {
      this.song.mp3Url = this.updateMusicForm.value.mp3Url;
    }
    if (this.updateMusicForm.value.singer_id == '""' || !this.updateMusicForm.value.singer_id) {
      this.song.singer_id = this.old_singer;
    } else {
      this.song.singer_id = JSON.stringify(this.updateMusicForm.value.singer_id);
    }
    if (!this.updateMusicForm.value.category_id) {
      this.song.category_id = this.old_category;
    } else {
      this.song.category_id = this.updateMusicForm.value.category_id;
    }
    if (!this.updateMusicForm.value.album_id) {
      this.song.album_id = this.old_album;
    } else {
      this.song.album_id = this.updateMusicForm.value.album_id;
    }
    // console.log(this.song);
    this.songService.updateSong(this.song, this.id).subscribe((data: any) => {
      if (data.status) {
        this.toastr.warning('You must login to update song.');
        this.token.signOut();
        this.route.navigate(['/login'])
      } else {
        this.toastr.success('Updated Song Sucessfully!');
        this.route.navigate(['/profile']);
      }
    }, error => {
      this.toastr.warning('Something wrong.');
      console.log(error);
    });
  }


}
