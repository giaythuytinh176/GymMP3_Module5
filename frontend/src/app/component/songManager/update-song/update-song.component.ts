<<<<<<< HEAD
import {Component, OnInit} from '@angular/core';
=======
import { Component, OnInit } from '@angular/core';
import {SongService} from "../../../services/song.service";
import {Song} from "../../../song/song";
>>>>>>> e69b538d68601004c425fe92b2324963dd22f113
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CategoryService} from "../../../services/category/caterory.service";
import {SingerService} from "../../../services/singer/singer.service";
import {AlbumService} from "../../../services/album/album.service";
<<<<<<< HEAD
import {environment} from 'src/environments/environment';
import {FirebaseComponent} from "../../firebase/firebase.component";
import {Album} from "../../../model/album";
import {Category} from "../../../model/category";
import {Singer} from "../../../model/singer";
import {FirebaseMP3Component} from "../../firebaseMP3/firebaseMP3.component";
import {SongService} from "../../../services/song/song.service";
import {Song} from "../../../model/song/song";
=======
import { environment } from 'src/environments/environment';
import {Album} from "../../../album";
import {Category} from "../../../category";
import {Singer} from "../../singer";
import {FirebaseComponent} from "../../firebase/firebase.component";
>>>>>>> e69b538d68601004c425fe92b2324963dd22f113

@Component({
  selector: 'app-update-song',
  templateUrl: './update-song.component.html',
  styleUrls: ['./update-song.component.css']
})
export class UpdateSongComponent implements OnInit {
<<<<<<< HEAD
=======
  private readonly API_URL_CREATE = environment.apiUrl + '/song/update';
>>>>>>> e69b538d68601004c425fe92b2324963dd22f113
  updateMusicForm: FormGroup
  albums: Album[];
  categories: Category[];
  singers: Singer[];
  song: Song;
  user_id: any;
  singer_id: any;
  category_id: any;
  album_id: any;
  songForm: FormGroup
<<<<<<< HEAD
  private readonly API_URL_CREATE = environment.apiUrl + '/song/update';

  constructor(private songService: SongService,
              private route: Router,
              private routes: ActivatedRoute,
              private categoryService: CategoryService,
              private singerService: SingerService,
              private albumService: AlbumService,
              public firebase: FirebaseComponent,
              public firebaseMP3: FirebaseMP3Component,
  ) {
    this.songForm = new FormGroup({
=======
  constructor(private songService:SongService,
              private route:Router,
              private routes:ActivatedRoute,
              private categoryService:CategoryService,
              private singerService:SingerService,
              private albumService: AlbumService,
              private firebase: FirebaseComponent,
  ) {
    this.songForm = new FormGroup ({
>>>>>>> e69b538d68601004c425fe92b2324963dd22f113
      nameSong: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
    this.albumService.getAllAlbum().subscribe((albums: any) => {
      this.albums = albums.data;
      console.log(this.albums);
    }, (error) => console.log(error));
    this.categoryService.getAllCategories().subscribe((categories: any) => {
      this.categories = categories.data;
      console.log(this.categories);
    }, (error) => console.log(error));
    this.singerService.getAllSingers().subscribe((singers: any) => {
      this.singers = singers.data;
      console.log(this.singers);
    }, (error) => console.log(error));
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
