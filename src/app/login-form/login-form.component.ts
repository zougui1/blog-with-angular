import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../blog/services/users.service';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import * as crypto from 'crypto-browserify';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

  userInexisting: boolean = false;

  email = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  password = new FormControl('', [
    Validators.required
  ]);

  matcher = new MyErrorStateMatcher();

  constructor(
      private authService: AuthService,
      private router: Router,
      private usersService: UsersService
    ) { }

  onSubmit() {
    let email = this.email;
    let password = this.password;

    if(email.valid && password.valid) {
      const passwordHash = crypto.createHmac('sha512', password.value).update('I love dragons').digest('hex');
      let date = Date.now();

      let formData = {
        email: email.value,
        password: passwordHash,
        lastLogin: date
      };

      this.authService.login(formData);
      setTimeout(() => {
        this.userInexisting = this.usersService.userInexisting;
      }, 2000);
    }
  }

}

