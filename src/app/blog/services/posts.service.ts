import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
//import { Router } from '@angular/router';
import { DbListsService } from './db-lists.service';
import { UsersService } from './users.service';
import { UtilsService } from './utils.service';
import { JoinsService } from './joins.service';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  postSubject = new Subject<any[]>();
  postList = this.dbListService.getPosts();

  constructor(
    //private router: Router,
    private dbListService: DbListsService,
    private usersService: UsersService,
    private utilsService: UtilsService,
    private joinsService: JoinsService
  ) { }

  getPost(id) {
    return this.dbListService.getPost(id);
  }

  insertPost(obj) {
    let id;
    let posts$ = this.postList.subscribe(
      posts => {
        id = posts.length.toString();
        posts$.unsubscribe();

        let date = Date.now();
        obj = {
          title: obj.title,
          resume: obj.resume,
          originalContent: obj.content,
          editedContent: obj.content,
          categories: obj.categories,
          tags: obj.tags,
          dateCreated: date,
          dateUpdated: date,
          numberOfViews: 0,
          numberOfComments: 0,
          like: 0,
          dislike: 0,
          userId: obj.userId,
          id: id + date
        }
        let postList = this.dbListService.getPosts(false);
        postList.set(obj.id, obj);
        //this.router.navigate(['/blog/posts']);
      }
    )
  }

  getUser(id) {
    return this.dbListService.getUser(id);
  }

  //TODO refacto
  addLike(postId) {
    let userId = this.usersService.loggedUser.userId.toString();
    let user = this.getUser(userId);
    let user$ = user.subscribe(
      userObject => {
        let postsLiked = this.joinsService.retrievePropertyToJoin(userObject.payload.val(), 'postsLiked');
        if(!this.utilsService.valInArray(postId, postsLiked).exist) {
          postsLiked.push(postId);
          this.dbListService.getUsers(false).update(userId, { postsLiked: postsLiked });

          let posts$ = this.dbListService.getPost(postId).subscribe(
            postObject => {
              let like = this.joinsService.retrievePropertyToJoin(postObject.payload.val(), 'like');
              this.dbListService.getPosts(false).update(postId, { like: like+1 });
              posts$.unsubscribe();
              user$.unsubscribe();
            }
          )
        }
      }
    )
  }

  //TODO refacto
  addDislike(postId) {
    let userId = this.usersService.loggedUser.userId.toString();
    let user = this.getUser(userId);
    let user$ = user.subscribe(
      userObject => {
        let postsDisliked = this.joinsService.retrievePropertyToJoin(userObject.payload.val(), 'postsDisliked');
        if(!this.utilsService.valInArray(postId, postsDisliked).exist) {
          postsDisliked.push(postId);
          this.dbListService.getUsers(false).update(userId, { postsDisliked: postsDisliked });

          let posts$ = this.dbListService.getPost(postId).subscribe(
            postObject => {
              let dislike = this.joinsService.retrievePropertyToJoin(postObject.payload.val(), 'dislike');
              this.dbListService.getPosts(false).update(postId, { dislike: dislike+1 });
              posts$.unsubscribe();
              user$.unsubscribe();
            }
          )
        }
      }
    )
  }

  //TODO refacto
  removeLike(postId) {
    let userId = this.usersService.loggedUser.userId.toString();
    let user = this.getUser(userId);
    let user$ = user.subscribe(
      userObject => {
        let postsLiked = this.joinsService.retrievePropertyToJoin(userObject.payload.val(), 'postsLiked');
        let postLikedObject = this.utilsService.valInArray(postId, postsLiked);
        if (postLikedObject.exist) {
          postsLiked.splice(postLikedObject.index, 1);
          this.dbListService.getUsers(false).update(userId, { postsLiked: postsLiked });

          let posts$ = this.dbListService.getPost(postId).subscribe(
            postObject => {
              let like = this.joinsService.retrievePropertyToJoin(postObject.payload.val(), 'like');
              this.dbListService.getPosts(false).update(postId, { like: like-1 });
              posts$.unsubscribe();
              user$.unsubscribe();
            }
          )
        }
      }
    )
  }

  //TODO refacto
  removeDislike(postId) {
    let userId = this.usersService.loggedUser.userId.toString();
    let user = this.getUser(userId);
    let user$ = user.subscribe(
      userObject => {
        let postsDisliked = this.joinsService.retrievePropertyToJoin(userObject.payload.val(), 'postsDisliked');
        let postDislikedObject = this.utilsService.valInArray(postId, postsDisliked);
        if (postDislikedObject.exist) {
          postsDisliked.splice(postDislikedObject.index, 1);
          this.dbListService.getUsers(false).update(userId, { postsDisliked: postsDisliked });

          let posts$ = this.dbListService.getPost(postId).subscribe(
            postObject => {
              let dislike = this.joinsService.retrievePropertyToJoin(postObject.payload.val(), 'dislike');
              this.dbListService.getPosts(false).update(postId, { dislike: dislike - 1 });
              posts$.unsubscribe();
              user$.unsubscribe();
            }
          )
        }
      }
    )
  }

}
