import {Component, OnDestroy, OnInit} from '@angular/core';
import {SongService} from '../../../services/song/song.service';
import {Song} from '../../../model/song/song';
import {Observable, Subject} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {distinctUntilChanged, takeUntil} from 'rxjs/operators';
import { Playlist } from 'src/app/model/playlist/playlist';
import { PlaylistService } from 'src/app/services/playlist/playlist.service';

@Component({
  selector: 'app-all-list-song',
  templateUrl: './all-list-song.component.html',
  styleUrls: ['./all-list-song.component.css']
})
export class AllListSongComponent implements OnInit, OnDestroy {

  allsongs$: Observable<Song[]>;
  allsongs: Song[];
  lastestPlaylist: Playlist[];
  allplaylist: Playlist[];
  isLoading = false;
  private onDestroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private songService: SongService,
    private playlistService: PlaylistService,
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
    this.allsongs = this.route.snapshot.data.getAllSongs.data;
    this.getLastestPlaylists();
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

  getLastestPlaylists(): void {
    this.playlistService.getLastestPlaylists().subscribe((data: any) => {
      this.lastestPlaylist = data?.lastRecordData;
      console.log(data);
    });
  }
}
