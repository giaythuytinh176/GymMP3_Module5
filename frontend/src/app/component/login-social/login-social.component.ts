import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DOCUMENT} from '@angular/common';
import {environment} from '../../../environments/environment';
import {TokenStorageService} from '../../auth/token-storage.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  // changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-login-social',
  templateUrl: './login-social.component.html',
  styleUrls: ['./login-social.component.css']
})
export class LoginSocialComponent implements OnInit, AfterViewInit {
  token: string;
  error: string;
  action: string;

  constructor(
    private router: ActivatedRoute,
    private route: Router,
    private toasrt: ToastrService,
    @Inject(DOCUMENT) private document: Document,
    private tokenStorage: TokenStorageService,
    private cdr: ChangeDetectorRef,
  ) {
  }

  goToLoginUrlFacebook(): void {
    this.document.location.href = environment.apiLoginFacebookSocial;
  }

  ngOnInit(): void {
    this.token = this.router.snapshot.queryParamMap.get('token');
    this.error = this.router.snapshot.queryParamMap.get('error');
    this.action = this.router.snapshot.queryParamMap.get('action');
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.token) {
        this.tokenStorage.saveLogin('true');
        this.tokenStorage.saveToken(this.token);
        setTimeout(() => {
          window.location.reload();
        }, 1111);
        this.route.navigate(['/browse']);
        if (this.action === 'login') {
          this.toasrt.success('Login successfully.');
        } else if (this.action === 'register') {
          this.toasrt.success('Register successfully.');
        }
      } else if (this.error) {
        this.toasrt.warning(this.error);
        this.route.navigate(['/user/signup']);
      } else if (this.error === null) {
        this.toasrt.warning('Login Facebook has problem.');
        this.route.navigate(['/user/login']);
      } else {
        this.toasrt.warning('Login fail!');
        this.route.navigate(['/user/login']);
      }
    }, 0);
  }
}
