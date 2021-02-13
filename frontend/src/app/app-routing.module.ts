import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ChangePasswordComponent} from './component/change-password/change-password.component';
import {RegisterComponent} from './component/register/register.component';
import {ProfileComponent} from './component/profile/profile.component';
import {AuthGuard} from './services/userManager/auth.guard';
import {NotGuardComponent} from './component/layout/not-guard/not-guard/not-guard.component';
import {LoginComponent} from './component/login/login.component';
import {UpdateSongComponent} from './component/songManager/update-song/update-song.component';
import {SearchSongComponent} from './component/songManager/search-song/search-song.component';
import {EditProfileComponent} from './component/edit-profile/edit-profile.component';
import {CreateSongComponent} from './component/songManager/create-song/create-song.component';
import {AllListSongComponent} from './component/songManager/all-list-song/all-list-song.component';
import {GetAllSongsResolver} from './resolver/GetAllSongsResolver';
import {CdkDragDropConnectedSortingGroupExample} from './component/dragdrop/cdk-drag-drop-connected-sorting-group/cdk-drag-drop-connected-sorting-group-example';
import {GetAlbumsResolver} from './resolver/GetAlbumsResolver';
import {GetCategoriesResolver} from './resolver/GetCategoriesResolver';
import {GetSingersResolver} from './resolver/GetSingersResolver';
import {GetUserInfoResolver} from './resolver/GetUserInfoResolver';
import {GetSongByUserIDResolver} from './resolver/GetSongByUserIDResolver';
import {GetSongDetailByIdResolver} from './resolver/GetSongDetailByIdResolver';
import {GetSingerIDbySongIDResolver} from './resolver/GetSingerIDbySongIDResolver';
import {GetCategoryInfoByIDResolver} from './resolver/GetCategoryInfoByIDResolver';
import {GetAllMovedSongsResolver} from "./resolver/GetAllMovedSongsResolver";

const routes: Routes = [
  {
    path: 'user',
    children: [
      {
        path: 'signup',
        component: RegisterComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
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
    ]
  },
  {
    path: 'browse',
    component: AllListSongComponent,
    resolve: {
      getAllSongs: GetAllSongsResolver
    }
  },
  {
    path: 'search',
    component: SearchSongComponent,
  },
  {
    path: 'dragdrop',
    component: CdkDragDropConnectedSortingGroupExample,
    canActivate: [AuthGuard],
    resolve: {
      getUserInfo: GetUserInfoResolver,
      getAllMovedSongs: GetAllMovedSongsResolver,
    },
  },
  {
    path: '404',
    component: NotGuardComponent
  },
  {
    path: '',
    redirectTo: 'browse',
    pathMatch: 'full'
  },


  // otherwise redirect to home
  {
    path: '**', redirectTo: '',
    component: NotGuardComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash: true}),
  ],
  exports: [
    RouterModule,
  ],
  providers: [
    GetAllSongsResolver,
    GetUserInfoResolver,
    GetSongByUserIDResolver,
    GetAlbumsResolver,
    GetCategoriesResolver,
    GetSingersResolver,
  ]
})
export class AppRoutingModule {
}
