import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Singer } from 'src/app/model/singer/singer';
import { Song } from 'src/app/model/song/song';
import { SingerService } from 'src/app/services/singer/singer.service';
import { SongService } from 'src/app/services/song/song.service';

@Component({
  selector: 'app-singer-detail',
  templateUrl: './singer-detail.component.html',
  styleUrls: ['./singer-detail.component.css']
})
export class SingerDetailComponent implements OnInit {
  id: number;
  singer: Singer;
  songOfSinger: Song[];
  auth: boolean;
  
  constructor(
    private songService: SongService,
    private router: Router,
    private singerService: SingerService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.singer = this.route.snapshot.data.getSingerInfor;
    console.log(this.singer);
    this.songOfSinger = this.route.snapshot.data.getShowSongSinger;
    console.log(this.songOfSinger);
    this.id = +this.route.snapshot.paramMap.get('id');
    console.log(this.id);
  }

  getSongOfSong(): void {
    this.singerService.getShowSongSinger(this.id)
      .subscribe((data: any) => {
         
          this.songOfSinger = data;
          console.log(data);
        }, error => {
        console.log(error);
      });
  }
}
