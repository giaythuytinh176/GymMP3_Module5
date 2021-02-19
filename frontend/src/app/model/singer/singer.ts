export class Singer {
  id: number;
  // tslint:disable-next-line:variable-name
  singer_name: string;
  image: string;
  description: string;
  gender:string;
  date_of_birth:any;
  music_genre:string;
  story:string;
  year_of_birth:string;
  band:string;
  popular_song:string;
  information:string;

  constructor(
    singer_name: string,
    image: string,
    description: string,


  ) {
    this.singer_name = singer_name;
    this.image = image;
    this.description = description;

  }
}
