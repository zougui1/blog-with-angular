import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from '../services/users.service';
import { StatusPipe } from '../pipes/status.pipe';
import { JoinsService } from '../services/joins.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  title = 'users';
  users: Array<Object> = [];
  usersList$;

  constructor(private usersService: UsersService, private joinsService: JoinsService) { }

  ngOnInit() {
    this.users = [];
    this.usersList$ = this.usersService.userList.subscribe(
      users => {
        this.users = [];
        users.forEach(async user => {
          // status join
          let userWithStatus;
          await this.usersService.getStatus(user.payload.val().statusId).subscribe(
            statusObject => {
              let retrieve = {
                object: statusObject.payload.val(),
                prefix: 'status',
                properties: ['name']
              };
              let tempUser = this.joinsService.join(retrieve, user.payload.val());
              userWithStatus = tempUser;
            }
          );
          // role join
          await this.usersService.getRole(user.payload.val().roleId).subscribe(
            roleObject => {
              let retrieve = {
                object: roleObject.payload.val(),
                prefix: 'role',
                properties: ['name', 'power']
              };
              let tempUser = this.joinsService.join(retrieve, userWithStatus);
              this.users.push(tempUser);
            }
          )
        })
      }
    )
  }

  ngOnDestroy() {
    this.usersList$.unsubscribe();
  }

}
