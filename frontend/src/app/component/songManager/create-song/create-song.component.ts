import {Component, OnInit} from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TokenStorageService} from '../../../auth/token-storage.service';
import {ToastrService} from 'ngx-toastr';
import {FirebaseComponent} from '../../firebase/firebase.component';
import {UpdateInfo} from '../../../model/userManager/updateinfo';
import {Song} from '../../../model/song/song';
import {SongService} from '../../../services/song/song.service';
import {FirebaseMP3Component} from '../../firebaseMP3/firebaseMP3.component';
import {transition, trigger, useAnimation} from '@angular/animations';
import {shake} from 'ng-animate';
import {Album} from 'src/app/model/album/album';
import {Category} from 'src/app/model/category/category';
import {Singer} from '../../../model/singer/singer';
import {UserService} from '../../../services/userManager/user.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

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

  filteredOptionsCategory: Observable<Category[]>;
  filteredOptionsAlbum: Observable<Album[]>;

  selectedSingers: Singers[] = new Array<Singers>();
  filteredSingers: Observable<Singers[]>;
  lastFilterSinger = '';

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
  ) {
  }

  ngOnInit(): void {
    this.createForm();

    this.userinfo = this.route.snapshot.data.getUserInfo.user;

    this.albums = this.route.snapshot.data.getAlbums.data;
    this.categories = this.route.snapshot.data.getCategories.data;
    this.singers = this.route.snapshot.data.getSingers.data;

    this.filteredOption_category();
    this.filteredOption_album();
    this.filteredOption_singer();
  }

  filteredOption_singer(): void {
    this.filteredSingers = this.createMusicForm.get('myControl_singer').valueChanges
      .pipe(
      startWith<string | Singers[]>(''),
      map(value => typeof value === 'string' ? value : this.lastFilterSinger),
      map(filter => this.filter_singer(filter))
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

  // tslint:disable-next-line:typedef
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
      const i = this.selectedSingers.findIndex(value => value.singer_name === singer.singer_name);
      this.selectedSingers.splice(i, 1);
    }
    this.createMusicForm.get('myControl_singer').setValue(this.selectedSingers);
  }

  // Category
  filteredOption_category(): void {
    this.filteredOptionsCategory = this.createMusicForm.get('myControl_category').valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value?.name),
        map(name => name ? this._filter_category(name) : this.categories.slice()
        )
      );
  }

  displayFn_category(category: Category): string {
    return category && category.category_name ? category.category_name : '';
  }

  // Album
  filteredOption_album(): void {
    this.filteredOptionsAlbum = this.createMusicForm.get('myControl_album').valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value?.name),
        map(name => name ? this._filter_album(name) : this.albums.slice()
        )
      );
  }

  displayFn_album(album: Album): string {
    return album && album.album_name ? album.album_name : '';
  }

  createForm(): void {
    this.createMusicForm = this.fb.group({
      nameSong: ['', [Validators.required]],
      avatarUrl: ['', [Validators.required]],
      mp3Url: ['', [Validators.required]],
      describes: ['', [Validators.required]],
      author: ['', [Validators.required]],
      views: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      myControl_singer: ['', [Validators.required]],
      myControl_category: ['', Validators.required],
      myControl_album: ['', Validators.required],
    });
  }

  createSong(song: Song): void {
    this.songService.createSong(song).subscribe((data: any) => {
        // console.log(data);
        if (data.error || data.status) {
          this.token.signOut();
          this.toastr.warning('You must login to create song.');
          this.routes.navigate(['/user/login']);
        } else {
          this.toastr.success('Add song successfully!');
          this.routes.navigate(['/user/profile', this.userinfo.id]);
        }
      }, error => {
        // console.log(error);
        this.toastr.warning('Something wrong.');
      }
    );
  }

  createSongSubmit(): void {
    if (this.createMusicForm.valid) {
      this.createMusicForm.value.avatarUrl = this.firebase.fb;
      this.createMusicForm.value.mp3Url = this.firebaseMP3.fb;
      this.song = this.createMusicForm.value;
      this.song.category_id = this.createMusicForm.value.myControl_category.id;
      this.song.album_id = this.createMusicForm.value.myControl_album.id;
      // Stringify to JSon
      this.song.singer_id = JSON.stringify(this.createMusicForm.value.myControl_singer.map(data => data.id));
      this.song.user_id = this.userinfo.id;
      // console.log(this.song);

      this.createSong(this.song);
    }
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
