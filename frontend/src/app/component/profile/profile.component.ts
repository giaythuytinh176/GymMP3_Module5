import {Component, Inject, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TokenStorageService} from "../../auth/token-storage.service";
import {AngularFireStorage} from "@angular/fire/storage";
import {ToastrService} from "ngx-toastr";
import {UpdateInfo} from "../../model/userManager/updateinfo";
import {FirebaseComponent} from "../firebase/firebase.component";
import {Song} from "../../model/song/song";
import {SongService} from "../../services/song/song.service";
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from "@angular/material/dialog";
import {UserService} from "../../services/userManager/user.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: UpdateInfo;
  userinfo!: UpdateInfo;
  name: string;
  address: string;
  email: string;
  phone: string;
  avatar: string;
  username: string;
  songs: Song[];
  allsongs$: Observable<Song[]>;

  constructor(private userService: UserService,
              private storage: AngularFireStorage,
              private route: ActivatedRoute,
              private routes: Router,
              private fb: FormBuilder,
              private token: TokenStorageService,
              private toastr: ToastrService,
              public firebase: FirebaseComponent,
              private songService: SongService,
              public dialog: MatDialog,
  ) {
  }


  ngAfterViewChecked() {
    // console.log(7);
    // console.log(window.localStorage.getItem('mep-currentTime'));
    // console.log(window.localStorage.getItem('mep-status'));
    // window.localStorage.getItem('mep-status');
  }

  ngOnInit(): void {
    this.getUserInfo();
  }

  getSongDetailbyID(id: number): void {
    this.allsongs$ = this.songService.getSongDetail(id);
    this.songService.getSongDetail(id).subscribe((data: any) => {
      if (data.status) {
        this.token.signOut();
        this.routes.navigate(['/user/login'])
      } else {
        // console.log(data);
        this.songs = data;
      }
    }, error => {
      console.log(error);
    });
  }

  getUserInfo(): void {
    this.userService.getInfoUserToken().subscribe((data: any) => {
      // console.log(data);
      if (data.status) {
        this.toastr.warning('You must login to see profile.');
        this.token.signOut();
        this.routes.navigate(['/user/login'])
      } else {
        this.userinfo = data.user;
        this.name = this.userinfo.name;
        this.address = this.userinfo.address;
        this.email = this.userinfo.email;
        this.phone = this.userinfo.phone;
        this.avatar = this.userinfo.avatar;
        this.username = this.userinfo.username;
        this.getSongDetailbyID(this.userinfo.id);
      }
    }, error => console.log(error));
  }

  deleteSong(id: number, user_id: number) {
    this.songService.deleteSong(id, user_id).subscribe(
      data => {
        // console.log(data);
        this.getSongDetail();
        this.toastr.success('Deleted song sucessfully!');
        this.routes.navigate(['/user/profile']);
      }, error => console.log(error)
    )
  }

  getSongDetail() {
    this.songService.getSongDetail(this.userinfo.id)
      .subscribe((data: any) => {
        if (data.status) {
          this.token.signOut();
          this.routes.navigate(['/user/login'])
        } else {
          // console.log(data);
          this.songs = data;
        }
      }, error => {
        console.log(error);
      });
  }

  openDialog(id: number, nameSong: string, user_id: number): void {
    const dialogRef = this.dialog.open(DialogDeleteMyList, {
      width: '300px',
      data: {id, nameSong, user_id},
      panelClass: 'custom-dialog',
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      // this.title = result;
      if (result) {
        this.deleteSong(id, user_id);
      }
      // console.log(result);
    });
  }
}

@Component({
  selector: 'dialog-content-example-dialog',
  template: `
    <div mat-dialog-content class="mat-typography">
      <p>Do you want to delete <strong>{{ data.nameSong }}</strong>?</p>
    </div>
    <div mat-dialog-actions>
      <button mat-raised-button color="accent" [mat-dialog-close]="data.id" cdkFocusInitial>Delete</button>
      <button mat-stroked-button color="basic" (click)="onNoClick()">Cancel</button>
    </div>
  `,
})

export class DialogDeleteMyList {
  constructor(
    public dialogRef: MatDialogRef<DialogDeleteMyList>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

export interface DialogData {
  id: number;
  nameSong: string;
  user_id: number;
}
