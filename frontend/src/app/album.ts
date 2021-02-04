export class Album {
  id!: number;
  album_name!:string;
  image!:string;
  constructor(album_name:string,image:string) {
    this.album_name=album_name;
    this.image=image
  }

}
