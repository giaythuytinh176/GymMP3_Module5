import {Component, OnInit} from '@angular/core';
import {DialogCreatePlaylistComponent} from '../dialog-create-playlist/dialog-create-playlist.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-create-playlist',
  templateUrl: './create-playlist.component.html',
  styleUrls: ['./create-playlist.component.css']
})
export class CreatePlaylistComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:variable-name
  openDialogPlaylist(user_id: number): void {
    const dialogRef = this.dialog.open(DialogCreatePlaylistComponent, {
      width: '456px',
      data: {
        user_id,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log('result', result);
      if (result === undefined) {
      } else if (result.valid) {
        console.log(result);
        // this.notFoundCategory = false;
        // this.createMusicForm.get('myControl_category').reset();
        // this.categoryService.getAllCategories().subscribe((res: any) => {
        //   this.categories = res.data;
        // });
      }
    });
  }
}
