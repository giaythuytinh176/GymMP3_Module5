import {AfterContentChecked, AfterContentInit, AfterViewChecked, Component, DoCheck, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators
} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from 'src/app/auth/auth.service';
import {SignupInfo} from 'src/app/auth/signup-info';
import {ErrorStateMatcher} from "@angular/material/core";
import {transition, trigger, useAnimation} from "@angular/animations";
import {shake} from "ng-animate";
import {UserService} from "../../services/userManager/user.service";
import {Subject} from "rxjs";
import {concatMap, debounceTime, distinctUntilChanged, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [
    trigger('shake', [transition('* => *', useAnimation(shake))])
  ],
})
export class RegisterComponent implements OnInit, AfterViewChecked {

  register: { username: string, phone: string, password: string, password_confirmation: string };
  signupInfo: SignupInfo;
  registerForm!: FormGroup;
  matcher = new MyErrorStateMatcher();
  shake: any;
  username: any;
  existUserMess = false;
  check$ = new Subject<string>();

  constructor(private authService: AuthService,
              private route: Router,
              private toastr: ToastrService,
              private fb: FormBuilder,
              private userService: UserService,
  ) {
  }

  ngAfterViewChecked() {

  }

  ngOnInit() {
    // this.check$.pipe(
    //   //throttleTime(300),
    //   debounceTime(300),
    //   distinctUntilChanged(),
    //   //concatMap(value =>
    //   switchMap(value =>
    //     this.userService.checkExistUser(value)
    //   )
    // ).subscribe(
    //   (next) => {
    //     this.existUserMess = false;
    //     console.log(next);
    //   }, error => {
    //     console.log(error);
    //     if (JSON.parse(error.error).username[0] == 'The username has already been taken.') {
    //       this.existUserMess = true;
    //     }
    //   });
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(/^0\d{9,10}$/)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(8)]],
      password_confirmation: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(8)]]
    }, {validators: this.checkPasswords});
  }

  onInput(event): any {
    this.username = event.target.value;
    this.userService.checkExistUser(this.username).subscribe(
      (data: any) => {
        this.existUserMess = false;
        // console.log(data);
      },
      error => {
        // console.log(error);
        if (JSON.parse(error.error).username[0] == 'The username has already been taken.') {
          this.existUserMess = true;
        }
      }
    );
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    const password = group.get('password').value;
    const password_confirmation = group.get('password_confirmation').value;
    return password === password_confirmation ? null : {passwordnotmatch: true}
  }

  comparePassword(c: AbstractControl) {
    const v = c.value;
    return (v.password === v.password_confirmation) ? null : {
      passwordnotmatch: true
    };
  }

  onSubmit() {
    // console.log(this.register);
    this.register = this.registerForm.value;
    this.signupInfo = new SignupInfo(
      this.register.username,
      this.register.phone,
      this.register.password,
      this.register.password_confirmation
    );
    this.authService.signUp(this.signupInfo).subscribe(
      (data: any) => {
        // console.log(data);
        // console.log(111);
        if (data.error || data.status) {
          this.toastr.warning('Something wrong.')
          setTimeout(() => {
            window.location.reload();
          }, 1000);
          this.route.navigate(['/signup']);
        } else {
          this.toastr.success('Your account has been created successfully!');
          this.route.navigate(['/browse']);
        }
      },
      err => {
        // console.log(err);
        // console.log(JSON.parse(err.error));
        // console.log(222);
        if ((JSON.parse(err.error)).username == 'The username has already been taken.') {
          this.toastr.warning('The username already exists!');
        } else if ((JSON.parse(err.error)).phone == 'The phone has already been taken.') {
          this.toastr.warning('The phone already exists!');
        } else {
          this.toastr.warning('Something wrong.')
        }
      }
    );
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control?.invalid && control?.parent?.dirty);
    const invalidParent = !!(control?.parent?.invalid && control?.parent?.dirty);

    return invalidCtrl || invalidParent;
  }
}
