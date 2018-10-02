import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { JoinsService } from '../services/joins.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  title = 'posts';
  posts: Array<Object>;

  constructor(private postsService: PostsService, private joinsService: JoinsService) { }

  ngOnInit() {
    this.postsService.postList.subscribe(
      posts => {
        this.posts = [];
        posts.forEach(async post => {
          // user join
          await this.postsService.getUser(post.payload.val().userId).subscribe(
            userObject => {
              console.log(userObject)
              console.log(userObject.payload)
              console.log(userObject.payload.val())
              let username = this.joinsService.retrievePropertyToJoin(userObject.payload.val(), 'username');
              let updatedPost = this.joinsService.joinObject(post.payload.val(), { username: username });
              this.posts.push(updatedPost);
              this.posts.reverse();
            }
          );
        })
      }
    ) 
    
  }

}

