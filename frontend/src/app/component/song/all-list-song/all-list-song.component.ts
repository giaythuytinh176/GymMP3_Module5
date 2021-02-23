import {Component, OnDestroy, OnInit} from '@angular/core';
import {SongService} from '../../../services/song/song.service';
import {Song} from '../../../model/song/song';
import {Observable, Subject} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {distinctUntilChanged, takeUntil} from 'rxjs/operators';
import {Playlist} from 'src/app/model/playlist/playlist';
import {PlaylistService} from 'src/app/services/playlist/playlist.service';

@Component({
  selector: 'app-all-list-song',
  templateUrl: './all-list-song.component.html',
  styleUrls: ['./all-list-song.component.css']
})
export class AllListSongComponent implements OnInit, OnDestroy {

  allsongs: Song[];
  getLikesTop10: Song[];
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

  ngOnInit(): void {
    this.allsongs = this.route.snapshot.data.getAllSongs.data;
    this.getLikesTop10 = this.route.snapshot.data.getLikesTop10;

    this.getLastestPlaylists();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

  getLastestPlaylists(): void {
    this.playlistService.getLastestPlaylists().subscribe((data: any) => {
      this.lastestPlaylist = data?.lastRecordData;
    });
  }
}
