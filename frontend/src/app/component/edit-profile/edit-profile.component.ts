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
import {FirebaseComponent} from "../firebase/firebase/firebase.component";

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
              public firebase: FirebaseComponent,
  ) {
  }

  ngOnInit(): void {
    this.profileFormSubmit();
    console.log(1);
    // this.loadUserInfo$ = this.userService.getInfoUserToken();
    this.getUserInfo();
    console.log(3);
  }

  getUserInfo(): void {
    this.userinfo = this.route.snapshot.data.getUserInfo.user;
    // console.log(this.userinfo);
    // this.userService.getInfoUserToken().subscribe((data: any) => {
    //   // console.log(data);
    //   if (data.status) {
    //     this.token.signOut();
    //     this.toastr.warning('You must login to create Song.');
    //     this.routes.navigate(['/user/login']);
    //   } else {
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
    console.log(2);
    //     this.userinfo = data.user;
    // this.isLoading = false;
    //   }
    // }, error => console.log(error));
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
    this.profileForm.value.avatar = this.firebase.fb;
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
        const data = this.profileForm.value;
        this.userService.updateUser(data, data.id)
          .subscribe((data: any) => {
            // console.log(data);
            if (data.status) {
              this.token.signOut();
              this.toastr.warning('You must login to update profile.');
              this.routes.navigate(['/user/login']);
            } else {
              // this.routes.navigate(['list']);
              this.toastr.success('Updated Profile Successfully!');
              this.routes.navigate(['/user/profile', this.userinfo.id]);
            }
          }, error => {
            // console.log(JSON.parse(error.error));
            // console.log(error.error.email);
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
