export class Singer {
  id: number;
  // tslint:disable-next-line:variable-name
  singer_name: string;
  image: string;
  description: string;
  gender: string;
  date_of_birth: any;
  music_genre: string;
  story: string;
  band: string;
  songs?: [{ id: number, nameSong: string, avatarUrl: any, mp3Url: any, describes: any, author: string, view: number, category: string, album: string }];


  constructor(
    singer_name: string,
    image: string,
    description: string
  ) {
    this.singer_name = singer_name;
    this.image = image;
    this.description = description;
  }
}
