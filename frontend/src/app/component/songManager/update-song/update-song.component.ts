import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
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
import {UserService} from '../../../services/userManager/user.service';
import {Observable} from 'rxjs';
import {map, startWith, tap} from 'rxjs/operators';

export class Singers {
  constructor(
    public id: number,
    // tslint:disable-next-line:variable-name
    public singer_name: string,
    public image: string,
    public selected?: boolean,
  ) {
    if (selected === undefined) {
      this.selected = false;
    }
  }
}

@Component({
  selector: 'app-update-song',
  templateUrl: './update-song.component.html',
  styleUrls: ['./update-song.component.css'],
  animations: [
    trigger('shake', [transition('* => *', useAnimation(shake))])
  ],
})
// multiselection-in-autocomplete-angular https://stackblitz.com/edit/angular-sx79hu?embed=1&file=app/multiselect-autocomplete-example.html
export class UpdateSongComponent implements OnInit {
  updateMusicForm: FormGroup;
  filteredOptionsCategory: Observable<Category[]>;
  filteredOptionsAlbum: Observable<Album[]>;

  userinfo!: UpdateInfo;

  albums: Album[];
  categories: Category[];
  singers: Singers[];

  song: Song;
  singer: any;
  album: any;
  category: any;

  avatarUrl: any;
  mp3Url: any;
  oldAvatar = '';
  oldMp3 = '';

  id: number;
  nameSong: any;
  describes: any;
  author: any;
  views: any;
  shake: any;

  songInfo: Song;
  isLoading = false;

  selectedSingers: Singers[] = new Array<Singers>();
  filteredSingers: Observable<Singers[]>;
  lastFilterSinger = '';

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
    this.isLoading = true;
    this.updateForm();

    this.filteredOption_category();
    this.filteredOption_album();
    this.filteredOption_singer();
    this.singer = this.route.snapshot.data.getSingerIDbySongID;

    this.id = +this.route.snapshot.paramMap.get('id');
    this.songInfo = this.route.snapshot.data.getSongDetailById;
    this.albums = this.route.snapshot.data.getAlbums.data;
    this.categories = this.route.snapshot.data.getCategories.data;
    this.singers = this.route.snapshot.data.getSingers.data;
    this.userinfo = this.route.snapshot.data.getUserInfo.user;
    // filter checkbox by TAM LE
    this.singers = this.singers.filter((sger) => {
      sger.selected = !!this.singer.find(e => e.id === sger.id);
      return sger;
    });
    for (const sg of this.singers) {
      if (sg.selected) {
        this.selectedSingers.push(sg);
      }
    }

    this.getSongDetailById();
  }

  updateForm(): void {
    this.updateMusicForm = this.fb.group({
      nameSong: ['', [Validators.required]],
      describes: ['', [Validators.required]],
      author: ['', [Validators.required]],
      views: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      avatarUrl: [''],
      mp3Url: [''],
      oldAvatar: [this.oldAvatar],
      oldMp3: [this.oldMp3],
      myControl_category: ['', Validators.required],
      myControl_album: ['', Validators.required],
      myControl_singer: ['', [Validators.required]],
    });
  }

  filteredOption_singer(): void {
    this.filteredSingers = this.updateMusicForm.get('myControl_singer').valueChanges
      .pipe(
        startWith<string | Singers[]>(''),
        map(value => typeof value === 'string' ? value : this.lastFilterSinger),
        map(filter => this.filter_singer(filter)),
        // tap(() => this.updateMusicForm.get('myControl_singer').setValue(this.singer)) // Set Default value- Error for this
      );
  }

  filter_singer(filter: string): Singers[] {
    this.lastFilterSinger = filter;
    if (filter) {
      return this.singers.filter(option => {
        return option.singer_name.toLowerCase().indexOf(filter.toLowerCase()) >= 0
          // || option.image.toLowerCase().indexOf(filter.toLowerCase()) >= 0
          ;
      });
    } else {
      return this.singers.slice();
    }
  }

  displayFn_singer(value: Singers[] | string): string | undefined {
    let displayValue: string;
    if (Array.isArray(value)) {
      value.forEach((singer, index) => {
        if (index === 0) {
          displayValue = singer.singer_name; // singer.id + ' ' +
        } else {
          displayValue += ', ' + singer.singer_name; // + singer.id + ' '
        }
      });
    } else {
      displayValue = value;
    }
    return displayValue;
  }

  optionClicked(event: Event, singer: Singers): void {
    event.stopPropagation();
    this.toggleSelection(singer);
  }

  toggleSelection(singer: Singers): void {
    singer.selected = !singer.selected;
    if (singer.selected) {
      this.selectedSingers.push(singer);
    } else {
      // value.id === singer.id &&  && value.image === singer.image
      const i = this.selectedSingers.findIndex(value => value.id === singer.id);
      this.selectedSingers.splice(i, 1);
    }
    this.updateMusicForm.get('myControl_singer').setValue(this.selectedSingers);
  }

  // Category
  filteredOption_category(): void {
    this.filteredOptionsCategory = this.updateMusicForm.get('myControl_category').valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value?.name),
        map(name => name ? this._filter_category(name) : this.categories.slice()),
        tap(() => this.updateMusicForm.get('myControl_category').setValue(this.category)) // Set Default value
      );
  }

  displayFn_category(category: Category): string {
    return category && category.category_name ? category.category_name : '';
  }

  // Album
  filteredOption_album(): void {
    this.filteredOptionsAlbum = this.updateMusicForm.get('myControl_album').valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value?.name),
        map(name => name ? this._filter_album(name) : this.albums.slice()),
        tap(() => this.updateMusicForm.get('myControl_album').setValue(this.album)) // Set Default value
      );
  }

  displayFn_album(album: Album): string {
    return album && album.album_name ? album.album_name : '';
  }

  getCategoryInfo(id: number): void {
    this.categoryService.getCategoryInfo(id).subscribe((res: any) => {
        this.category = res;
        this.isLoading = false;
      }, (error: any) => console.log(error)
    );
  }

  getAlbumInfo(id: number): void {
    this.albumService.getAlbumInfo(id).subscribe((res: any) => {
        this.album = res;
      }, (error: any) => console.log(error)
    );
  }

  getSongDetailById(): void {
    const songDetailById = this.route.snapshot.data.getSongDetailById;
    this.nameSong = songDetailById.nameSong;
    this.describes = songDetailById.describes;
    this.author = songDetailById.author;
    this.views = songDetailById.views;
    this.avatarUrl = songDetailById.avatarUrl;
    this.mp3Url = songDetailById.mp3Url;
    this.oldMp3 = songDetailById.mp3Url;
    this.oldAvatar = songDetailById.avatarUrl;

    this.getAlbumInfo(songDetailById.album_id);
    this.getCategoryInfo(songDetailById.category_id);
  }

  compareWithFunc(a, b): boolean {
    return a === b;
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
      } else if ((JSON.parse(error.error)).album_id) {
        this.toastr.warning((JSON.parse(error.error)).album_id);
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
      this.song.avatarUrl = this.oldAvatar;
    } else {
      this.song.avatarUrl = this.updateMusicForm.value.avatarUrl;
    }
    if (!this.updateMusicForm.value.mp3Url) {
      this.song.mp3Url = this.oldMp3;
    } else {
      this.song.mp3Url = this.updateMusicForm.value.mp3Url;
    }

    this.song.category_id = this.updateMusicForm.value.myControl_category.id;
    this.song.album_id = this.updateMusicForm.value.myControl_album.id;
    // stringify to JSON
    this.song.singer_id = JSON.stringify(this.updateMusicForm.value.myControl_singer.map(data => data.id));
    // console.log(this.song);

    this.updateSong(this.song, this.id);
  }

  private _filter_category(name: string): Category[] {
    const filterValue = name.toLowerCase();
    return this.categories.filter(option => option.category_name.toLowerCase().indexOf(filterValue.toLowerCase()) >= 0);
  }

  private _filter_album(name: string): Album[] {
    const filterValue = name.toLowerCase();
    return this.albums.filter(option => option.album_name.toLowerCase().indexOf(filterValue.toLowerCase()) >= 0);
  }
}
