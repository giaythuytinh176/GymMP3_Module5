import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './component/change-password/change-password.component';
import { RegisterComponent } from './component/register/register.component';
import { ProfileComponent } from "./component/profile/profile.component";
import { AuthGuard } from "./services/userManager/auth.guard";
import { NotGuardComponent } from "./component/layout/not-guard/not-guard/not-guard.component";
import { LoginComponent } from "./component/login/login.component";
import { ShowSongsUserComponent } from './component/show-songs-user/show-songs-user.component';

const routes: Routes = [
  {
    path: 'signup',
    component: RegisterComponent
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
    path: 'listsongs',
    component: ShowSongsUserComponent,
    canActivate: [AuthGuard]
  },

  // otherwise redirect to home
  {
    path: '**', redirectTo: '',
    component: RegisterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
