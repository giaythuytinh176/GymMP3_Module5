import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from 'src/app/auth/auth.service';
import {ChangePassword} from 'src/app/auth/change-password';
import {UserService} from "../../services/user.service";
import {TokenStorageService} from "../../auth/token-storage.service";
import {ToastrService} from "ngx-toastr";
import {UpdateInfo} from "../../model/userManager/updateinfo";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  title = 'Change Password';
  form: any = {};
  changePassword: ChangePassword;
  isChangePassed = false;
  errorMessage = '';
  userinfo!: UpdateInfo;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    private token: TokenStorageService,
    private toastr: ToastrService,
  ) {
  }

  ngOnInit(): void {
    this.userService.getInfoUserToken().subscribe((data: any) => {
      console.log(data);
      if (data.status) {
        this.token.signOut();
        this.toastr.warning('You must login to change password.');
      } else {
        this.userinfo = data.user;
      }
    }, error => console.log(error));
  }

  ngSubmit() {
    // debugger;
    this.changePassword = new ChangePassword(
      this.form.password,
      this.form.new_password,
      this.form.confirm_new_password);
    this.changePassword.username = this.userinfo.username;
    console.log(this.changePassword);
    this.authService
      .changePasswordAuth(this.changePassword)
      .subscribe(
        (data: any) => {
          console.log(data);
          if (data.error || data.status) {
            this.toastr.warning('You have not changed successfully');
          } else {
            this.isChangePassed = true;
            this.toastr.success('You have successfully changed your Password');
            //alert('You have successfully changed your Password');
            this.router.navigate(['/']);
          }
        },
        error => {
          console.log(error);
          this.errorMessage = error.error.message,
            this.toastr.warning('You have not changed successfully');
        });
  }

}
