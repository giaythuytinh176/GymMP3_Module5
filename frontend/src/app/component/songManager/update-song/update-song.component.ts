import { Component, OnInit } from '@angular/core';
import {SongService} from "../../../services/song.service";
import {Song} from "../../../song/song";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-update-song',
  templateUrl: './update-song.component.html',
  styleUrls: ['./update-song.component.css']
})
export class UpdateSongComponent implements OnInit {
  song: Song;
  user_id: any;
  singer_id: any;
  category_id: any;
  album_id: any;
  songForm: FormGroup
  constructor(private songService:SongService,
              private route:Router,
              private routes:ActivatedRoute) {
    this.songForm = new FormGroup ({
      nameSong: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
    console.log(111);
    this.routes.paramMap.subscribe(paramMap => {
      const id = +paramMap.get('id');
      this.songService.getSongById(id).subscribe(
        data => {
          this.song = data;
          console.log(this.song);
        },
        error => {
          this.song = null;
        }
      );
    });
  }

  updateSong() {
    console.log(this.song);
    this.songService.updateSong(this.song).subscribe(next => {
      alert('Bạn đã Sửa thành công bài hát');
      this.route.navigate(['/list-song']);
      console.log(next);
    }, error => {
      console.log(error),
        alert('Bạn chưa Sửa thành công');
    });
  }

}
