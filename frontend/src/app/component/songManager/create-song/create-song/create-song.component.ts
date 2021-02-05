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
import {Album} from "../../../../model/album";
import {AlbumService} from '../../../../services/album/album.service';
import {Category} from "../../../../model/category";
import {Singer} from "../../../../model/singer";
import {CategoryService} from "../../../../services/category/caterory.service";
import {SingerService} from "../../../../services/singer/singer.service";

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
  categories: Category[];
  singers: Singer[];

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
              private categoryService: CategoryService,
              private singerService: SingerService,
  ) {
  }

  ngOnInit(): void {
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
      }
      else {
        this.userinfo = data.user;
      }
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
    this.song = this.createMusicForm.value;
    this.song.singer_id = JSON.stringify(this.createMusicForm.value.singer_id);
    this.song.user_id = this.userinfo.id;
    console.log(this.song);
    this.songService.createSong(this.song).subscribe((data: any) => {
        console.log(data);
        this.toastr.success('Bạn đã thêm thành công Bài Hát');
        this.routes.navigate(['/browse']);
      }, error => {
        console.log(error);
        this.toastr.success('Gặp lỗi xảy ra khi thêm bài hát này!');
      }
    );
  }


}
