import {Component, Inject, OnInit} from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TokenStorageService} from '../../../auth/token-storage.service';
import {ToastrService} from 'ngx-toastr';
import {UpdateInfo} from '../../../model/userManager/updateinfo';
import {Song} from '../../../model/song/song';
import {SongService} from '../../../services/song/song.service';
import {transition, trigger, useAnimation} from '@angular/animations';
import {shake} from 'ng-animate';
import {Album} from 'src/app/model/album/album';
import {Category} from 'src/app/model/category/category';
import {Singer} from '../../../model/singer/singer';
import {UserService} from '../../../services/userManager/user.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {SingerV2} from '../../../model/singer/singerV2';
import {SingerService} from '../../../services/singer/singer.service';
import {CategoryService} from '../../../services/category/caterory.service';
import {MatDialog} from '@angular/material/dialog';
import {AlbumService} from '../../../services/album/album.service';
import {CreateCategoryDialogComponent} from '../../category/create-category-dialog/create-category-dialog.component';
import {DialogCreateAlbumComponent} from '../../album/dialog-create-album/dialog-create-album.component';
import {DialogCreateSingerComponent} from "../../singer/dialog-create-singer/dialog-create-singer.component";
import {FirebaseComponent} from "../../firebase/firebase/firebase.component";
import {FirebaseMP3Component} from "../../firebase/firebaseMP3/firebaseMP3.component";

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

  selectedSingers: SingerV2[] = new Array<SingerV2>();
  filteredSingers: Observable<SingerV2[]>;
  lastFilterSinger = '';

  notFoundCategory = false;
  notFoundAlbum = false;
  notFoundSinger = false;
  toCreateSinger: string;
  toCreateCategory: string;
  toCreateAlbum: string;

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
              private singerService: SingerService,
              private categoryService: CategoryService,
              private albumService: AlbumService,
              public dialog: MatDialog,
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
        startWith<string | SingerV2[]>(''),
        map(value => typeof value === 'string' ? value : this.lastFilterSinger),
        map(filter => this.filterNameSingerCheck(filter)),
      );
  }

  filter_singer(filter: string): SingerV2[] {
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

  displayFn_singer(value: SingerV2[] | string): string | undefined {
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

  filterNameSingerCheck(filter: any): any {
    {
      const filterNameSinger = this.filter_singer(filter);
      if (filterNameSinger.length === 0) {
        this.toCreateSinger = filter;
        this.notFoundSinger = true;
      } else {
        this.notFoundSinger = false;
      }
      return filterNameSinger;
    }
  }

  // tslint:disable-next-line:typedef
  optionClicked(event: Event, singer: SingerV2): void {
    event.stopPropagation();
    this.toggleSelection(singer);
  }

  toggleSelection(singer: SingerV2): void {
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
        map(name => this.filterNameCategoryCheck(name)),
      );
  }

  displayFn_category(category: Category): string {
    return category && category.category_name ? category.category_name : '';
  }

  filterNameCategoryCheck(name: any): any {
    const filterNameCategory = name ? this._filter_category(name) : this.categories.slice();
    if (filterNameCategory.length === 0) {
      this.toCreateCategory = name;
      this.notFoundCategory = true;
    } else {
      this.notFoundCategory = false;
    }
    return filterNameCategory;
  }

  // Album
  filteredOption_album(): void {
    this.filteredOptionsAlbum = this.createMusicForm.get('myControl_album').valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value?.name),
        map(name => this.filterNameAlbumCheck(name)),
      );
  }

  displayFn_album(album: Album): string {
    return album && album.album_name ? album.album_name : '';
  }

  filterNameAlbumCheck(name: any): any {
    const filterNameAlbum = name ? this._filter_album(name) : this.albums.slice();
    if (filterNameAlbum.length === 0) {
      this.toCreateAlbum = name;
      this.notFoundAlbum = true;
    } else {
      this.notFoundAlbum = false;
    }
    return filterNameAlbum;
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
      console.log(this.createMusicForm.value);
      this.createMusicForm.value.avatarUrl = this.firebase.fb;
      this.createMusicForm.value.mp3Url = this.firebaseMP3.fb;
      this.song = this.createMusicForm.value;
      this.song.category_id = this.createMusicForm.value.myControl_category.id;
      this.song.album_id = this.createMusicForm.value.myControl_album.id;
      // console.log(this.song);
      this.song.user_id = this.userinfo.id;

      if (this.createMusicForm.value.myControl_singer instanceof Array) {
        // Stringify to JSon
        this.song.singer_id = JSON.stringify(this.createMusicForm.value.myControl_singer.map((data) => {
          return data.id;
        }));
        this.createSong(this.song);
      } else {
        this.toastr.warning('The singer field is required or does not exist yet.');
      }
    }
  }

  // tslint:disable-next-line:variable-name
  openDialogSinger(singer_name: string): void {
    const dialogRef = this.dialog.open(DialogCreateSingerComponent, {
      width: '456px',
      data: {
        singer_name,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log('result', result);
      if (result === undefined) {
      } else if (result.valid) {
        this.notFoundSinger = false;
        this.createMusicForm.get('myControl_singer').reset();
        this.singerService.getAllSingers().subscribe((res: any) => {
          this.singers = res.data;
        });
      }
    });
  }

  // tslint:disable-next-line:variable-name
  openDialogCategory(category_name: string): void {
    const dialogRef = this.dialog.open(CreateCategoryDialogComponent, {
      width: '456px',
      data: {
        category_name,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log('result', result);
      if (result === undefined) {
      } else if (result.valid) {
        this.notFoundCategory = false;
        this.createMusicForm.get('myControl_category').reset();
        this.categoryService.getAllCategories().subscribe((res: any) => {
          this.categories = res.data;
        });
      }
    });
  }

  // tslint:disable-next-line:variable-name
  openDialogAlbum(album_name: string): void {
    const dialogRef = this.dialog.open(DialogCreateAlbumComponent, {
      width: '456px',
      data: {
        album_name,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log('result', result);
      if (result === undefined) {
      } else if (result.valid) {
        this.notFoundAlbum = false;
        this.createMusicForm.get('myControl_album').reset();
        this.albumService.getAllAlbum().subscribe((res: any) => {
          this.albums = res.data;
        });
      }
    });
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
