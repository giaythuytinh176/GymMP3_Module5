import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SongService} from "../../../services/song/song.service";
import {Song} from "../../../model/song/song";
import {CdkDragDrop, copyArrayItem, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

/**
 * @title Drag&Drop connected sorting group
 */
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

  listSongs: Song[] = [];
  moveListSongs: Song[] = [];
  idToDelete: number;
  dataToDelete: Song;

  ngOnInit(): void {
    this.songService.getAllSongs().subscribe((data: any) => {
        this.listSongs = data.data;
        // console.log(this.listSongs);
      },
      (error: any) => console.log(error)
    );
  }

  todo = [
    'Get to work',
    'Pick up groceries',
    'Go home',
    'Fall asleep'
  ];

  done = [
    'Get up',
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
    'Walk dog'
  ];

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

      this.idToDelete = event.previousIndex;
      this.dataToDelete = this.listSongs[this.idToDelete];


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

export interface ISong {
  album_id: number;
  author: string;
  avatarUrl: string;
  category_id: number;
  describes: string;
  id: number;
  mp3Url: string;
  nameSong: string;
  singers: [];
  user_id: number;
  views: number;
}

/**  Copyright 2020 Google LLC. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license */
