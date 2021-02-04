import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './component/change-password/change-password.component';
import { RegisterComponent } from './component/register/register.component';
import { ProfileComponent } from "./component/profile/profile.component";
import { AuthGuard } from "./services/userManager/auth.guard";
import { NotGuardComponent } from "./component/layout/not-guard/not-guard/not-guard.component";
import { LoginComponent } from "./component/login/login.component";
import { AllListSongComponent } from "./component/songManager/all-list-song/all-list-song/all-list-song.component";
import { CreateSongComponent } from "./component/songManager/create-song/create-song/create-song.component";
import { UpdateSongComponent } from "./component/songManager/update-song/update-song.component";
import { ShowSongsUserComponent } from './component/show-songs-user/show-songs-user.component';
import { SearchSongComponent } from './component/songManager/search-song/search-song.component'
import firebase from "firebase";
import Auth = firebase.auth.Auth;

const routes: Routes = [
  {
    path: 'signup',
    component: RegisterComponent,
  },
  {
    path: 'changepass',
    component: ChangePasswordComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'error404',
    component: NotGuardComponent
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'browse',
    component: AllListSongComponent,
  },
  {
    path: 'create-song',
    component: CreateSongComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'listsongs',
    component: ShowSongsUserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'songs/:id',
    component: UpdateSongComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'search',
    component: SearchSongComponent
  },
  {
    path: 'deletesong/:id',
    component: ShowSongsUserComponent,
    canActivate: [AuthGuard],
  },










  // otherwise redirect to home
  {
    path: '**', redirectTo: '',
    component: AllListSongComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
