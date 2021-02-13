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
  isLoading = false;

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

  ngOnInit(): void {
    this.isLoading = true;
    console.log(1);
    this.getUserInfo();

    this.songs = this.route.snapshot.data.getSongByUserID;

    // this.getSongDetailById(this.userinfo.id);

  }

  getSongDetailById(id: number): void {
    this.allsongs$ = this.songService.getSongByUserID(id);
    // this.songService.getSongByUserID(id).subscribe((data: any) => {
    //   if (data.status) {
    //     this.token.signOut();
    //     this.routes.navigate(['/user/login'])
    //   } else {
    console.log(3);
    this.isLoading = false;
    //     // console.log(data);
    //     this.songs = data;
    //   }
    // }, error => {
    //   console.log(error);
    // });
  }

  getUserInfo(): void {
    this.userinfo = this.route.snapshot.data.getUserInfo.user;
    this.name = this.userinfo.name;
    this.address = this.userinfo.address;
    this.email = this.userinfo.email;
    this.phone = this.userinfo.phone;
    this.avatar = this.userinfo.avatar;
    this.username = this.userinfo.username;
    console.log(2);
  }

  deleteSong(id: number, user_id: number): void {
    this.songService.deleteSong(id, user_id).subscribe(
      data => {
        // console.log(data);
        this.getSongByUserID();
        this.toastr.success('Deleted song sucessfully!');
        this.routes.navigate(['/user/profile', this.userinfo.id]);
      }, error => console.log(error)
    );
  }

  getSongByUserID() {
    this.songService.getSongByUserID(this.userinfo.id)
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
