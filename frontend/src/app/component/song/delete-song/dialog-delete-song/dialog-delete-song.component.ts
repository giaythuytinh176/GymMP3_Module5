import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dialog-content-example-dialog',
  styleUrls: ['dialog-delete-song.component.css'],
  templateUrl: 'dialog-delete-song.component.html',
})

export class DialogDeleteSongComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogDeleteSongComponent>,
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
