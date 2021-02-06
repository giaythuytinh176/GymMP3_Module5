import {Component, OnInit} from '@angular/core';
import {LoginComponent} from "../login/login.component";
import {UserService} from "../../services/user.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {Users} from "../../model/users/users";
import {TokenStorageService} from "../../auth/token-storage.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isLoggedIn = false;
  user: Users;

  constructor(
    public loginComponent: LoginComponent,
    private userService: UserService,
    private token: TokenStorageService,
    private toastr: ToastrService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    if (this.token.getToken()) {
      this.userService.getInfoUserToken().subscribe((data: any) => {
        console.log(data);
        if (data.status) {
          this.isLoggedIn = false;
        } else {
          this.user = data.user;
          this.isLoggedIn = true;
        }
      }, error => {
        console.log(error);
        this.isLoggedIn = false;
      });
    }
  }

}
