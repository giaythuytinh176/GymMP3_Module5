import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './services/userManager/auth.guard';
import {NotGuardComponent} from './component/layout/not-guard/not-guard/not-guard.component';
import {SearchSongComponent} from './component/song/search-song/search-song.component';
import {AllListSongComponent} from './component/song/all-list-song/all-list-song.component';
import {GetAllSongsResolver} from './resolver/GetAllSongsResolver';
import {CdkDragDropConnectedSortingGroupExample} from './component/dragdrop/cdk-drag-drop-connected-sorting-group/cdk-drag-drop-connected-sorting-group-example';
import {GetAlbumsResolver} from './resolver/GetAlbumsResolver';
import {GetCategoriesResolver} from './resolver/GetCategoriesResolver';
import {GetSingersResolver} from './resolver/GetSingersResolver';
import {GetUserInfoResolver} from './resolver/GetUserInfoResolver';
import {GetSongByUserIDResolver} from './resolver/GetSongByUserIDResolver';
import {GetAllMovedSongsResolver} from './resolver/GetAllMovedSongsResolver';
import {ListSingerComponent} from './component/singer/list-singer/list-singer.component';
import {GetAllSingersResolver} from './resolver/GetAllSingersResolver';
import {SingerDetailComponent} from './component/singer/singer-detail/singer-detail.component';
import {GetSongOfSingerResolver} from './resolver/GetSongOfSingerResolver';
import {GetSingerInfoResolver} from './resolver/GetSingerInforResolver';
import {ShowSongsLastPlaylistComponent} from './component/playlist/show-songs-last-playlist/show-songs-last-playlist.component';
import {TrackDetailComponent} from './component/song/track-detail/track-detail.component';
import {GetSongOfPlaylistByIDResolverGuest} from './resolver/GetSongOfPlaylistByIDResolverGuest';
import {GetSongDetailByIdGuestResolver} from './resolver/GetSongDetailByIdGuestResolver';
import {GetSongSameSingerBySongIdResolver} from './resolver/GetSongSameSingerBySongIdResolver';
import {GetRandomImagePlaylistResolver} from './resolver/GetRandomImagePlaylistResolver';
import {GetSongCommentResolver} from './resolver/GetSongCommentResolver';
import {GetLikesTop10Resolver} from './resolver/GetLikesTop10Resolver';

const routes: Routes = [
  {
    path: 'user',
    loadChildren: () => import('./lazyloading/users/users.module').then(m => m.UsersModule),
  },
  {
    path: 'browse',
    component: AllListSongComponent,
    resolve: {
      getAllSongs: GetAllSongsResolver,
      getLikesTop10: GetLikesTop10Resolver,
    }
  },
  // {
  //   path: 'search',
  //   component: SearchSongComponent,
  // },
  {
    path: 'playlist/:id',
    component: ShowSongsLastPlaylistComponent,
    resolve: {
      getSongOfPlaylistGuest: GetSongOfPlaylistByIDResolverGuest,
      getRandomImagePlaylist: GetRandomImagePlaylistResolver,
    }
  },
  {
    path: 'track/:id',
    component: TrackDetailComponent,
    resolve: {
      getSongDetailByIdGuest: GetSongDetailByIdGuestResolver,
      getSongSameSingerBySongId: GetSongSameSingerBySongIdResolver,
      getAllSingers: GetAllSingersResolver,
      getCommentSong: GetSongCommentResolver,
      getLikesTop10: GetLikesTop10Resolver,
      // getUserInfo: GetUserInfoResolver,
    },
  },
  {
    path: 'singer',
    children: [
      {
        path: 'list',
        component: ListSingerComponent,
        resolve: {
          getAllSingers: GetAllSingersResolver,
        }
      },
      {
        path: 'song/:id',
        component: SingerDetailComponent,
        resolve: {
          getSingerInfor: GetSingerInfoResolver,
          getShowSongSinger: GetSongOfSingerResolver,
        }
      },
    ],
    resolve: {
      getLikesTop10: GetLikesTop10Resolver,
    }
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
    RouterModule.forRoot(routes,
      {
        useHash: true,
        preloadingStrategy: PreloadAllModules,
        onSameUrlNavigation: 'reload',
      }
    ),
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
