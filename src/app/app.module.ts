import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { MatButtonModule, MatInputModule, MatFormFieldModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { LoginComponent } from './login/login.component';

import { AppRoutingModule } from './app-routing.module';
import { BlogModule } from './blog/blog.module';
import { LoginRoutingModule } from './login-routing.module';

import { AuthService } from './services/auth.service';

import { environment } from '../environments/environment';
import { FirebaseAppConfig } from 'angularfire2';
import { LogoutComponent } from './logout/logout.component';

const firebaseConfig: FirebaseAppConfig = {
  apiKey: "AIzaSyBYinxf0BxW1obUJac0nqYEU__eOkp7d9E",
  authDomain: "fir-blog-c4df6.firebaseapp.com",
  databaseURL: "https://fir-blog-c4df6.firebaseio.com",
  projectId: "fir-blog-c4df6",
  storageBucket: "fir-blog-c4df6.appspot.com",
  messagingSenderId: "871635572930"
}

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    LoginComponent,
    LogoutComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireAuthModule,
    MatButtonModule,
    //MatInputModule,
    //MatFormFieldModule,
    BrowserAnimationsModule,
    //FormsModule,
    //ReactiveFormsModule,
    BlogModule,
    LoginRoutingModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
