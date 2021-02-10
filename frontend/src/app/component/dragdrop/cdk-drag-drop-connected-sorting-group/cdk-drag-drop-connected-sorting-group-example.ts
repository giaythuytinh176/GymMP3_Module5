import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SongService} from "../../../services/song/song.service";
import {Song} from "../../../model/song/song";
import {CdkDragDrop, copyArrayItem, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'cdk-drag-drop-connected-sorting-group-example',
  templateUrl: 'cdk-drag-drop-connected-sorting-group-example.html',
  styleUrls: ['cdk-drag-drop-connected-sorting-group-example.css'],
})
export class CdkDragDropConnectedSortingGroupExample implements OnInit {

  constructor(
    private http: HttpClient,
    private songService: SongService,
  ) {
  }

  idToMove: number;
  listSongs: Song[] = [];
  moveListSongs: Song[] = [];
  dataToMove: Song;

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

      // this.idToMove = event.previousIndex;
      // this.dataToMove = this.listSongs[this.idToDelete];

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

      this.idToMove = event.previousIndex;
      this.dataToMove = this.listSongs[this.idToMove];

      transferArrayItem(
        // copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );




      console.log(this.listSongs);
      console.log(this.moveListSongs);
      console.log('GoHere: ' + 6);
    }
  }
}
