import {Component, OnInit} from '@angular/core';
import {LoginInfo} from '../../auth/login-info';
import {AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {transition, trigger, useAnimation} from '@angular/animations';
import {shake} from 'ng-animate';
import {TokenStorageService} from '../../auth/token-storage.service';
import {LoginSocialComponent} from '../login-social/login-social.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('shake', [transition('* => *', useAnimation(shake))])
  ],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  shake: any;
  isLoading = false;
  hide = true;
  private loginInfo: LoginInfo;

  constructor(private authService: AuthService,
              private route: Router,
              private tokenStorage: TokenStorageService,
              public toasrt: ToastrService,
              private fb: FormBuilder,
              public loginSocial: LoginSocialComponent,
  ) {
  }

  ngOnInit(): void {
    // if (this.authService.checkToken()) {
    //   this.route.navigate(['/browse']);
    // }
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(8)]]
    });
  }

  attemptLogin(loginInfo: LoginInfo): void {
    this.authService.attemptAuth(loginInfo).subscribe(
      (data: any) => {
        // console.log(data);
        if (data.error || data.status) {
          this.toasrt.warning('Login Failed!!! Please login again!.');
        } else {
          setTimeout(() => {
            this.isLoading = false;
          }, 1000);
          this.tokenStorage.saveLogin('true');
          this.tokenStorage.saveToken(data.token);
          setTimeout(() => {
            window.location.reload();
          }, 1111);
          this.route.navigate(['/browse']);
          this.toasrt.success('Login successfully.');
        }
      },
      err => {
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
        // console.log(err.error.error);
        if (err.error.error === 'invalid_credentials') {
          this.toasrt.error('Username or Password is incorrect!');
        } else {
          this.toasrt.warning('Something wrong.');
          this.route.navigate(['/user/login']);
        }
      }
    );
  }

  onSubmit(): void {
    this.isLoading = true;
    // console.log(this.loginForm);
    if (this.loginForm.value.password.length < 6) {
      this.isLoading = false;
      this.toasrt.warning('Password is too short.');
    } else if (this.loginForm.value.password.length > 8) {
      this.isLoading = false;
      this.toasrt.warning('Password is too long.');
    } else {
      this.loginInfo = new LoginInfo(
        this.loginForm.value.username,
        this.loginForm.value.password
      );
      this.attemptLogin(this.loginInfo);
    }
  }

  signOut(): void {
    this.tokenStorage.signOut();
    // setTimeout(() => {
    //   window.location.reload();
    // }, 1111);
    this.route.navigate(['/browse']);
    this.toasrt.success('Logout successfully.');
  }

}

