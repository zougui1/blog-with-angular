import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { formatDate } from '@angular/common';
import * as crypto from 'crypto-browserify';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent {

  isFormValid: boolean;
  arePasswordsSame: boolean;

  username = new FormControl('', [
    Validators.required
  ]);

  email = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  password = new FormControl('', [
    Validators.required
  ]);

  confirmPassword = new FormControl('', [
    Validators.required,
    this.confirmPasswordValidator.bind(this)
  ]);

  matcher = new MyErrorStateMatcher();

  constructor(private authService: AuthService, private router: Router) { }

  confirmPasswordValidator(fieldControl: FormControl) {
    return fieldControl.value === this.password.value ? null : {NotEqual: true};
  }

  onSubmit() {
    let username = this.username;
    let email = this.email;
    let password = this.password;
    let confirmPassword = this.confirmPassword;

    if(username.valid && email.valid && password.valid && confirmPassword.valid) {
      const passwordHash = crypto.createHmac('sha512', password.value).update('I love dragons').digest('hex');
      let date = Date.now();

      let formData = {
        username: username.value,
        email: email.value,
        password: passwordHash,
        //image: image.value,
        //presentation: presentation.value,
        roleId: 0,
        statusId: 0,
        dateCreated: date,
        dateUpdated: date,
        lastLogin: date,
        numberOfPosts: 0,
        numberOfComments: 0,
        postsLiked: ['like'],
        postsDisliked: ['dislike'],
        commentsLiked: ['like'],
        commentsDisliked: ['dislike']
      };

      this.authService.signup(formData);
    }
  }

}
