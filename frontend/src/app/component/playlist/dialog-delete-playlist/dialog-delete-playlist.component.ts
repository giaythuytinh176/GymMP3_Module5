import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Playlist} from '../../../model/playlist/playlist';
import {DialogDeleteSongComponent} from '../../song/delete-song/dialog-delete-song/dialog-delete-song.component';

@Component({
  selector: 'app-dialog-delete-playlist',
  templateUrl: './dialog-delete-playlist.component.html',
  styleUrls: ['./dialog-delete-playlist.component.css']
})
export class DialogDeletePlaylistComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogDeletePlaylistComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Playlist,
    public dialog: MatDialog,
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
