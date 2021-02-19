export class Playlist {
  id: number;
  name_playlist: string;
  description: string;
  user_id: number;
  view: number;
  status: string;

  constructor(
    name_playlist: string,
    description: string,
    user_id: number,
    view: number,
    status: string,
  ) {
    this.name_playlist = name_playlist;
    this.description = description;
    this.user_id = user_id;
    this.view = view;
    this.status = status;
  }
}
