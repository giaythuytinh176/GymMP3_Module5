export class Playlist {
  name_playlist: string;
  description: string;
  user_id: number;
  view: number;

  constructor(
    name_playlist: string,
    description: string,
    user_id: number,
    view: number,
  ) {
    this.name_playlist = name_playlist;
    this.description = description;
    this.user_id = user_id;
    this.view = view;
  }
}
