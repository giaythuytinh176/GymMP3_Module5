import {Component, OnDestroy, OnInit} from '@angular/core';
import {SongService} from '../../../services/song/song.service';
import {Song} from '../../../model/song/song';
import {Observable, Subject} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {distinctUntilChanged, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-showmore-song-lastest',
  templateUrl: './showmore-song-lastest.component.html',
  styleUrls: ['./showmore-song-lastest.component.css']
})
export class ShowmoreSongLastestComponent implements OnInit, OnDestroy {

  showmoreSongLastest: Observable<Song[]> ;
  allsongs$: Observable<Song[]>;
  allsongs: Song[];
  isLoading = false;
  private onDestroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private songService: SongService,
    private readonly route: ActivatedRoute,
  ) {
  }

  // ngOnInit(): void {
  //   this.allsongs$ = this.songService.getAllSongs();
  // }

  // ngOnInit(): void {
  //   console.log(1);
  //   // this.isLoading = true;
  //   // this.songService.getAllSongs().subscribe((res: any) => {
  //   //   this.allsongs = res.data;
  //   //   this.isLoading = false;
  //   //   console.log(2);
  //   //   // console.log(this.allsongs);
  //   // }, (error) => console.log(error));
  // }

  ngOnInit(): void {
    console.log('Go here');
    this.getShowmoreSongLastest();
    // this.allsongs = this.route.snapshot.data.getAllSongs.data;
    // this.route.params.pipe(
    //   takeUntil(this.onDestroy$),
    //   distinctUntilChanged()
    // ).subscribe((params: any) => {
    //   console.log(this.route.snapshot.data.getAllSongs);
    //   this.allsongs = this.route.snapshot.data.getAllSongs.data;
    // }, (error: any) => console.log(error));
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

  getShowmoreSongLastest(){
    this.songService.getShowmoreSongLastest().subscribe((data:any)=>{
      this.showmoreSongLastest=data.lastRecordData;
      this.isLoading=false;
    })
  }

  // toggleTag(){
  //   this.lastestSong=!this.lastestSong
  //
  // }
}
