export class Singer {
  id: number;
  singer_name: string;
  image: string;
  description: string

  constructor(id: number, singer_name: string, image: string,description:string) {
    this.id = id;
    this.singer_name = singer_name;
    this.image = image;
    this.description=description;
  }
}
