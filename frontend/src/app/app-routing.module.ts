import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './services/userManager/auth.guard';
import {NotGuardComponent} from './component/layout/not-guard/not-guard/not-guard.component';
import {SearchSongComponent} from './component/songManager/search-song/search-song.component';
import {AllListSongComponent} from './component/songManager/all-list-song/all-list-song.component';
import {GetAllSongsResolver} from './resolver/GetAllSongsResolver';
import {CdkDragDropConnectedSortingGroupExample} from './component/dragdrop/cdk-drag-drop-connected-sorting-group/cdk-drag-drop-connected-sorting-group-example';
import {GetAlbumsResolver} from './resolver/GetAlbumsResolver';
import {GetCategoriesResolver} from './resolver/GetCategoriesResolver';
import {GetSingersResolver} from './resolver/GetSingersResolver';
import {GetUserInfoResolver} from './resolver/GetUserInfoResolver';
import {GetSongByUserIDResolver} from './resolver/GetSongByUserIDResolver';
import {GetAllMovedSongsResolver} from './resolver/GetAllMovedSongsResolver';
import {LastestSongComponent} from './component/songManager/lastest-song/lastest-song.component';
import {SearchPlaylistComponent} from './component/playlist/search-playlist/search-playlist.component';
import {ListSingerComponent} from './component/singer/list-singer/list-singer.component';
import {GetAllSingersResolver} from './resolver/GetAllSingersResolver';
import {SingerDetailComponent} from './component/singer/singer-detail/singer-detail.component';
import {GetSongOfSingerResolver} from './resolver/GetSongOfSingerResolver';
import {GetSingerInfoResolver} from './resolver/GetSingerInforResolver';
import {ShowSongsLastPlaylistComponent} from './component/playlist/show-songs-last-playlist/show-songs-last-playlist.component';
import {TrackDetailComponent} from "./component/songManager/track-detail/track-detail.component";
import {GetSongOfPlaylistByIDResolver} from "./resolver/GetSongOfPlaylistByIDResolver";
import {GetSongOfPlaylistByIDResolverGuest} from "./resolver/GetSongOfPlaylistByIDResolverGuest";

const routes: Routes = [
  {
    path: 'user',
    loadChildren: () => import('./lazyloading/users/users.module').then(m => m.UsersModule),
  },
  {
    path: 'browse',
    component: AllListSongComponent,
    resolve: {
      getAllSongs: GetAllSongsResolver
    }
  },
  {
    path: 'lastest-songs',
    component: LastestSongComponent,
  },
  {
    path: 'search',
    component: SearchSongComponent,
  },
  {
    path: 'playlist/:id',
    component: ShowSongsLastPlaylistComponent,
    resolve: {
      getSongOfPlaylistGuest: GetSongOfPlaylistByIDResolverGuest,
    }
  },
  {
    path: 'search-playlist',
    component: SearchPlaylistComponent,
  },
  {
    path: 'track/:id',
    component: TrackDetailComponent,
  },
  {
    path: 'singer',
    children: [
      {
        path: 'list',
        component: ListSingerComponent,
        resolve: {
          getAllSingers: GetAllSingersResolver
        }
      },
      {
        path: 'song/:id',
        component: SingerDetailComponent,
        resolve: {
          getSingerInfor: GetSingerInfoResolver,
          getShowSongSinger: GetSongOfSingerResolver
        }
      },
    ]
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
