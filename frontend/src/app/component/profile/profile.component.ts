import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TokenStorageService} from "../../auth/token-storage.service";
import {AngularFireStorage} from "@angular/fire/storage";
import {ToastrService} from "ngx-toastr";
import {UpdateInfo} from "../../model/userManager/updateinfo";
import {FirebaseComponent} from "../firebase/firebase.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: UpdateInfo;
  success: string;
  fail: string;
  profileForm: FormGroup;
  username: string;
  isUpdate = false;
  isUpdateFailed = false;
  userinfo!: UpdateInfo;

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
      console.log(data);
      if (data.status) {
        this.token.signOut();
        this.toastr.warning('You must login to update profile.');
      }
      this.userinfo = data.user;
      this.profileForm.value.name = this.userinfo.name;
    }, error => console.log(error));

    this.profileForm = this.fb.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      avatar: ['', [Validators.required]],
    });
  }

  updateUser() {
    this.profileForm.value.avatar = this.firebase.fb;
    this.profileForm.value.username = this.userinfo.username;
    this.profileForm.value.id = this.userinfo.id;
    if (this.profileForm.valid) {
      const data = this.profileForm.value;
      this.userService.updateUser(data, data.id)
        .subscribe((data: any) => {
          console.log(data);
          if (data.status) {
            this.token.signOut();
            this.toastr.warning('You must login to update profile.');
          }
          // this.routes.navigate(['list']);
          this.updateSuccess();
          this.isUpdate = true;
          this.isUpdateFailed = false;
        }, error => {
          console.log(error);
          this.isUpdate = false;
          this.isUpdateFailed = true;
          this.toastr.warning('Update failed. Please try again!')
        });
    }
  }

  updateSuccess() {
    this.toastr.success('Cập nhật thành công');
    this.routes.navigate(['']);
  }
}
