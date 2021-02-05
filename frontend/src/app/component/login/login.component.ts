import {Component, OnInit} from '@angular/core';
import {LoginInfo} from "../../auth/login-info";
import {AuthService} from "../../auth/auth.service";
import {Router} from "@angular/router";
import {TokenStorageService} from "../../token-storage.service";
import {ToastrService} from "ngx-toastr";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private loginInfo: LoginInfo;
  loginForm: FormGroup;

  constructor(private authService: AuthService,
              private route: Router,
              private tokenStorage: TokenStorageService,
              public toasrt: ToastrService,
              private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.route.navigate(['/browse']);
    }
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    console.log(this.loginForm);
    if (this.loginForm.value.password.length < 6) {
      this.toasrt.warning('Password is too short.')
    }
    else if (this.loginForm.value.password.length > 8) {
      this.toasrt.warning('Password is too long.')
    } else {
      this.loginInfo = new LoginInfo(
        this.loginForm.value.username,
        this.loginForm.value.password
      );
      this.authService.attemptAuth(this.loginInfo).subscribe(
        (data: any) => {
          console.log(data);
          if (data.error || data.status) {
            this.toasrt.warning('Login Failed!!! Please login again!.')
          } else {
            this.tokenStorage.saveToken(data.token);
            this.toasrt.success('Login successfully.');
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          }
        },
        err => {
          // console.log(err.error.error);
          if (err.error.error == 'invalid_credentials') {
            this.toasrt.error('Username or Password is incorrect!');
          } else {
            this.toasrt.warning('Something wrong.');
            this.route.navigate(['/login']);
          }
        }
      );
    }
  }

  signOut() {
    this.tokenStorage.signOut();
    setTimeout(() => {
      window.location.reload();
    }, 1000);
    this.toasrt.success('Logout successfully.');
    this.route.navigate(['/browse']);
  }

}

