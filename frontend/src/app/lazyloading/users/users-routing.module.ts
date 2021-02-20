import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from '../../component/register/register.component';
import {LoginComponent} from '../../component/login/login.component';
import {LoginSocialComponent} from '../../component/login-social/login-social.component';
import {ChangePasswordComponent} from '../../component/change-password/change-password.component';
import {AuthGuard} from '../../services/userManager/auth.guard';
import {GetUserInfoResolver} from '../../resolver/GetUserInfoResolver';
import {ProfileComponent} from '../../component/profile/profile.component';
import {GetSongByUserIDResolver} from '../../resolver/GetSongByUserIDResolver';
import {EditProfileComponent} from '../../component/edit-profile/edit-profile.component';
import {CreateSongComponent} from '../../component/songManager/create-song/create-song.component';
import {GetAlbumsResolver} from '../../resolver/GetAlbumsResolver';
import {GetCategoriesResolver} from '../../resolver/GetCategoriesResolver';
import {GetSingersResolver} from '../../resolver/GetSingersResolver';
import {UpdateSongComponent} from '../../component/songManager/update-song/update-song.component';
import {GetSongDetailByIdResolver} from '../../resolver/GetSongDetailByIdResolver';
import {GetSingerIDbySongIDResolver} from '../../resolver/GetSingerIDbySongIDResolver';
import {GetPlaylistByUSerID} from '../../resolver/GetPlaylistByIDResolver';
import {PlaylistDetailComponent} from '../../component/playlist/playlist-detail/playlist-detail.component';
import {GetAllSongsResolver} from '../../resolver/GetAllSongsResolver';
import {TracksComponent} from '../../component/songManager/tracks/tracks.component';
import {GetPlaylistInfoResolver} from '../../resolver/GetPlaylistInfoResolver';
import {GetSongOfPlaylistByIDResolver} from "../../resolver/GetSongOfPlaylistByIDResolver";
import {GetRandomImagePlaylistResolver} from "../../resolver/GetRandomImagePlaylistResolver";

const routes: Routes = [
  {
    path: 'signup',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'login-facebook',
    component: LoginSocialComponent,
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
    canActivate: [AuthGuard],
    resolve: {
      getUserInfo: GetUserInfoResolver,
    },
  },
  {
    path: 'profile/:id',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    resolve: {
      getUserInfo: GetUserInfoResolver,
      getSongByUserID: GetSongByUserIDResolver,
      getPlaylistByUSerID: GetPlaylistByUSerID,
    },
  },
  {
    path: 'tracks',
    component: TracksComponent,
    canActivate: [AuthGuard],
    resolve: {
      getUserInfo: GetUserInfoResolver,
      getSongByUserID: GetSongByUserIDResolver,
    },
  },
  {
    path: 'edit-profile',
    component: EditProfileComponent,
    canActivate: [AuthGuard],
    resolve: {
      getUserInfo: GetUserInfoResolver,
    },
  },
  {
    path: 'create-song',
    component: CreateSongComponent,
    canActivate: [AuthGuard],
    resolve: {
      getAlbums: GetAlbumsResolver,
      getCategories: GetCategoriesResolver,
      getSingers: GetSingersResolver,
      getUserInfo: GetUserInfoResolver,
    },
  },
  {
    path: 'edit-song/:id',
    component: UpdateSongComponent,
    canActivate: [AuthGuard],
    resolve: {
      getAlbums: GetAlbumsResolver,
      getCategories: GetCategoriesResolver,
      getSingers: GetSingersResolver,
      getUserInfo: GetUserInfoResolver,
      getSongDetailById: GetSongDetailByIdResolver,
      getSingerIDbySongID: GetSingerIDbySongIDResolver,
      // getCategoryInfoByID: GetCategoryInfoByIDResolver,
    },
  },
  {
    path: 'playlist/:id',
    component: PlaylistDetailComponent,
    canActivate: [AuthGuard],
    resolve: {
      getAllSongs: GetAllSongsResolver,
      getPlaylistInfo: GetPlaylistInfoResolver,
      getUserInfo: GetUserInfoResolver,
      getSongOfPlaylist: GetSongOfPlaylistByIDResolver,
      getRandomImagePlaylist: GetRandomImagePlaylistResolver,
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {
}
