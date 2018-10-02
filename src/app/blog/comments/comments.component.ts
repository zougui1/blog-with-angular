import { Component, OnInit, Input } from '@angular/core';
import { CommentService } from '../services/comment.service';
import { JoinsService } from '../services/joins.service';
import { UsersService } from '../services/users.service';
import { DbListsService } from '../services/db-lists.service';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  comments: Array<Object>;
  isLogged: boolean = false;
  loggedUser;
  isLiked: boolean = false;
  isDisliked: boolean = false;

  @Input() postId;

  constructor(
    private commentsService: CommentService,
    private joinsService: JoinsService,
    private usersService: UsersService,
    private dbListService: DbListsService,
    private utilsService: UtilsService
  ) { }

  ngOnInit() {
    this.isLogged = this.usersService.isLogged;
    this.loggedUser = this.usersService.loggedUser;

    this.commentsService.commentList.subscribe(
      comments => {
        this.comments = [];
        let orderedComments = [];
        comments.forEach(comment => {
          // user join
          this.commentsService.getUser(comment.payload.val().userId).subscribe(
            userObject => {
              if (userObject.payload.val() && this.postId == comment.payload.val().postId) {
                let username = this.joinsService.retrievePropertyToJoin(userObject.payload.val(), 'username');
                let updatedComment = this.joinsService.joinObject(comment.payload.val(), { username: username });
                this.comments.push(updatedComment);
                this.comments.reverse();
              }
            }
          );
        })
      }
    )

    if(this.isLogged) {
      setTimeout(() => {
        this.dbListService.getUser(this.loggedUser.userId).subscribe(
          userObject => {
            this.comments.forEach(comment => {
              let commentsLiked = this.joinsService.retrievePropertyToJoin(userObject.payload.val(), 'commentsLiked');
              let isLiked = this.utilsService.valInArray(this.joinsService.retrievePropertyToJoin(comment, 'id'), commentsLiked).exist;
              if (isLiked) this.isLiked = true;
              else {
                let commentsDisliked = this.joinsService.retrievePropertyToJoin(userObject.payload.val(), 'commentsDisliked');
                let isDisliked = this.utilsService.valInArray(this.joinsService.retrievePropertyToJoin(comment, 'id'), commentsDisliked).exist;
                if (isDisliked) this.isDisliked = true;
              }
            });
          }
        )
      }, 500);
    }

  }

  onLike(id) {
    if(this.isLogged) {
      if(this.isLiked) {
        this.commentsService.removeLike(id);
        this.isLiked = false;
      }
      else {
        if(this.isDisliked) {
          this.commentsService.removeDislike(id);
          this.isDisliked = false;
        }
        this.commentsService.addLike(id);
        this.isLiked = true;
      }
    }
  }

  onDislike(id) {
    if(this.isLogged) {
      if(this.isDisliked) {
        this.commentsService.removeDislike(id);
        this.isDisliked = false;
      }
      else {
        if(this.isLiked) {
          this.commentsService.removeLike(id);
          this.isLiked = false;
        }
        this.commentsService.addDislike(id);
        this.isDisliked = true;
      }
    }
  }

}
