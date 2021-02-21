import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../services/userManager/user.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
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
    this.songId = +this.route.snapshot.paramMap.get('id');
  }

  likedislike(likedislike: 'like' | 'dislike'): void {
    if (this.authService.checkToken()) {
      this.userService.getInfoUserToken().subscribe((data: any) => {
        if (data.status) {
          this.showWarning();
        } else {
          const userId = data.user.id;
          this.songLikeService.addLikeToSong(userId, this.songId, likedislike).subscribe((data2: any) => {
            console.log('data2', data2);
          }, error => {
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
