export class Song {
  id?: number;
  nameSong?: string;
  avatarUrl?: string;
  mp3Url?: string;
  describes?: string;
  author?: string;
  views?: string;
  user_id?: any;
  singer_id?: any;
  category_id?: any;
  album_id?: any;

  constructor(
    id: number,
    nameSong: string,
    avatarUrl: string,
    mp3Url: string,
    describes: string,
    author: string,
    views: string,
    user_id: any,
    singer_id: any,
    category_id: any,
    album_id: any,
  ) {
    this.id = id;
    this.nameSong = nameSong;
    this.avatarUrl = avatarUrl;
    this.mp3Url = mp3Url;
    this.describes = describes;
    this.author = author;
    this.views = views;
    this.user_id = user_id;
    this.singer_id = singer_id;
    this.category_id = category_id;
    this.album_id = album_id;
  }
}
