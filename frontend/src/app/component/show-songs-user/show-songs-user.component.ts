import {Component, Inject, OnInit} from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {TokenStorageService} from 'src/app/auth/token-storage.service';
import {UpdateInfo} from 'src/app/model/userManager/updateinfo';
import {UserService} from 'src/app/services/user.service';
import {FirebaseComponent} from '../firebase/firebase.component';
import {SongService} from '../../services/song/song.service';
import {Song} from '../../model/song/song';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-show-songs-user',
  templateUrl: './show-songs-user.component.html',
  styleUrls: ['./show-songs-user.component.css']
})
export class ShowSongsUserComponent implements OnInit {

  songs: Song[];
  success: string;
  fail: string;
  username: string;
  isUpdate = false;
  isUpdateFailed = false;
  songsinfo!: Song;
  userInfor!: UpdateInfo;

  constructor(private userService: UserService,
              private songService: SongService,
              private storage: AngularFireStorage,
              private route: ActivatedRoute,
              private routes: Router,
              private fb: FormBuilder,
              private token: TokenStorageService,
              private toastr: ToastrService,
              public firebase: FirebaseComponent,
              public dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.userService.getInfoUserToken().subscribe((data: any) => {
      console.log(data);
      if (data.status) {
        this.token.signOut();
        this.toastr.warning('You must login to see list songs.');
      } else {
        this.userInfor = data.user;
        this.getSongDetail();
      }
    }, error => console.log(error));

  }

  getSongDetail() {
    this.songService.getSongDetail(this.userInfor.id)
      .subscribe((data: any) => {
        if (data.status) {
          this.token.signOut();
        } else {
          console.log(data);
          this.songs = data;
        }
      }, error => {
        console.log(error);
        this.isUpdate = false;
        this.isUpdateFailed = true;
      });
  }

  deleteSong(id: number) {
    this.songService.deleteSong(id).subscribe(
      data => {
        console.log(data);
        this.getSongDetail();
        this.toastr.success('Deleted sucessfully.');
        this.routes.navigate(['/listsongs']);
      }, error => console.log(error)
    )
  }

  openDialog(id: number, nameSong: string): void {
    const dialogRef = this.dialog.open(DialogContentExampleDialog, {
      width: '300px',
      data: {id, nameSong}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.title = result;
      if (result) {
        this.deleteSong(id);
      }
      console.log(result);
    });
  }
}


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dialog-content-example-dialog',
  template: `
    <div mat-dialog-content class="mat-typography">
      <p>Do you want to delete <strong>{{ data.nameSong }}</strong>?</p>
    </div>
    <div mat-dialog-actions>
      <button mat-raised-button color="warn" [mat-dialog-close]="data.id" cdkFocusInitial>Xoá</button>
      <button mat-stroked-button color="basic" (click)="onNoClick()">Thoát</button>
    </div>
  `,
})
// tslint:disable-next-line:component-class-suffix
export class DialogContentExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogContentExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}


export interface DialogData {
  id: number;
  nameSong: string;
}
