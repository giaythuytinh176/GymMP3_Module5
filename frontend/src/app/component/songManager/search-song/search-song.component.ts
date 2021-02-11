import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SongService} from 'src/app/services/song/song.service';
import {Song} from "../../../model/song/song";
import {Observable, Subject} from "rxjs";
import {concatMap, debounceTime, distinctUntilChanged, switchMap, throttleTime} from "rxjs/operators";

@Component({
  selector: 'app-search-song',
  templateUrl: './search-song.component.html',
  styleUrls: ['./search-song.component.css']
})
export class SearchSongComponent implements OnInit {
  song!: Song[];
  search!: any;
  count!: any;
  isSearch = false;
  search$ = new Subject<string>();
  keywordEnter = false;

  constructor(
    private songService: SongService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {// https://angular.io/tutorial/toh-pt6 The searchTerms RxJS subject
    this.search$.pipe(
      //throttleTime(300),
      debounceTime(300),
      distinctUntilChanged(),
      // concatMap(value =>
      switchMap(value =>
        this.songService.searchSong(value)
      )
    ).subscribe(
      (next) => {
        this.song = next || [];
        if (next.keyword) {
          this.keywordEnter = true;
          this.isSearch = false;
        } else {
          this.isSearch = true;
          this.keywordEnter = false;
        }
        this.count = next.length;
        // console.log(this.song);

      });
    // this.songService.searchSong(this.search).subscribe(
    //   data => {
    //     this.song = data;
    //     this.count = (JSON.parse((JSON.stringify(this.song)))).length;
    //     console.log(this.count);
    //     this.isSearch = false;
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // );
  }

  onInput(event): any {
    this.search = event.target.value;
    this.songService.searchSong(this.search).subscribe(
      (data: any) => {
        // console.log(data);
        this.song = data;
        this.count = (JSON.parse((JSON.stringify(this.song)))).length;
        // console.log(this.count);
        this.isSearch = true;
      },
      error => {
        console.log(error);
      }
    );
  }
}
