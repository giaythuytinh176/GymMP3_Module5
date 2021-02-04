import {Component, OnInit} from '@angular/core';
import {LoginInfo} from "../../auth/login-info";
import {AuthService} from "../../auth/auth.service";
import {Router} from "@angular/router";
import {TokenStorageService} from "../../token-storage.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  private loginInfo: LoginInfo;

  constructor(private authService: AuthService,
              private route: Router,
              private tokenStorage: TokenStorageService,
              public toasrt: ToastrService,
  ) {
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.route.navigate(['/browse']);
    }
  }

  onSubmit() {
    console.log(this.form);

    this.loginInfo = new LoginInfo(
      this.form.username,
      this.form.password
    );

    this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {
        console.log(data);
        this.tokenStorage.saveToken(data.token);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        setTimeout( () => {
          this.reloadPage();
        }, 1000);
        this.toasrt.success('Login sucessfully.');
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
        this.signOut();
        this.toasrt.warning('Login Failed!!! Please login again!')
        this.reloadPage();
      }
    );
  }

  reloadPage() {
    window.location.reload();
  }

  signOut() {
    window.sessionStorage.clear();
    setTimeout( () => {
      this.reloadPage();
    }, 1000);
    this.toasrt.success('Logout sucessfully.');
    // this.route.navigate(['/login']);
  }

}

