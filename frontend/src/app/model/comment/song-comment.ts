export class SongComment {
  name: string;
  email: string;
  content: string;
  song_id: number;

  constructor(
    name: string,
    email: string,
    content: string,
    song_id: number,
  ) {
    this.name = name;
    this.email = email;
    this.content = content;
    this.song_id = song_id;
  }
}
