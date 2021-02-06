export class Album {
  id: number;
  album_name: string;
  image: string;

  constructor(id: number, album_name: string, image: string) {
    this.id = id;
    this.album_name = album_name;
    this.image = image;
  }
}
