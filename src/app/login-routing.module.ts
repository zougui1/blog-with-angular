import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './blog/signup/signup.component';
import { LogoutComponent } from './logout/logout.component';

const loginRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'blog/signup', component: SignupComponent },
  { path: 'logout', component: LogoutComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(loginRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthGuardService,
    AuthService
  ]
})
export class LoginRoutingModule { }
