import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from '@angular/router';
import {CategoryService} from '../../../services/category/caterory.service';
import {SingerService} from '../../../services/singer/singer.service';
import {AlbumService} from '../../../services/album/album.service';
import {FirebaseComponent} from '../../firebase/firebase.component';
import {FirebaseMP3Component} from '../../firebaseMP3/firebaseMP3.component';
import {SongService} from '../../../services/song/song.service';
import {Song} from '../../../model/song/song';
import {UpdateInfo} from '../../../model/userManager/updateinfo';
import {ToastrService} from 'ngx-toastr';
import {TokenStorageService} from '../../../auth/token-storage.service';
import {transition, trigger, useAnimation} from '@angular/animations';
import {shake} from 'ng-animate';
import {Album} from 'src/app/model/album/album';
import {Category} from '../../../model/category/category';
import {Singer} from '../../../model/singer/singer';
import {UserService} from '../../../services/userManager/user.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-update-song',
  templateUrl: './update-song.component.html',
  styleUrls: ['./update-song.component.css'],
  animations: [
    trigger('shake', [transition('* => *', useAnimation(shake))])
  ],
})
export class UpdateSongComponent implements OnInit {
  updateMusicForm: FormGroup;
  filteredOptions: any;

  userinfo!: UpdateInfo;

  albums: Album[];
  categories: Category[];
  singers: Singer[];

  song: Song;
  user_id: any;
  singer_id: any;
  album_id: any;
  category_id: any;

  avatarUrl: any;
  mp3Url: any;
  old_avatar = '';
  old_mp3 = '';

  id: number;
  nameSong: any;
  describes: any;
  author: any;
  views: any;
  shake: any;

  songInfo: Song;
  songInfo$: Observable<Song>;
  albumInfo$: Observable<Album[]>;
  categoryInfo$: Observable<Category[]>;
  singerInfo$: Observable<Singer[]>;

  constructor(private songService: SongService,
              private router: Router,
              private route: ActivatedRoute,
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

  ngOnInit(): void {
    this.updateForm();

    this.id = +this.route.snapshot.paramMap.get('id');
    this.songInfo = this.route.snapshot.data.getSongDetailById;
    this.albums = this.route.snapshot.data.getAlbums.data;
    this.categories = this.route.snapshot.data.getCategories.data;
    this.singers = this.route.snapshot.data.getSingers.data;
    this.userinfo = this.route.snapshot.data.getUserInfo.user;
    this.singer_id = this.route.snapshot.data.getSingerIDbySongID;
    this.getSongDetailById(this.id);
    this.filteredOption_category();
  }

  updateForm(): void {
    this.updateMusicForm = this.fb.group({
      nameSong: ['', [Validators.required]],
      describes: ['', [Validators.required]],
      author: ['', [Validators.required]],
      views: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      avatarUrl: [''],
      mp3Url: [''],
      myControl_category: new FormControl('', Validators.required),
      singer_id: ['', [Validators.required]],
      album_id: ['', [Validators.required]],
      old_avatar: [this.old_avatar],
      old_mp3: [this.old_mp3],
    });
  }

  getSingers(): void {
    this.singerService.getAllSingers().subscribe((singers: any) => {
      this.singers = singers.data;
      // console.log(this.singers);
    }, (error) => console.log(error));
  }

  getAlbums(): void {
    this.albumService.getAllAlbum().subscribe((albums: any) => {
      this.albums = albums.data;
      // console.log(this.albums);
    }, (error) => console.log(error));
  }

  filteredOption_category(): void {
    this.filteredOptions = this.updateMusicForm.get('myControl_category').valueChanges
      .pipe(
        startWith(''),
        // tslint:disable-next-line:no-non-null-assertion
        map(value => typeof value === 'string' ? value : value!.name),
        map(name => name ? this._filter_category(name) : this.categories.slice()
        )
      );
  }

  displayFn_category(category: Category): string {
    return category && category.category_name ? category.category_name : '';
  }

  getCategories(): void {
    this.categoryService.getAllCategories().subscribe((categories: any) => {
      this.categories = categories.data;
      // console.log(categories.data);
      console.log(7);
      this.filteredOption_category();
      // console.log(this.categories);
    }, (error) => console.log(error));
  }

  getUserInfo(): void {
    this.userService.getInfoUserToken().subscribe((data: any) => {
      // console.log(data);
      if (data.status) {
        this.token.signOut();
        this.toastr.warning('You must login to update Song.');
        this.router.navigate(['/user/login']);
      } else {
        console.log(10);
        this.userinfo = data.user;
      }
    }, error => console.log(error));
  }

  getSingerIDbySongID(id: number): void {
    this.singerService.getSingerIDBySongID(id).subscribe((res: any) => {
      // console.log(res);
      console.log(4);
      this.singer_id = res;
    }, (error: any) => console.log(error));
  }

  getCategoryInfo(id: number): void {
    this.categoryService.getCategoryInfo(id).subscribe((res: any) => {
        this.category_id = res;
        console.log(6);
        console.log('category_id', res);
      }, (error: any) => console.log(error)
    );
  }

  getSongDetailById(id: number): void {
    const songDetailById = this.route.snapshot.data.getSongDetailById;
    this.nameSong = songDetailById.nameSong;
    this.describes = songDetailById.describes;
    this.author = songDetailById.author;
    this.views = songDetailById.views;
    this.avatarUrl = songDetailById.avatarUrl;
    this.mp3Url = songDetailById.mp3Url;
    this.album_id = songDetailById.album_id;
    this.old_mp3 = songDetailById.mp3Url;
    this.old_avatar = songDetailById.avatarUrl;

    this.getCategoryInfo(songDetailById.category_id);
  }

  updateSong(song: Song, id: number): void {
    this.songService.updateSong(song, id).subscribe((data: any) => {
      if (data.status) {
        this.toastr.warning('You must login to update song.');
        this.token.signOut();
        this.router.navigate(['/user/login']);
      } else {
        this.toastr.success('Updated Song Successfully!');
        this.router.navigate(['/user/profile', this.userinfo.id]);
      }
    }, error => {
      if ((JSON.parse(error.error)).category_id) {
        this.toastr.warning((JSON.parse(error.error)).category_id);
      } else {
        this.toastr.warning('Something wrong.');
        console.log(error);
      }
    });
  }

  updateSongSubmit(): void {
    this.updateMusicForm.value.avatarUrl = this.firebase.fb;
    this.updateMusicForm.value.mp3Url = this.firebaseMP3.fb;

    this.song = this.updateMusicForm.value;
    this.song.user_id = this.userinfo.id;

    // get OLD value
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

    this.song.category_id = this.updateMusicForm.value.myControl_category.id;
    this.song.album_id = this.updateMusicForm.value.album_id;
    // stringify to JSON
    this.song.singer_id = JSON.stringify(this.updateMusicForm.value.singer_id);
    // console.log(this.song);

    this.updateSong(this.song, this.id);
  }

  compareWithFunc(a, b): boolean {
    return a === b;
  }

  private _filter_category(name: any): Category[] {
    const filterValue = name.toLowerCase();
    return this.categories.filter(option => option.category_name.toLowerCase().indexOf(filterValue) === 0);
  }

}
