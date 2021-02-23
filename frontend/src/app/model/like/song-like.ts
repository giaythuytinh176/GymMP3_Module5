export class SongLike {
  user_id: number;
  song_id: number;
  like: number;

  constructor(
    user_id: number,
    song_id: number,
    like: number,
  ) {
    this.user_id = user_id;
    this.song_id = user_id;
    this.like = user_id;
  }
}
