import {Component, OnInit} from '@angular/core';
import {AngularFireStorage} from "@angular/fire/storage";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TokenStorageService} from "../../../auth/token-storage.service";
import {ToastrService} from "ngx-toastr";
import {FirebaseComponent} from "../../firebase/firebase.component";
import {UpdateInfo} from "../../../model/userManager/updateinfo";
import {Song} from "../../../model/song/song";
import {SongService} from "../../../services/song/song.service";
import {FirebaseMP3Component} from "../../firebaseMP3/firebaseMP3.component";
import {AlbumService} from '../../../services/album/album.service';
import {CategoryService} from "../../../services/category/caterory.service";
import {SingerService} from "../../../services/singer/singer.service";
import {transition, trigger, useAnimation} from "@angular/animations";
import {shake} from "ng-animate";
import {Album} from 'src/app/model/album/album';
import {Category} from 'src/app/model/category/category';
import {Singer} from "../../../model/singer/singer";
import {UserService} from "../../../services/userManager/user.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-create-song',
  templateUrl: './create-song.component.html',
  styleUrls: ['./create-song.component.css'],
  animations: [
    trigger('shake', [transition('* => *', useAnimation(shake))])
  ],
})
export class CreateSongComponent implements OnInit {

  userinfo!: UpdateInfo;
  createMusicForm: FormGroup;
  song: Song;
  albums: Album[];
  categories: Category[];
  singers: Singer[];
  shake: any;
  loadUserInfo$: Observable<UpdateInfo>;

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
    this.loadUserInfo$ = this.userService.getInfoUserToken();
    this.getUserInfo();

    this.getAlbums();
    this.getCategories();
    this.getSingers();

    this.createForm();
  }

  getAlbums(): void {
    this.albumService.getAllAlbum().subscribe((albums: any) => {
      this.albums = albums.data;
      // console.log(this.albums);
    }, (error) => console.log(error));
  }

  getCategories(): void {
    this.categoryService.getAllCategories().subscribe((categories: any) => {
      this.categories = categories.data;
      // console.log(this.categories);
    }, (error) => console.log(error));
  }

  getSingers(): void {
    this.singerService.getAllSingers().subscribe((singers: any) => {
      this.singers = singers.data;
      // console.log(this.singers);
    }, (error) => console.log(error));
  }

  getUserInfo(): void {
    this.userService.getInfoUserToken().subscribe((data: any) => {
      // console.log(data);
      if (data.status) {
        this.token.signOut();
        this.toastr.warning('You must login to create Song.');
        this.routes.navigate(['/user/login'])
      } else {
        this.userinfo = data.user;
      }
    }, error => console.log(error));
  }

  createForm(): void {
    this.createMusicForm = this.fb.group({
      nameSong: ['', [Validators.required]],
      avatarUrl: ['', [Validators.required]],
      mp3Url: ['', [Validators.required]],
      describes: ['', [Validators.required]],
      author: ['', [Validators.required]],
      views: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      singer_id: ['', [Validators.required]],
      category_id: ['', [Validators.required]],
      album_id: ['', [Validators.required]],
    });
  }

  createSong(song: Song): void {
    this.songService.createSong(song).subscribe((data: any) => {
        // console.log(data);
        if (data.error || data.status) {
          this.token.signOut();
          this.toastr.warning('You must login to create song.');
          this.routes.navigate(['/user/login'])
        } else {
          this.toastr.success('Add song successfully!');
          this.routes.navigate(['/user/profile']);
        }
      }, error => {
        // console.log(error);
        this.toastr.warning("Something wrong.");
      }
    );
  }

  createSongSubmit() {
    this.createMusicForm.value.avatarUrl = this.firebase.fb;
    this.createMusicForm.value.mp3Url = this.firebaseMP3.fb;
    this.song = this.createMusicForm.value;
    //Stringify to JSon
    this.song.singer_id = JSON.stringify(this.createMusicForm.value.singer_id);
    this.song.user_id = this.userinfo.id;
    // console.log(this.song);

    this.createSong(this.song);
  }
}
