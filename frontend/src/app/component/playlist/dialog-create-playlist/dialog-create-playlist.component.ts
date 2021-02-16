import {Component, Inject, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../../auth/token-storage.service';
import {Playlist} from '../../../model/playlist/playlist';
import {PlaylistService} from '../../../services/playlist/playlist.service';
import {transition, trigger, useAnimation} from '@angular/animations';
import {shake} from 'ng-animate';

@Component({
  selector: 'app-dialog-create-playlist',
  templateUrl: './dialog-create-playlist.component.html',
  styleUrls: ['./dialog-create-playlist.component.css'],
  animations: [
    trigger('shake', [transition('* => *', useAnimation(shake))])
  ],
})
export class DialogCreatePlaylistComponent implements OnInit {

  createPlaylistDialogForm: FormGroup;
  shake: any;
  playlist: Playlist;
  user_id: number;
  // @Input('cdkTextareaAutosize') enabled = false;

  constructor(
    public dialogRef: MatDialogRef<DialogCreatePlaylistComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataCreatePlaylist,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private route: Router,
    private token: TokenStorageService,
    private playlistService: PlaylistService,
  ) {
    // console.log(data);
    this.user_id = data.user_id;
  }

  ngOnInit(): void {
    this.createPlaylistForm();

  }

  createPlaylistSubmit(): void {
    if (this.createPlaylistDialogForm.valid) {
      this.playlist = new Playlist(
        this.createPlaylistDialogForm.value.name_playlist,
        this.createPlaylistDialogForm.value.description,
        this.user_id,
        1,
      );
      // console.log(this.playlist);
      this.createPlaylist(this.playlist);
    }
  }

  createPlaylist(pl: Playlist): void {
    this.playlistService.createPlaylist(pl).subscribe((data: any) => {
        // console.log(data);
        if (data.error || data.status) {
          this.token.signOut();
          this.toastr.warning('You must login to create Playlist.');
          this.route.navigate(['/user/login']);
        } else {
          console.log('Add Playlist successfully!', data);
          this.toastr.success('Add Playlist successfully!');
        }
      }, error => {
        console.log(error);
        if (error.error) {
          if (JSON.parse(error.error).name_playlist) {
            this.toastr.warning(JSON.parse(error.error).name_playlist);
          } else if (JSON.parse(error.error).description) {
            this.toastr.warning(JSON.parse(error.error).description);
          } else if (JSON.parse(error.error).user_id) {
            this.toastr.warning(JSON.parse(error.error).user_id);
          } else if (JSON.parse(error.error).view) {
            this.toastr.warning(JSON.parse(error.error).view);
          } else {
            this.toastr.warning('Something wrong.');
          }
        } else {
          this.toastr.warning('Something wrong.');
        }
      }
    );
  }

  createPlaylistForm(): void {
    this.createPlaylistDialogForm = this.fb.group({
      name_playlist: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

export interface DialogDataCreatePlaylist {
  name_playlist: string;
  description: string;
  user_id: number;
  view: number;
}
