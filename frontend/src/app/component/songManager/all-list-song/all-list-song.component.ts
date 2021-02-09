import {Component, OnDestroy, OnInit} from '@angular/core';
import {SongService} from "../../../services/song/song.service";
import {Song} from "../../../model/song/song";
import {Observable, Subject} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {distinctUntilChanged, takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-all-list-song',
  templateUrl: './all-list-song.component.html',
  styleUrls: ['./all-list-song.component.css']
})
export class AllListSongComponent implements OnInit, OnDestroy {

  allsongs$: Observable<Song[]>;
  private onDestroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private songService: SongService,
    private readonly route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.allsongs$ = this.songService.getAllSongs();
  }

  // ngOnInit(): void {
  //   console.log("Go here");
  //   this.route.params.pipe(
  //     takeUntil(this.onDestroy$),
  //     distinctUntilChanged()
  //   ).subscribe(params => {
  //     setTimeout(() => {
  //       this.isReady = true;
  //     }, 500);
  //     console.log(this.route.snapshot.data.allsongs.data);
  //     this.allsongs$ = this.route.snapshot.data.allsongs.data;
  //   })
  // }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
