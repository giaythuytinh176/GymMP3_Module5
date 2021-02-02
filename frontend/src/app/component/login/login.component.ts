import { Component, OnInit } from '@angular/core';
import {LoginInfo} from "../../auth/login-info";
import {AuthService} from "../../auth/auth.service";
import {Router} from "@angular/router";
import {TokenStorageService} from "../../token-storage.service";

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

  constructor(private authService: AuthService, private route: Router,
              private tokenStorage: TokenStorageService) {
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
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
        this.reloadPage();
        alert('Login success!!!');
        this.route.navigate(['/user']);
        window.location.reload();
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
        alert('Login Failed!!! Please login again! ');
        this.reloadPage();
      }
    );
  }

  reloadPage() {
    window.location.reload();
  }

  signOut() {
    window.sessionStorage.clear();
    window.location.reload();
    this.route.navigate(['/login']);

  }

}

