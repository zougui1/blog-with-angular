import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { ActivatedRoute } from '@angular/router';
import { JoinsService } from '../services/joins.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  title = 'uses';
  user: Object;
  userId: number;
  isLogged: boolean = false;
  loggedUser;
  date = Date.now();

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private joinsService: JoinsService
  ) { }

  ngOnInit() {
    this.isLogged = this.usersService.isLogged;
    this.loggedUser = this.usersService.loggedUser;

    this.route.params.subscribe(params => {
      this.userId = params['id'];
    });
    this.usersService.getUser(this.userId).subscribe(
      async user => {
        // status join
        let userWithStatus;
        let statusId = this.joinsService.retrievePropertyToJoin(user.payload.val(), 'statusId');
        await this.usersService.getStatus(statusId).subscribe(
          statusObject => {
            let retrieve = {
              object: statusObject.payload.val(),
              prefix: 'status',
              properties: [
                'name'
              ]
            };
            let tempUser = this.joinsService.join(retrieve, user.payload.val());
            userWithStatus = tempUser;
          }
        );
        // role join
        let roleId = this.joinsService.retrievePropertyToJoin(user.payload.val(), 'roleId');
        await this.usersService.getRole(roleId).subscribe(
          roleObject => {
            let retrieve = {
              object: roleObject.payload.val(),
              prefix: 'role',
              properties: [
                'name',
                'power'
              ]
            };
            let tempUser = this.joinsService.join(retrieve, userWithStatus);
            this.user = tempUser;
          }
        )
      }
    )
  }

}
