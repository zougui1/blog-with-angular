import { Component, OnInit, HostListener } from '@angular/core';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLogged: boolean = false;
  loggedUser: any;
  isOnTop: boolean = false;
  @HostListener('window:scroll', ['$event'])
  scrollHandler(event) {

    if (window.pageYOffset > 10) this.isOnTop = true;
    else this.isOnTop = false;
  }

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.isLogged = this.usersService.isLogged;
    this.loggedUser = this.usersService.loggedUser;
  }

}
