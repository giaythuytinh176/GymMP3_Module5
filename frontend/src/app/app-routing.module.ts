import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './component/change-password/change-password.component';
import { RegisterComponent } from './component/register/register.component';

const routes: Routes = [
  {
    path: 'signup',
    component: RegisterComponent
  },
  {
    path: 'changepass',
    component: ChangePasswordComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
