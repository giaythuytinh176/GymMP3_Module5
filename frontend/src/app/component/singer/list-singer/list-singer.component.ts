import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Singer} from 'src/app/model/singer/singer';
import {SingerService} from 'src/app/services/singer/singer.service';

@Component({
  selector: 'app-list-singer',
  templateUrl: './list-singer.component.html',
  styleUrls: ['./list-singer.component.css']
})
export class ListSingerComponent implements OnInit {
  allsingers$: Observable<Singer[]>;
  allsingers: Singer[];

  constructor(
    private singerService: SingerService,
    private router: Router,
    private readonly route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.allsingers = this.route.snapshot.data.getAllSingers.data;
    console.log(this.allsingers);
  }
}
