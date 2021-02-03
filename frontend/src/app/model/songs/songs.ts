export class Songs {
    id!:number;
    nameSong!: string;
    avatarUrl!:string;
    mp3Url!:string;
    describes!: string;
    author!: string;
    views!: number;
    user_id!: number;
    singer_id!: number;
    category_id!: number;
    album_id!: number; 
    singer_name!: any;
    category_name!: any;
    album_name!: any;
    user_name!: any;
    created_at!: any;
    updated_at!: any;

    constructor(nameSong: string, avatarUrl: string, mp3Url: string,
         describes: string, author: string, views: number, 
         user_id:number, singer_id: number, category_id:number,
         album_id: number, singer_name: any, category_name: any,
         album_name: any, user_name: any, created_at: any, update_at: any) 
    {
        this.nameSong = nameSong;
        this.avatarUrl = avatarUrl;
        this.mp3Url = mp3Url;
        this.describes = describes;
        this.author = author;
        this.views = views;
        this.user_id = user_id;
        this.singer_id = singer_id;
        this.category_id = category_id;
        this.album_id = album_id;
        this.singer_name = singer_name;
        this.category_name = category_name;
        this.album_name = album_name;
        this.user_name = user_name;
        this.created_at = created_at;
        this.updated_at = update_at;
    }
}
