import {AfterContentChecked, AfterViewChecked, Component, OnChanges, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from 'src/app/auth/auth.service';
import {ChangePassword} from 'src/app/auth/change-password';
import {TokenStorageService} from '../../auth/token-storage.service';
import {ToastrService} from 'ngx-toastr';
import {UpdateInfo} from '../../model/userManager/updateinfo';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {transition, trigger, useAnimation} from '@angular/animations';
import {shake} from 'ng-animate';
import {UserService} from '../../services/userManager/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
  animations: [
    trigger('shake', [transition('* => *', useAnimation(shake))])
  ],
})
export class ChangePasswordComponent implements OnInit, OnChanges, AfterContentChecked {
  title = 'Change Password';
  form: any = {};
  changePassword: ChangePassword;
  userinfo!: UpdateInfo;
  ChangePassForm: FormGroup;
  shake: any;
  isSamePass = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
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
    }, {validator: this.checkPasswords}); // , validators: this.checkPasswords2

    this.userinfo = this.route.snapshot.data.getUserInfo.user;
    // this.userService.getInfoUserToken().subscribe((data: any) => {
    //   // console.log(data);
    //   if (data.status) {
    //     this.token.signOut();
    //     this.toastr.warning('You must login to change password.');
    //     this.router.navigate(['/user/login']);
    //   } else {
    //     this.userinfo = data.user;
    //   }
    // }, error => console.log(error));
  }

  ngAfterContentChecked(): void {
    // console.log(11111);
    if (this.ChangePassForm.value.password !== this.ChangePassForm.value.new_password) {
      this.isSamePass = false;
    }
    if ((this.ChangePassForm.value.password === this.ChangePassForm.value.new_password) &&
      (this.ChangePassForm.value.password !== '')
    ) {
      this.isSamePass = true;
    }
  }

  ngOnChanges(): void {

  }

  // tslint:disable-next-line:typedef
  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    const new_password = group.get('new_password').value;
    const confirm_new_password = group.get('confirm_new_password').value;
    return new_password === confirm_new_password ? null : {passwordnotmatch: true};
  }

  // tslint:disable-next-line:typedef
  checkPasswords2(group: FormGroup) { // here we have the 'passwords' group
    const new_password = group.get('new_password').value;
    const password = group.get('password').value;
    return password === new_password ? {passwordmatch: true} : null;
  }

  ngSubmit(): void {
    this.changePassword = new ChangePassword(
      this.ChangePassForm.value.password,
      this.ChangePassForm.value.new_password,
      this.ChangePassForm.value.confirm_new_password);
    this.changePassword.username = this.userinfo.username;
    // console.log(this.ChangePassForm.value);
    if (this.ChangePassForm.value.password === this.ChangePassForm.value.new_password) {
      this.isSamePass = true;
    } else {
      this.authService
        .changePasswordAuth(this.changePassword)
        .subscribe(
          (data: any) => {
            // console.log(data);
            if (data.error || data.status) {
              // console.log(data.error);
              if (data.error) {
                this.toastr.warning(data.error);
              } else {
                this.toastr.warning('You must login to change password.');
                this.router.navigate(['/user/login']);
              }
            } else if (data.data === 'Password has been updated.') {
              this.router.navigate(['/user/login']);
              // setTimeout(() => {
              //   this.toastr.success('You have successfully changed your Password, please login again!');
              // }, 1000);
              this.toastr.success('You have successfully changed your Password, please login again!');
              this.token.signOut();
              // window.location.reload();
              // this.router.navigate(['/user/login']);
              setTimeout(() => {
                window.location.reload();
              }, 1000);

            } else {
              this.toastr.warning('Something wrong.');
              setTimeout(() => {
                window.location.reload();
              }, 1000);
              this.router.navigate(['/user/login']);
            }
          },
          error => {
            // console.log(error);
            if (error.error.error === 'Either your email or token is wrong.') {
              setTimeout(() => {
                this.toastr.warning('Old password is incorrect!');
              }, 500);
            } else {
              this.toastr.warning('Something wrong.');
              setTimeout(() => {
                window.location.reload();
              }, 1000);
              this.router.navigate(['/user/login']);
            }
          });
    }
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control!.invalid && control!.parent!.dirty);
    const invalidParent = !!(control!.parent!.invalid && control!.parent!.dirty);
    return invalidCtrl || invalidParent;
  }
}
