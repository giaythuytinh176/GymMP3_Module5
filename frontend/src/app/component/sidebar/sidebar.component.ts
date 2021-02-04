import {Component, OnInit} from '@angular/core';
import {LoginComponent} from "../login/login.component";
import {UserService} from "../../services/user.service";
import {TokenStorageService} from "../../auth/token-storage.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isLoggedIn = false;

  constructor(
    public loginComponent: LoginComponent,
    private userService: UserService,
    private token: TokenStorageService,
    private toastr: ToastrService,
  ) {
  }

  ngOnInit(): void {
    this.userService.getInfoUserToken().subscribe((data: any) => {
      console.log(data);
      if (data.status) {
        this.isLoggedIn = false;
      } else {
        this.isLoggedIn = true;
      }
    }, error => console.log(error));
  }

}
