export class SingerV2 {
  constructor(
    public id: number,
    // tslint:disable-next-line:variable-name
    public singer_name: string,
    public image: string,
    public selected?: boolean,
  ) {
    if (selected === undefined) {
      this.selected = false;
    }
  }
}
