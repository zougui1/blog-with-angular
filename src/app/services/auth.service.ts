import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AngularFireDatabase, AngularFireList, AngularFireAction } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UsersService } from '../blog/services/users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  redirectUrl: string;
  userList: AngularFireList<any>;

  constructor(
    private firebaseAuth: AngularFireAuth,
    private router: Router,
    private usersService: UsersService
  ) { }

  redirect() {
    this.router.navigate([this.redirectUrl]);
  }

  login(formData) {
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(formData.email, formData.password)
      .then(value => {
        this.usersService.logUser(value.user.uid, this.redirectUrl);
      })
  }

  signup(formData) {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(formData.email, formData.password)
      .then(value => {
        this.usersService.createUser(formData, value.user.uid, this.redirectUrl);
    })
  }

  logout(): void {
    this.firebaseAuth
      .auth
      .signOut().then(() => {
        this.usersService.logout();
      })
  }

}
