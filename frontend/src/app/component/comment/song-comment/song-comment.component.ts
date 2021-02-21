import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../services/userManager/user.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TokenStorageService} from '../../../auth/token-storage.service';
import {ToastrService} from 'ngx-toastr';
import {SongService} from '../../../services/song/song.service';
import {SingerService} from '../../../services/singer/singer.service';
import {CategoryService} from '../../../services/category/caterory.service';
import {AlbumService} from '../../../services/album/album.service';
import {transition, trigger, useAnimation} from '@angular/animations';
import {shake} from 'ng-animate';
import {SongComment} from '../../../model/comment/song-comment';
import {SongCommentService} from '../../../services/comment/song-comment.service';

@Component({
  selector: 'app-song-comment',
  templateUrl: './song-comment.component.html',
  styleUrls: ['./song-comment.component.css'],
  animations: [
    trigger('shake', [transition('* => *', useAnimation(shake))])
  ],
})
export class SongCommentComponent implements OnInit {

  createCommentForm: FormGroup;
  shake: any;
  id: number;
  songComment: SongComment;
  commentSong: SongComment[];

  constructor(private userService: UserService,
              private storage: AngularFireStorage,
              private route: ActivatedRoute,
              private routes: Router,
              private fb: FormBuilder,
              private token: TokenStorageService,
              private toastr: ToastrService,
              private songService: SongService,
              private singerService: SingerService,
              private categoryService: CategoryService,
              private albumService: AlbumService,
              private songCommentService: SongCommentService,
  ) {
  }

  ngOnInit(): void {
    this.createForm();
    this.id = +this.route.snapshot.paramMap.get('id');
    this.commentSong = this.route.snapshot.data.getCommentSong;
  }

  reloadSongComment(): void {
    this.songCommentService.getContentSongComment(this.id).subscribe((data) => {
      this.commentSong = data;
    }, error => console.log(error));
  }

  createForm(): void {
    this.createCommentForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      content: ['', [Validators.required]],
    });
  }

  createCommentSubmit(): void {
    if (this.createCommentForm.valid) {
      this.songComment = new SongComment(
        this.createCommentForm.value.name,
        this.createCommentForm.value.email,
        this.createCommentForm.value.content,
        this.id,
      );
      this.createComment(this.songComment, this.id);
    }
  }

  createComment(obj: SongComment, id: number): void {
    this.songCommentService.postCommentSong(obj, id).subscribe((data: any) => {
      this.reloadSongComment();
      this.toastr.success('Your comment has been sent successfully.');
    }, error => {
      this.toastr.warning('Something wrong.');
      console.log(error);
    });
  }
}
