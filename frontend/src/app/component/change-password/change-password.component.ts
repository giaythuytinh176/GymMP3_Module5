import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from 'src/app/auth/auth.service';
import {ChangePassword} from 'src/app/auth/change-password';
import {UserService} from "../../services/user.service";
import {TokenStorageService} from "../../auth/token-storage.service";
import {ToastrService} from "ngx-toastr";
import {UpdateInfo} from "../../model/userManager/updateinfo";
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";
import {transition, trigger, useAnimation} from "@angular/animations";
import {shake} from "ng-animate";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
  animations: [
    trigger('shake', [transition('* => *', useAnimation(shake))])
  ],
})
export class ChangePasswordComponent implements OnInit {
  title = 'Change Password';
  form: any = {};
  changePassword: ChangePassword;
  userinfo!: UpdateInfo;
  ChangePassForm: FormGroup;
  shake: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    private token: TokenStorageService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.ChangePassForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(8)]],
      new_password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(8)]],
      confirm_new_password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(8)]]
    }, {validator: this.checkPasswords});


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

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    const new_password = group.get('new_password').value;
    const confirm_new_password = group.get('confirm_new_password').value;
    return new_password === confirm_new_password ? null : {passwordnotmatch: true}
  }


  ngSubmit() {
    // debugger;
    this.changePassword = new ChangePassword(
      this.ChangePassForm.value.password,
      this.ChangePassForm.value.new_password,
      this.ChangePassForm.value.confirm_new_password);
    this.changePassword.username = this.userinfo.username;
    console.log(this.changePassword);
    this.authService
      .changePasswordAuth(this.changePassword)
      .subscribe(
        (data: any) => {
          console.log(data);
          if (data.error || data.status) {
            this.toastr.warning('You must login to change password.');
          } else if (data.data == 'Password has been updated.') {
            setTimeout(() => {
              this.toastr.success('You have successfully changed your Password!');
            }, 500);
            this.router.navigate(['/browser']);
          } else {
            this.toastr.warning('Something wrong.');
            window.location.reload();
            this.router.navigate(['/login']);
          }
        },
        error => {
          console.log(error);
          if (error.error.error == 'Either your email or token is wrong.') {
            setTimeout(() => {
              this.toastr.warning('Old password is incorrect!')
            }, 500);
          } else {
            this.toastr.warning('Something wrong.');
            window.location.reload();
            this.router.navigate(['/login']);
          }
        });
  }

}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control!.invalid && control!.parent!.dirty);
    const invalidParent = !!(control!.parent!.invalid && control!.parent!.dirty);
    return invalidCtrl || invalidParent;
  }
}
