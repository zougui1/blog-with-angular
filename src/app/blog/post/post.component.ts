import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../services/users.service';
import { async } from 'rxjs/internal/scheduler/async';
import { JoinsService } from '../services/joins.service';
import { DbListsService } from '../services/db-lists.service';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  post;
  isLogged: boolean = false;
  loggedUser;
  postId: number;
  isLiked: boolean = false;
  isDisliked: boolean = false;
  url: string;

  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute,
    private usersService: UsersService,
    private joinsService: JoinsService,
    private dbListService: DbListsService,
    private utilsService: UtilsService
    ) { }

  ngOnInit() {
    this.isLogged = this.usersService.isLogged;
    this.loggedUser = this.usersService.loggedUser;
    
    this.route.params.subscribe(params => {
      this.postId = params['id'];
    });
    this.postsService.getPost(this.postId).subscribe(
      post => {
        let userId = this.joinsService.retrievePropertyToJoin(post.payload.val(), 'userId');
        this.postsService.getUser(userId).subscribe(
          userObject => {
            let retrieve = {
              object: userObject.payload.val(),
              prefix: '',
              properties: ['username']
            };
            let tempPost = this.joinsService.join(retrieve, post.payload.val());
            this.post = tempPost;
          }
        )
      }
    )

    if(this.isLogged) {
      setTimeout(() => {
        this.dbListService.getUser(this.loggedUser.userId).subscribe(
          userObject => {
            let postsLiked = this.joinsService.retrievePropertyToJoin(userObject.payload.val(), 'postsLiked');
            let isLiked = this.utilsService.valInArray(this.post.id, postsLiked).exist;
            if (isLiked) this.isLiked = true;
            else {
            let postsDisliked = this.joinsService.retrievePropertyToJoin(userObject.payload.val(), 'postsDisliked');
              let isDisliked = this.utilsService.valInArray(this.post.id, postsDisliked).exist;
              if (isDisliked) this.isDisliked = true;
            }
          }
        )
      }, 500);
    }
  }

  onLike() {
    if(this.isLogged) {
      if(this.isLiked) {
        this.postsService.removeLike(this.post.id);
        this.isLiked = false;
      }
      else {
        if(this.isDisliked) {
          this.postsService.removeDislike(this.post.id);
          this.isDisliked = false;
        }
        this.postsService.addLike(this.post.id);
        this.isLiked = true;
      }
    }
  }

  onDislike() {
    if(this.isLogged) {
      if(this.isDisliked) {
        this.postsService.removeDislike(this.post.id);
        this.isDisliked = false;
      }
      else {
        if(this.isLiked) {
          this.postsService.removeLike(this.post.id);
          this.isLiked = false;
        }
        this.postsService.addDislike(this.post.id);
        this.isDisliked = true;
      }
    }
  }

}
