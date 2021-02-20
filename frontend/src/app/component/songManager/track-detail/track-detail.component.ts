import {Pipe, Component, OnInit} from '@angular/core';
import {SongService} from '../../../services/song/song.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryService} from '../../../services/category/caterory.service';
import {SingerService} from '../../../services/singer/singer.service';
import {AlbumService} from '../../../services/album/album.service';
import {FirebaseUpdateSongComponent} from '../../firebase/firebaseUpdateSong/firebaseUpdateSong.component';
import {FirebaseMP3Component} from '../../firebase/firebaseMP3/firebaseMP3.component';
import {UserService} from '../../../services/userManager/user.service';
import {ToastrService} from 'ngx-toastr';
import {FormBuilder} from '@angular/forms';
import {TokenStorageService} from '../../../auth/token-storage.service';
import {MatDialog} from '@angular/material/dialog';
import {Song} from '../../../model/song/song';
import {Track} from 'ngx-audio-player';

@Component({
  selector: 'app-track-detail',
  templateUrl: './track-detail.component.html',
  styleUrls: ['./track-detail.component.css']
})
export class TrackDetailComponent implements OnInit {
  songInfo: Song;
  songSameSinger: Song[];
  tracks1: Track[];

  constructor(private songService: SongService,
              private router: Router,
              private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.songInfo = this.route.snapshot.data.getSongDetailByIdGuest;
    this.songSameSinger = this.route.snapshot.data.getSongSameSingerBySongId;
    this.loadTrackPlaylist();

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
