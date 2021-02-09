import {Component, OnDestroy, OnInit} from '@angular/core';
import {SongService} from "../../../services/song/song.service";
import {Song} from "../../../model/song/song";
import {Subject} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-all-list-song',
  templateUrl: './all-list-song.component.html',
  styleUrls: ['./all-list-song.component.css']
})
export class AllListSongComponent implements OnInit, OnDestroy {

  allsongs: Song[];
  private onDestroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private songService: SongService,
    private readonly route: ActivatedRoute
  ) {
  }

  getSongs(): void {
    this.songService.getAllSongs().subscribe((res: any) => {
      this.allsongs = res.data;
      // console.log(this.allsongs);
    }, (error) => console.log(error));
  }

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.onDestroy$)).subscribe((params: any) => {
      this.getSongs();
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
