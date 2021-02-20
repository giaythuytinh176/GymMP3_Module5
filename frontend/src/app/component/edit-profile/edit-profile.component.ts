import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UpdateInfo} from '../../model/userManager/updateinfo';
import {AngularFireStorage} from '@angular/fire/storage';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenStorageService} from '../../auth/token-storage.service';
import {ToastrService} from 'ngx-toastr';
import {transition, trigger, useAnimation} from '@angular/animations';
import {shake} from 'ng-animate';
import {UserService} from '../../services/userManager/user.service';
import {Observable} from 'rxjs';
import {FirebaseEditProfileComponent} from '../firebase/firebaseEditProfile/firebaseEditProfile.component';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
  animations: [
    trigger('shake', [transition('* => *', useAnimation(shake))])
  ],
})
export class EditProfileComponent implements OnInit {
  profileForm: FormGroup;
  user: UpdateInfo;
  userinfo!: UpdateInfo;
  name = '';
  address = '';
  email = '';
  phone = '';
  avatar = '';
  username = '';
  shake: any;
  old_avatar = '';
  loadUserInfo$: Observable<UpdateInfo>;
  isLoading = false;

  constructor(private userService: UserService,
              private storage: AngularFireStorage,
              private route: ActivatedRoute,
              private routes: Router,
              private fb: FormBuilder,
              private token: TokenStorageService,
              private toastr: ToastrService,
              public firebaseEditProfile: FirebaseEditProfileComponent,
  ) {
  }

  ngOnInit(): void {
    this.profileFormSubmit();
    // this.loadUserInfo$ = this.userService.getInfoUserToken();
    this.getUserInfo();
  }

  getUserInfo(): void {
    this.userinfo = this.route.snapshot.data.getUserInfo.user;

    this.profileForm.value.name = this.userinfo.name;
    this.profileForm.value.address = this.userinfo.address;
    this.profileForm.value.email = this.userinfo.email;
    this.profileForm.value.phone = this.userinfo.phone;
    this.name = this.userinfo.name;
    this.address = this.userinfo.address;
    this.email = this.userinfo.email;
    this.phone = this.userinfo.phone;
    this.avatar = this.userinfo.avatar;
    this.old_avatar = this.userinfo.avatar;
    this.username = this.userinfo.username;

  }

  profileFormSubmit(): void {
    this.profileForm = this.fb.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^0\d{9,10}$/)]],
      avatar: [''],
      old_avatar: [this.old_avatar],
    });
  }

  updateUser() {
    this.profileForm.value.avatar = this.firebaseEditProfile.fb;
    this.profileForm.value.username = this.userinfo.username;
    this.profileForm.value.id = this.userinfo.id;
    if ((this.profileForm.value.avatar === '') && (this.profileForm.value.old_avatar === '')) {
      this.toastr.warning('Avatar is required!');
    } else {
      if (this.profileForm.value.avatar && this.profileForm.value.avatar.includes('http')) {
      } else {
        this.profileForm.value.avatar = this.old_avatar;
      }
      if (this.profileForm.valid) {
        const dt = this.profileForm.value;
        this.userService.updateUser(dt, dt.id)
          .subscribe((data: any) => {
            if (data.status) {
              this.token.signOut();
              this.toastr.warning('You must login to update profile.');
              this.routes.navigate(['/user/login']);
            } else {
              this.toastr.success('Updated Profile Successfully!');
              this.routes.navigate(['/user/profile', this.userinfo.id]);
            }
          }, error => {
            if (error.error.email) {
              this.toastr.warning(error.error.email);
            } else {
              this.toastr.warning(JSON.parse(error.error).avatar);
            }
          });
      }
    }
  }
}
