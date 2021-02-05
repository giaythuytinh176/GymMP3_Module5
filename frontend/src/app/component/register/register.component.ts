import {Component, OnInit} from '@angular/core';
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

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [
    trigger('shake', [transition('* => *', useAnimation(shake))])
  ],
})
export class RegisterComponent implements OnInit {

  register: { username: string, phone: string, password: string, password_confirmation: string };
  signupInfo: SignupInfo;
  registerForm!: FormGroup;
  matcher = new MyErrorStateMatcher();
  shake: any;

  constructor(private authService: AuthService,
              private route: Router,
              private toastr: ToastrService,
              private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(/^0\d{9,10}$/)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(8)]],
      password_confirmation: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(8)]]
    }, {validators: this.checkPasswords});
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    const password = group.get('password').value;
    const password_confirmation = group.get('password_confirmation').value;
    return password === password_confirmation ? null : { passwordnotmatch: true }
  }

  comparePassword(c: AbstractControl) {
    const v = c.value;
    return (v.password === v.password_confirmation) ? null : {
      passwordnotmatch: true
    };
  }

  onSubmit() {
    console.log(this.register);
    this.register = this.registerForm.value;
    this.signupInfo = new SignupInfo(
      this.register.username,
      this.register.phone,
      this.register.password,
      this.register.password_confirmation
    );
    this.authService.signUp(this.signupInfo).subscribe(
      (data: any) => {
        console.log(data);
        this.toastr.success('Your account has been created successfully!');
        this.route.navigate(['/browse']);
      },
      error => {
        console.log(error);
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
