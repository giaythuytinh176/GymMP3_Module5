export class Category {
  id: number;
  category_name: string;
  image: string;

  constructor(id: number, category_name: string, image: string) {
    this.id = id;
    this.category_name = category_name;
    this.image = image;
  }
}
