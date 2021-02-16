export class Singer {
  id: number;
  // tslint:disable-next-line:variable-name
  singer_name: string;
  image: string;
  description: string;

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
