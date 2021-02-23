import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Playlist} from '../../../model/playlist/playlist';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../../auth/token-storage.service';
import {PlaylistService} from '../../../services/playlist/playlist.service';

@Component({
  selector: 'app-dialog-edit-playlist',
  templateUrl: './dialog-edit-playlist.component.html',
  styleUrls: ['./dialog-edit-playlist.component.css']
})
export class DialogEditPlaylistComponent implements OnInit {

  editPlaylistDialogForm: FormGroup;
  shake: any;
  playlist: Playlist;
  user_id: number;
  status: string;


  constructor(
    public dialogRef: MatDialogRef<DialogEditPlaylistComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataEditPlaylist,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private route: Router,
    private token: TokenStorageService,
    private playlistService: PlaylistService,
  ) {
    this.playlist = data.playlist;
    this.user_id = data.user_id;
  }

  ngOnInit(): void {
    this.editPlaylistForm();
  }

  editPlaylistSubmit(): void {
    if (this.editPlaylistDialogForm.valid) {
      const playlistId = this.playlist.id;
      this.playlist = new Playlist(
        this.editPlaylistDialogForm.value.name_playlist,
        this.editPlaylistDialogForm.value.description,
        this.user_id,
        1,
        this.editPlaylistDialogForm.value.status,
      );
      this.editPlaylist(this.playlist, playlistId);
    }
  }

  editPlaylist(pl: Playlist, id: number): void {
    this.playlistService.editPlaylist(pl, id).subscribe((data: any) => {
        if (data.status) {
          this.token.signOut();
          this.route.navigate(['/user/login']);
        } else {
          this.toastr.success('Edit Playlist successfully!');
        }
      }, error => {
        if (error.error) {
          const obj = JSON.parse(error.error);
          if (obj.name_playlist) {
            this.toastr.warning(obj.name_playlist);
          } else if (obj.description) {
            this.toastr.warning(obj.description);
          } else if (obj.user_id) {
            this.toastr.warning(obj.user_id);
          } else if (obj.view) {
            this.toastr.warning(obj.view);
          } else {
            this.toastr.warning('Something wrong.');
          }
        } else {
          this.toastr.warning('Something wrong.');
        }
      }
    );
  }

  editPlaylistForm(): void {
    this.editPlaylistDialogForm = this.fb.group({
      name_playlist: ['', [Validators.required]],
      description: ['', [Validators.required]],
      status: ['', [Validators.required]],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

export interface DialogDataEditPlaylist {
  playlist: Playlist;
  user_id: number;
}
