import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CategoryService} from "../../../services/category/caterory.service";
import {SingerService} from "../../../services/singer/singer.service";
import {AlbumService} from "../../../services/album/album.service";
import {environment} from 'src/environments/environment';
import {FirebaseComponent} from "../../firebase/firebase.component";
import {Album} from "../../../model/album";
import {Category} from "../../../model/category";
import {Singer} from "../../../model/singer";
import {FirebaseMP3Component} from "../../firebaseMP3/firebaseMP3.component";
import {SongService} from "../../../services/song/song.service";
import {Song} from "../../../model/song/song";
import {UpdateInfo} from "../../../model/userManager/updateinfo";
import {UserService} from "../../../services/user.service";
import {ToastrService} from "ngx-toastr";
import {TokenStorageService} from "../../../auth/token-storage.service";

@Component({
  selector: 'app-update-song',
  templateUrl: './update-song.component.html',
  styleUrls: ['./update-song.component.css']
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
      } else {
        this.userinfo = data.user;
      }
    }, error => console.log(error));

    this.updateMusicForm = this.fb.group({
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

    this.routes.paramMap.subscribe(paramMap => {
      this.id = +paramMap.get('id');
      this.songService.getSongById(this.id).subscribe(
        (data: any) => {
          if (data.status) {
            this.toastr.warning('You must login to update song.');
            this.token.signOut();
          } else {
            this.nameSong = data.nameSong;
            this.describes = data.describes;
            this.author = data.author;
            this.views = data.views;
          }
        },
        error => {
          console.log(error);
        }
      );
    });
  }

  updateSong() {
    console.log(this.userinfo);
    this.updateMusicForm.value.avatarUrl = this.firebase.fb;
    this.updateMusicForm.value.mp3Url = this.firebaseMP3.fb;
    this.song = this.updateMusicForm.value;
    this.song.singer_id = JSON.stringify(this.updateMusicForm.value.singer_id);
    this.song.user_id = this.userinfo.id;
    console.log(this.song);
    this.songService.updateSong(this.song, this.id).subscribe((data: any) => {
      if (data.status) {
        this.toastr.warning('You must login to update song.');
        this.token.signOut();
      } else {
        this.toastr.success('Updated Song Sucessfully.');
        this.route.navigate(['/listsongs']);
      }
    }, error => {
      console.log(error);
    });
  }


}
