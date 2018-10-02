import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Subject } from 'rxjs';
import { JoinsService } from './joins.service';
import { DbListsService } from './db-lists.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  userInexisting: boolean = false;
  isLogged: boolean = false;
  loggedUser: any = { rolePower: 0, userId: 0 };
  userList = this.dbListService.getUsers();;
  users: Array<Object>;
  userSubject = new Subject<any[]>();

  constructor(
    public firebase: AngularFireDatabase,
    private router: Router,
    private firebaseAuth: AngularFireAuth,
    private joinsService: JoinsService,
    private dbListService: DbListsService
  ) { }

  redirect(redirectUrl) {
    this.router.navigate([redirectUrl]);
  }

  createUser(formData, userId, redirectUrl) {
    let userList = this.dbListService.getUsers(false);
    let userData = Object.assign(formData, {userId: userId});
    userList.set(userId, userData)
      .then(resolve => {
        
        userData['roleName'] = 'member';
        userData['rolePower'] = 1;
        this.isLogged = true;
        this.loggedUser = userData;
        this.login(this.loggedUser);
        this.redirect('/blog/users');
      });
  }

  login(formData) {
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(formData.email, formData.password)
      .then(value => {
        this.logUser(value.user.uid, '');
      })
  }

  logUser(userId, redirectUrl) {
    let userObject = this.dbListService.getUser(userId);
    userObject.subscribe(user => {

      let roleId = this.joinsService.retrievePropertyToJoin(user.payload.val(), 'roleId');
      this.getRole(roleId).subscribe(
        roleObject => {

          let retrieve = {
            object: roleObject.payload.val(),
            prefix: 'role',
            properties: [
              'name',
              'power'
            ]
          };
          
          this.isLogged = true;
          this.loggedUser = this.joinsService.join(retrieve, user.payload.val());
          let userList = this.dbListService.getUsers(false);
          userList.update(this.loggedUser.userId, { statusId: 1 })
          this.redirect('/blog/users');        
        }
      );
    })
    setTimeout(() => {
      this.update('lastLogin');
    }, 1000);
  }

  update(update) {
    if(update = 'lastLogin') {
      let userList = this.dbListService.getUsers(false);
      userList.update(this.loggedUser.userId, { lastLogin: Date.now() })
    }
  }

  logout() {
    console.log('logout')
    let userList = this.firebase.list('/users');
    userList.update(this.loggedUser.userId, { statusId: 0 })
    this.isLogged = false;
    this.loggedUser = {rolePower: 0, userId: 0};
  }

  emitUserSubject(user) {
    this.userSubject.next(user);
  }

  getUser(userId) {
    return this.dbListService.getUser(userId);
  }

  getStatus(statusId) {
    return this.dbListService.getOneStatus(statusId);
  }

  getRole(roleId) {
    return this.dbListService.getRole(roleId);
  }

}
