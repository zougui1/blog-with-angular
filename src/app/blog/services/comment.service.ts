import { Injectable } from '@angular/core';
import { DbListsService } from './db-lists.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { UsersService } from './users.service';
import { JoinsService } from './joins.service';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  commentList = this.dbListService.getComments();

  constructor(
    private firebase: AngularFireDatabase,
    private dbListService: DbListsService,
    private usersService: UsersService,
    private joinsService: JoinsService,
    private utilsService: UtilsService
  ) { }

  insert(data) {
    let comments$ = this.commentList.subscribe(
      comments => {
        let id = comments.length.toString();
        comments$.unsubscribe();

        let commentList = this.dbListService.getComments(false);
        let date = Date.now();
        let obj = {
          originalComment: data.comment,
          editedComment: data.comment,
          userId: data.userId,
          postId: data.postId,
          like: 0,
          dislike: 0,
          numberOfSubComment: 0,
          dateCreated: date,
          dateUpdated: date,
          id: id + date
        }

        commentList.set(obj.id, obj);
      }
    )
  }

  getUser(id) {
    return this.dbListService.getUser(id);
  }

  //TODO refacto
  addLike(id) {
    let userId = this.usersService.loggedUser.userId.toString();
    let user = this.getUser(userId);
    let user$ = user.subscribe(
      userObject => {
        let commentsLiked = this.joinsService.retrievePropertyToJoin(userObject.payload.val(), 'commentsLiked');
        if (!this.utilsService.valInArray(id, commentsLiked).exist) {
          commentsLiked.push(id);
          this.dbListService.getUsers(false).update(userId, { commentsLiked: commentsLiked });

          let comments$ = this.dbListService.getComment(id).subscribe(
            commentObject => {
              let like = this.joinsService.retrievePropertyToJoin(commentObject.payload.val(), 'like');
              this.dbListService.getComments(false).update(id, { like: like + 1 });
              comments$.unsubscribe();
              user$.unsubscribe();
            }
          )
        }
      }
    )
  }

  //TODO refacto
  addDislike(id) {
    let userId = this.usersService.loggedUser.userId.toString();
    let user = this.getUser(userId);
    let user$ = user.subscribe(
      userObject => {
        let commentsDisliked = this.joinsService.retrievePropertyToJoin(userObject.payload.val(), 'commentsDisliked');
        if (!this.utilsService.valInArray(id, commentsDisliked).exist) {
          commentsDisliked.push(id);
          this.dbListService.getUsers(false).update(userId, { commentsDisliked: commentsDisliked });

          let comments$ = this.dbListService.getComment(id).subscribe(
            commentObject => {
              let dislike = this.joinsService.retrievePropertyToJoin(commentObject.payload.val(), 'dislike');
              this.dbListService.getComments(false).update(id, { dislike: dislike + 1 });
              comments$.unsubscribe();
              user$.unsubscribe();
            }
          )
        }
      }
    )
  }

  //TODO refacto
  removeLike(id) {
    let userId = this.usersService.loggedUser.userId.toString();
    let user = this.getUser(userId);
    let user$ = user.subscribe(
      userObject => {
        let commentsLiked = this.joinsService.retrievePropertyToJoin(userObject.payload.val(), 'commentsLiked');
        let commentLikedObject = this.utilsService.valInArray(id, commentsLiked);
        if (commentLikedObject.exist) {
          commentsLiked.splice(commentLikedObject.index, 1);
          this.dbListService.getUsers(false).update(userId, { commentsLiked: commentsLiked });

          let comments$ = this.dbListService.getComment(id).subscribe(
            commentObject => {
              let like = this.joinsService.retrievePropertyToJoin(commentObject.payload.val(), 'like');
              this.dbListService.getComments(false).update(id, { like: like - 1 });
              comments$.unsubscribe();
              user$.unsubscribe();
            }
          )
        }
      }
    )
  }

  //TODO refacto
  removeDislike(id) {
    let userId = this.usersService.loggedUser.userId.toString();
    let user = this.getUser(userId);
    let user$ = user.subscribe(
      userObject => {
        let commentsDisliked = this.joinsService.retrievePropertyToJoin(userObject.payload.val(), 'commentsDisliked');
        let commentDislikedObject = this.utilsService.valInArray(id, commentsDisliked);
        if (commentDislikedObject.exist) {
          commentsDisliked.splice(commentDislikedObject.index, 1);
          this.dbListService.getUsers(false).update(userId, { commentsDisliked: commentsDisliked });

          let comments$ = this.dbListService.getComment(id).subscribe(
            commentObject => {
              let dislike = this.joinsService.retrievePropertyToJoin(commentObject.payload.val(), 'dislike');
              this.dbListService.getComments(false).update(id, { dislike: dislike - 1 });
              comments$.unsubscribe();
              user$.unsubscribe();
            }
          )
        }
      }
    )
  }

}
