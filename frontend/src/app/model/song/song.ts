export class Song {
  id?: number;
  nameSong?: string;
  avatarUrl?: string;
  mp3Url?: string;
  describes?: string;
  author?: string;
  views?: number;
  user_id?: number;
  singer_id?: any;
  category_id?: any;
  album_id?: any;
  singer_name?: any;
  category_name?: any;
  album_name?: any;
  singer_list_name?: any;
  singers?: [{ singer_name: string, id: number }];

  constructor(
    id: number,
    nameSong: string,
    avatarUrl: string,
    mp3Url: string,
    describes: string,
    author: string,
    views: number,
    user_id: number,
    singer_id: any,
    category_id: number,
    album_id: number,
    singers: [{ singer_name: string }],
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
