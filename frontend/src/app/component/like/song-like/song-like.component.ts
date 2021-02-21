import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../../../services/userManager/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenStorageService} from '../../../auth/token-storage.service';
import {ToastrService} from 'ngx-toastr';
import {SongLikeService} from '../../../services/like/song-like.service';
import {AuthService} from '../../../auth/auth.service';

@Component({
  selector: 'app-song-like',
  templateUrl: './song-like.component.html',
  styleUrls: ['./song-like.component.css']
})
export class SongLikeComponent implements OnInit {

  songId: number;
  userId: number;
  getLikeDislike: ILikeDislike;
  @Input() songIdInput: number;

  constructor(private route: ActivatedRoute,
              private routes: Router,
              private token: TokenStorageService,
              private toastr: ToastrService,
              private songLikeService: SongLikeService,
              private userService: UserService,
              private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    // this.songId = +this.route.snapshot.paramMap.get('id');
    // this.getLikeDislike = this.route.snapshot.data.getLikeDislike;
    this.reloadLikeDislike();
  }

  reloadLikeDislike(): void {
    this.songLikeService.getLikeDisLike(this.songIdInput).subscribe((data: ILikeDislike) => {
      this.getLikeDislike = data;
    }, error => console.log(error));
  }

  likedislike(likedislike: 'like' | 'dislike'): void {
    if (this.authService.checkToken()) {
      this.userService.getInfoUserToken().subscribe((data: any) => {
        if (data.status) {
          this.showWarning();
        } else {
          this.songLikeService.addLikeToSong(data.user.id, this.songIdInput, likedislike).subscribe((dt: any) => {
            this.reloadLikeDislike();
          }, error => {
            this.toastr.warning('Something wrong.');
            console.log(error);
          });
        }
      }, error => {
        this.toastr.warning('Something wrong.');
        console.log(error);
      });
    } else {
      this.showWarning();
    }
  }

  showWarning(): void {
    this.toastr.warning('You must login to like/dislike to this song.');
  }

}

export interface ILikeDislike {
  song_id: number;
  like: number;
  dislike: number;
}
