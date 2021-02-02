import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from './component/register/register.component';
import {ProfileComponent} from "./component/profile/profile.component";
import {AuthGuard} from "./services/userManager/auth.guard";
import {NotGuardComponent} from "./component/layout/not-guard/not-guard/not-guard.component";

const routes: Routes = [
  {
    path: 'signup',
    component: RegisterComponent
  },
  {
    path: 'profile',
    component: ProfileComponent, canActivate: [AuthGuard]
  },
  {
    path: 'error404',
    component: NotGuardComponent
  },






  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
