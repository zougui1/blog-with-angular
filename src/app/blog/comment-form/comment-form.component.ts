import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { CommentService } from '../services/comment.service';
import { UsersService } from '../services/users.service';
import { ActivatedRoute } from '@angular/router';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentComponentForm implements OnInit {

  isLogged = this.usersService.isLogged;
  loggedUser = this.usersService.loggedUser;
  postId: string;

  comment = new FormControl('', [
    Validators.required
  ]);

  constructor(
    private commentsService: CommentService,
    private usersService: UsersService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.route.params.subscribe(params => {
      this.postId = params['id'];
    })

    let comment = this.comment;
    if(comment.valid) {
      let data = {
        comment: comment.value,
        userId: this.loggedUser.userId,
        postId: this.postId
      }

      this.commentsService.insert(data);
      comment.setValue('');
    }
  }

  matcher = new MyErrorStateMatcher();

}
