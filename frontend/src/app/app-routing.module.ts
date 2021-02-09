import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ChangePasswordComponent} from './component/change-password/change-password.component';
import {RegisterComponent} from './component/register/register.component';
import {ProfileComponent} from "./component/profile/profile.component";
import {AuthGuard} from "./services/userManager/auth.guard";
import {NotGuardComponent} from "./component/layout/not-guard/not-guard/not-guard.component";
import {LoginComponent} from "./component/login/login.component";
import {UpdateSongComponent} from "./component/songManager/update-song/update-song.component";
import {SearchSongComponent} from './component/songManager/search-song/search-song.component'
import {EditProfileComponent} from "./component/edit-profile/edit-profile.component";
import {CreateSongComponent} from "./component/songManager/create-song/create-song.component";
import {AllListSongComponent} from "./component/songManager/all-list-song/all-list-song.component";

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
        canActivate: [AuthGuard]
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'edit-profile',
        component: EditProfileComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'create-song',
        component: CreateSongComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'edit-song/:id',
        component: UpdateSongComponent,
        canActivate: [AuthGuard],
      },
    ]
  },
  {
    path: 'browse',
    component: AllListSongComponent,
  },
  {
    path: 'search',
    component: SearchSongComponent
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
