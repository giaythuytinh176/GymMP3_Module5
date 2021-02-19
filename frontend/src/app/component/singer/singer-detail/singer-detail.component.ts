import { Component, OnInit } from '@angular/core';
import {Singer} from "../../../model/singer/singer";
import {ActivatedRoute, Router} from "@angular/router";
import {SingerService} from "../../../services/singer/singer.service";

@Component({
  selector: 'app-singer-detail',
  templateUrl: './singer-detail.component.html',
  styleUrls: ['./singer-detail.component.css']
})
export class SingerDetailComponent implements OnInit {
id!:any;
singer!:Singer;

  constructor(
    private route: ActivatedRoute,
    private singerService:SingerService,
    private router: Router
  ) { }

  ngOnInit(): void {
  // @ts-ignore
    this.singer=new Singer();
  this.id=this.route.snapshot.params['id'];
  this.singerService.getSinger(this.id).subscribe((data:any)=>{
    this.singer=data;
  },error => console.log(error));
  }

  list(){
    this.id=this.route.snapshot.params['id'];
    this.router.navigate([])

  }

}
