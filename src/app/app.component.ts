import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'blog';
  template;

  constructor(private http: Http) { }

  ngOnInit() {
    /*this.http.get('http://localhost/php/')
      .subscribe((data) => {
        console.log('Got some data from backend ', data);
        this.template = JSON.parse(data._body);
      }, (error) => {
        console.log('error! ', error);
    });*/
  }
}
