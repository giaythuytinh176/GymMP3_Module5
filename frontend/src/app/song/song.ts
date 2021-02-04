export class Song {
  id!: number;
  nameSong!:string;
  avatarUrl!:string;
  mp3Url!:string;
  describes!:string;
  author!:string;
  views!:number;
  user_id!:number;
  singer_id!:number;
  category_id!:number;
  album_id!:number;

  constructor(nameSong:string,avatarUrl:string,mp3Url:string,describes:string,author:string,
              views:number,user_id:number, singer_id:number,category_id:number,album_id:number) {
    this.nameSong=nameSong;
    this.avatarUrl=avatarUrl;
    this.mp3Url=mp3Url;
    this.describes=describes;
    this.author=author;
    this.views=views;
    this.user_id=user_id;
    this.singer_id=singer_id;
    this.category_id=category_id;
    this.album_id=album_id;
  }
}
