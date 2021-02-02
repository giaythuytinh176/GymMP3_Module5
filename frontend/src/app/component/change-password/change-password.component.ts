import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { ChangePassword } from 'src/app/auth/change-password';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  title = 'Change Passwod';
  form: any = {};
  changePassword: ChangePassword;
  isChangePassed = false;
  errorMessage = '';

  constructor(
      private authService: AuthService,
      private router: Router) {
  }

  ngOnInit() {
  }

  ngSubmit() {
    debugger;
    this.changePassword = new ChangePassword(
        this.form.currentPassword,
        this.form.newPassword,
        this.form.confirmPassword);

    this.authService
        .changePasswordAuth(this.changePassword)
        .subscribe(
            data => {
              console.log(data);
              this.isChangePassed = true;
              alert('You have successfully changed your Password');
              this.router.navigate(['/']);
            },
            error => {
              console.log(error);
              this.errorMessage = error.error.message,
                  alert('You have not changed successfully');
            });
  }

}
