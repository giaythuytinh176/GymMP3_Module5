import {Component, OnInit} from '@angular/core';
import {Playlist} from '../../../model/playlist/playlist';
import {Subject} from 'rxjs';
import {PlaylistService} from '../../../services/playlist/playlist.service';
import {Router} from '@angular/router';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-search-playlist',
  templateUrl: './search-playlist.component.html',
  styleUrls: ['./search-playlist.component.css']
})
export class SearchPlaylistComponent implements OnInit {
  playlists!: Playlist[];

  search!: any;
  count!: any;
  isSearch = false;
  search$ = new Subject<string>();
  keywordEnter = false;

  constructor(
    private playlistService: PlaylistService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.search$.pipe(
      // throttleTime(300),
      debounceTime(300),
      distinctUntilChanged(),
      // concatMap(value =>
      switchMap(value =>
        this.playlistService.searchPlaylist1(value)
      )
    ).subscribe(
      (next) => {
        this.playlists = next || [];
        console.log(this.playlists);
        if (next.keyword) {
          this.keywordEnter = true;
          this.isSearch = false;
        } else {
          this.isSearch = true;
          this.keywordEnter = false;
        }
        this.count = next?.length;
        // console.log(this.song);

      });
  }

}
