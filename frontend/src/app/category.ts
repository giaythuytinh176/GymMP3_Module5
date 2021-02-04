export class Category {
  id!: number;
  category_name!:string;
  image!:string;
  constructor(category_name:string,image:string) {

    this.category_name=category_name;
    this.image=image;
  }
}
