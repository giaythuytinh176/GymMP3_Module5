export class Singer {
  id: number;
  singer_name: string;
  image: string;

  constructor(id: number, singer_name: string, image: string) {
    this.id = id;
    this.singer_name = singer_name;
    this.image = image;
  }
}
