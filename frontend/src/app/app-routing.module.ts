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
import {SingerDetailComponent} from "./component/singer/singer-detail/singer-detail.component";

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
    path: 'search-playlist',
    component: SearchPlaylistComponent,
  },
  {
    path: 'singers/:id',
    component: SingerDetailComponent,
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
