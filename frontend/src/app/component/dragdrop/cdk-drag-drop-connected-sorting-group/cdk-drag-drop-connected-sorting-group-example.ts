import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component, DoCheck,
  OnChanges,
  OnInit
} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SongService} from '../../../services/song/song.service';
import {Song} from '../../../model/song/song';
import {CdkDragDrop, copyArrayItem, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {UserService} from '../../../services/userManager/user.service';
import {ToastrService} from 'ngx-toastr';
import {TokenStorageService} from '../../../auth/token-storage.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UpdateInfo} from '../../../model/userManager/updateinfo';
import {Observable} from 'rxjs';

@Component({
  selector: 'cdk-drag-drop-connected-sorting-group-example',
  templateUrl: 'cdk-drag-drop-connected-sorting-group-example.html',
  styleUrls: ['cdk-drag-drop-connected-sorting-group-example.css'],
})
export class CdkDragDropConnectedSortingGroupExample implements OnInit {

  idAfterMove: number;
  idBeforeMove: number;
  listSongs: Song[] = [];
  moveListSongs: Song[] = [];
  dataToMove: Song;
  userinfo!: UpdateInfo;
  song: Song;
  isLoading = false;
  isLoadingFirst = false;

  constructor(
    private http: HttpClient,
    private songService: SongService,
    private userService: UserService,
    private toastr: ToastrService,
    private token: TokenStorageService,
    private routes: Router,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.isLoadingFirst = true;
    console.log(1);
    this.userinfo = this.route.snapshot.data.getUserInfo.user;
    this.getListSongsByID(this.userinfo.id);
    this.moveListSongs = this.route.snapshot.data.getAllMovedSongs.data;
    /// this.getUserInfo();
    // this.getAllSongs();
    // this.getMovedSongs();
  }

  getListSongsByID(id: number): void {
    this.songService.getSongDetailV2(id).subscribe((data: any) => {
        this.listSongs = data;
        console.log(3);
        this.isLoadingFirst = false;
        // console.log(this.listSongs);
      },
      (error: any) => console.log(error)
    );
  }

  getListSongsByID2(id: number): void {
    this.songService.getSongDetailV2(id).subscribe((data: any) => {
        this.listSongs = data;
        console.log(5);
        this.isLoading = false;
        this.toastr.success('Move song successfully!');
        // console.log(this.listSongs);
      },
      (error: any) => console.log(error)
    );
  }

  getMovedSongs(): void {
    this.songService.getMovedSongs().subscribe((data: any) => {
        this.moveListSongs = data.data;
        console.log(6);
        // console.log(this.moveListSongs);
      },
      (error: any) => console.log(error)
    );
  }

  getUserInfo(): void {
    this.userService.getInfoUserToken().subscribe((data: any) => {
      // console.log(data);
      if (data.status) {
        this.toastr.warning('You must login to move song.');
        this.token.signOut();
        this.routes.navigate(['/user/login']);
      } else {
        console.log(2);
        this.userinfo = data.user;
        setTimeout(() => {
          this.getListSongsByID(this.userinfo.id);
        }, 0);
      }
    }, error => console.log(error));
  }

  getUserInfo2(): void {
    this.userService.getInfoUserToken().subscribe((data: any) => {
      // console.log(data);
      if (data.status) {
        this.toastr.warning('You must login to move song.');
        this.token.signOut();
        this.routes.navigate(['/user/login']);
      } else {
        this.userinfo = data.user;
        console.log(4);
        this.getListSongsByID2(this.userinfo.id);
      }
    }, error => console.log(error));
  }

  getAllSongs(): void {
    this.songService.getAllSongs().subscribe((data: any) => {
        this.listSongs = data.data;
        // console.log(this.listSongs);
      },
      (error: any) => console.log(error)
    );
  }

  createMovedSong(song: Song): void {
    this.songService.createMovedSong(song).subscribe((data: any) => {
        console.log(data);
        if (data.error || data.status) {
          this.token.signOut();
          this.toastr.warning('You must login to move song.');
        } else {
          console.log(3);
          this.getUserInfo2();
          // this.getAllSongs();
          this.getMovedSongs();
        }
      }, error => {
        console.log(error);
        this.toastr.warning('Something wrong.');
      }
    );
  }

  createSong(song: Song): void {
    this.songService.createSong(song).subscribe((data: any) => {
        console.log(data);
        if (data.error || data.status) {
          this.token.signOut();
          this.toastr.warning('You must login to move song.');
        } else {
          this.getUserInfo2();
          // this.getAllSongs();
          this.getMovedSongs();
        }
      }, error => {
        console.log(error);
        this.toastr.warning('Something wrong.');
      }
    );
  }

  drop(event: CdkDragDrop<Song[]>): void {

    this.toastr.success('Moving song ...');

    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      const lengthBeforeMove = this.listSongs.length;

      transferArrayItem(
        // copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      const lengthAfterMove = this.listSongs.length;

      this.idAfterMove = event.currentIndex;
      this.idBeforeMove = event.previousIndex;
      this.isLoading = true;

      if (lengthBeforeMove > lengthAfterMove) {
        console.log(1);
        this.dataToMove = this.moveListSongs[event.currentIndex];
        console.log('data1', this.dataToMove.id, this.userinfo.id);
        this.songService.deleteSong(this.dataToMove.id, this.userinfo.id).subscribe(
          (data: any) => {
            // console.log(data);
            // this.toastr.success('Deleted song successfully!');
            console.log(2);

            const singerIdList = [];
            for (const singerId of this.dataToMove.singers) {
              singerIdList.push(singerId.id);
            }

            this.song = this.dataToMove;
            this.song.singer_id = JSON.stringify(singerIdList);
            this.song.user_id = this.userinfo.id;
            // console.log(this.song);
            this.createMovedSong(this.song);

          }, error => console.log(error)
        );
      } else if (lengthBeforeMove < lengthAfterMove) {
        this.dataToMove = this.listSongs[event.currentIndex];
        console.log('data2', this.dataToMove.id, this.userinfo.id);
        this.songService.deleteMovedSong(this.dataToMove.id, this.userinfo.id).subscribe(
          (data: any) => {
            // console.log(data);
            // this.toastr.success('Deleted song successfully!');

            const singerIdList = [];
            for (const singerId of this.dataToMove.singers) {
              singerIdList.push(singerId.id);
            }

            this.song = this.dataToMove;
            this.song.singer_id = JSON.stringify(singerIdList);
            this.song.user_id = this.userinfo.id;
            // console.log(this.song);
            this.createSong(this.song);

          }, error => console.log(error)
        );
      }
    }
  }
}
