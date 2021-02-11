import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SongService} from '../../../services/song/song.service';
import {Song} from '../../../model/song/song';
import {CdkDragDrop, copyArrayItem, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'cdk-drag-drop-connected-sorting-group-example',
  templateUrl: 'cdk-drag-drop-connected-sorting-group-example.html',
  styleUrls: ['cdk-drag-drop-connected-sorting-group-example.css'],
})
export class CdkDragDropConnectedSortingGroupExample implements OnInit {

  listSongs: Song[] = [];
  moveListSongs: Song[] = [];
  dataToMove: Song;

  constructor(
    private http: HttpClient,
    private songService: SongService,
  ) {
  }

  ngOnInit(): void {
    this.songService.getAllSongs().subscribe((data: any) => {
        this.listSongs = data.data;
        // console.log(this.listSongs);
      },
      (error: any) => console.log(error)
    );
  }

  drop(event: CdkDragDrop<Song[]>) {
    console.log('GoHere: ' + 0);
    console.log(event);

    if (event.previousContainer === event.container) {
      console.log('GoHere: ' + 1);
      console.log(event.container.data);
      console.log(event.previousIndex);
      console.log(event.currentIndex);
      console.log('GoHere: ' + 2);

      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      console.log(this.listSongs);
      console.log(this.moveListSongs);
      console.log('GoHere: ' + 3);
    } else {
      console.log('GoHere: ' + 4);
      console.log(event.previousContainer.data);
      console.log(event.container.data);
      console.log(event.previousIndex);
      console.log(event.currentIndex);
      console.log('GoHere: ' + 5);

      const lengthBeforeMove = this.listSongs.length;

      transferArrayItem(
      // copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      const lengthAfterMove = this.listSongs.length;

      if (lengthBeforeMove > lengthAfterMove) {
        this.dataToMove = this.moveListSongs[event.currentIndex];
      } else if (lengthBeforeMove < lengthAfterMove) {
        this.dataToMove = this.listSongs[event.currentIndex];
      }

      console.log(lengthBeforeMove);
      console.log(lengthAfterMove);

      console.log(this.listSongs);
      console.log(this.moveListSongs);
      console.log('GoHere: ' + 6);
    }
  }
}
