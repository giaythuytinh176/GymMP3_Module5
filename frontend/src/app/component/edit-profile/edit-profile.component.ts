import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UpdateInfo} from "../../model/userManager/updateinfo";
import {AngularFireStorage} from "@angular/fire/storage";
import {ActivatedRoute, Router} from "@angular/router";
import {TokenStorageService} from "../../auth/token-storage.service";
import {ToastrService} from "ngx-toastr";
import {FirebaseComponent} from "../firebase/firebase.component";
import {transition, trigger, useAnimation} from "@angular/animations";
import {shake} from "ng-animate";
import {UserService} from "../../services/userManager/user.service";

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
    this.userService.getInfoUserToken().subscribe((data: any) => {
      // console.log(data);
      if (data.status) {
        this.token.signOut();
        this.toastr.warning('You must login to update profile.');
        this.routes.navigate(['/user/login']);
      } else {
        this.userinfo = data.user;
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
    }, error => console.log(error));

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
    if ((this.profileForm.value.avatar == '') && (this.profileForm.value.old_avatar == '')) {
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
              this.routes.navigate(['/user/login'])
            } else {
              // this.routes.navigate(['list']);
              this.toastr.success('Updated Profile Successfully!');
              this.routes.navigate(['/user/profile']);
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
