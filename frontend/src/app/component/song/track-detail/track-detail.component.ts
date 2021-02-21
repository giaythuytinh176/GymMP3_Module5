import {Pipe, Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {SongService} from '../../../services/song/song.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Song} from '../../../model/song/song';
import {Track} from 'ngx-audio-player';
import {FormControl} from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Observable} from 'rxjs';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {map, startWith} from 'rxjs/operators';
import {MatChipInputEvent} from '@angular/material/chips';
import {Singer} from '../../../model/singer/singer';
import {SingerService} from "../../../services/singer/singer.service";
import {ToastrService} from "ngx-toastr";
import {TokenStorageService} from "../../../auth/token-storage.service";
import {UpdateInfo} from "../../../model/userManager/updateinfo";

@Component({
  selector: 'app-track-detail',
  templateUrl: './track-detail.component.html',
  styleUrls: ['./track-detail.component.css']
})
export class TrackDetailComponent implements OnInit {
  songInfo: Song;
  songSameSinger: Song[];
  tracks1: Track[];
  singers: Singer[];

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  singerCtrl = new FormControl();
  filteredSingers: Observable<string[]>;
  singerOfSong: string[];
  allSingers: string[];
  id: number;
  userinfo: UpdateInfo;

  @ViewChild('sinterInput') sinterInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(private songService: SongService,
              private router: Router,
              private route: ActivatedRoute,
              private singerService: SingerService,
              private toastr: ToastrService,
              private token: TokenStorageService,
  ) {
  }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.songInfo = this.route.snapshot.data.getSongDetailByIdGuest;
    this.songSameSinger = this.route.snapshot.data.getSongSameSingerBySongId;
    this.singers = this.route.snapshot.data.getAllSingers.data;
    // this.userinfo = this.route.snapshot.data.getUserInfo.user;

    this.loadTrackPlaylist();

    this.singerOfSong = this.songInfo.singers.map((data) => {
      return data.singer_name;
    });
    this.allSingers = this.singers.map((data) => {
      return data.singer_name;
    });

    this.loadfilteredSingers();
  }

  loadfilteredSingers(): void {
    this.filteredSingers = this.singerCtrl.valueChanges.pipe(
      startWith(null),
      map(
        (singer: string | null) => {
          return singer ? this._filter(singer) : this.allSingers.slice();
        }
      )
    );
  }

  reloadSongInfo(): void {
    this.songService.getSongDetailByIdGuest(this.id).subscribe((data: any) => {
      this.songInfo = data;
    });
  }

  addSinger(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our singer
    if ((value || '').trim()) {
      this.singerOfSong.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.singerCtrl.setValue(null);
  }

  removeSinger(singer: string): void {
    this.deleteSingerFromSongsingerName(singer, this.id);
  }

  deleteSingerFromSongsingerName(singerName: string, songId: number): void {
    this.singerService.deleteSingerfromSong(singerName, songId)
      .subscribe((data: any) => {
        if (data.status) {
          this.toastr.warning('Your must login to add Singer to this Song!');
          this.token.signOut();
          this.router.navigate(['/user/login']);
        } else {
          const index = this.singerOfSong.indexOf(singerName);
          if (index >= 0) {
            this.singerOfSong.splice(index, 1);
            this.reloadSongInfo();
            this.loadfilteredSingers();
            this.toastr.success('Remove Singer from Song successfully!');
          } else {
            this.toastr.warning('Something wrong.');
          }
        }
      }, error => {
        console.log(error);
        if (error.error) {
          this.toastr.warning((error.error)['error']);
        } else {
          this.toastr.warning('Something wrong.');
        }
      });
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.addSingerToSong(event.option.viewValue, this.id);
  }

  addSingerToSong(singerName: string, songId: number): void {
    this.singerService.addSingerToSong(singerName, songId)
      .subscribe((data: any) => {
        this.sinterInput.nativeElement.value = '';
        this.singerCtrl.setValue(null);
        if (data.status) {
          this.toastr.warning('Your must login to add Singer to this Song!');
          this.token.signOut();
          this.router.navigate(['/user/login']);
        } else {
          this.singerOfSong.push(singerName);
          this.reloadSongInfo();
          this.loadfilteredSingers();
          this.toastr.success('Add Singer to Song successfully!');
        }
      }, error => {
        this.sinterInput.nativeElement.value = '';
        this.singerCtrl.setValue(null);
        if (error.error) {
          this.toastr.warning((error.error)['error']);
        } else {
          this.toastr.warning('Something wrong.');
        }
      });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allSingers.filter(singer => singer.toLowerCase().indexOf(filterValue) === 0);
  }

  loadTrackPlaylist(): void {
    this.tracks1 = this.songSameSinger.map((data) => {
      return {
        title: data.nameSong,
        link: data.mp3Url,
        artist: data.author,
      };
    });
  }
}
