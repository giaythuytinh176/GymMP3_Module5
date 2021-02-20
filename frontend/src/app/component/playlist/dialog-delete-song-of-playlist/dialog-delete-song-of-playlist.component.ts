import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Playlist} from '../../../model/playlist/playlist';
import {Song} from '../../../model/song/song';

@Component({
  selector: 'app-dialog-delete-song-of-playlist',
  templateUrl: './dialog-delete-song-of-playlist.component.html',
  styleUrls: ['./dialog-delete-song-of-playlist.component.css']
})
export class DialogDeleteSongOfPlaylistComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogDeleteSongOfPlaylistComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { song_id: number, nameSong: string, user_id: string },
    public dialog: MatDialog,
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
