import {Component, Inject, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TokenStorageService} from "../../auth/token-storage.service";
import {AngularFireStorage} from "@angular/fire/storage";
import {ToastrService} from "ngx-toastr";
import {UpdateInfo} from "../../model/userManager/updateinfo";
import {FirebaseComponent} from "../firebase/firebase.component";
import {Song} from "../../model/song/song";
import {ShowSongsUserComponent} from "../show-songs-user/show-songs-user.component";
import {SongService} from "../../services/song/song.service";
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from "@angular/material/dialog";

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

  constructor(private userService: UserService,
              private storage: AngularFireStorage,
              private route: ActivatedRoute,
              private routes: Router,
              private fb: FormBuilder,
              private token: TokenStorageService,
              private toastr: ToastrService,
              public firebase: FirebaseComponent,
              public showSongsUser: ShowSongsUserComponent,
              private songService: SongService,
              public dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.userService.getInfoUserToken().subscribe((data: any) => {
      console.log(data);
      if (data.status) {
        this.token.signOut();
        this.toastr.warning('You must login to see profile.');
        window.location.reload();
        this.routes.navigate(['/login'])
      } else {
        this.userinfo = data.user;
        this.name = this.userinfo.name;
        this.address = this.userinfo.address;
        this.email = this.userinfo.email;
        this.phone = this.userinfo.phone;
        this.avatar = this.userinfo.avatar;
        this.username = this.userinfo.username;
        this.songService.getSongDetail(this.userinfo.id)
          .subscribe((data: any) => {
            if (data.status) {
              this.token.signOut();
              this.routes.navigate(['/login'])
            } else {
              console.log(data);
              this.songs = data;
            }
          }, error => {
            console.log(error);
          });
        console.log(this.showSongsUser.songs);
      }
    }, error => console.log(error));

  }

  deleteSong(id: number) {
    this.songService.deleteSong(id).subscribe(
      data => {
        console.log(data);
        this.getSongDetail();
        this.toastr.success('Deleted song sucessfully!');
        this.routes.navigate(['/profile']);
      }, error => console.log(error)
    )
  }

  getSongDetail() {
    this.songService.getSongDetail(this.userinfo.id)
      .subscribe((data: any) => {
        if (data.status) {
          this.token.signOut();
          this.routes.navigate(['/login'])
        } else {
          console.log(data);
          this.songs = data;
        }
      }, error => {
        console.log(error);
      });
  }

  openDialog(id: number, nameSong: string): void {
    const dialogRef = this.dialog.open(DialogDeleteMyList, {
      width: '300px',
      data: {id, nameSong},
      panelClass: 'custom-dialog',
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
      <button mat-raised-button color="warn" [mat-dialog-close]="data.id" cdkFocusInitial>Delete</button>
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
}
