import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BlogComponent } from './blog/blog.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './user/user.component';
import { PostsComponent } from './posts/posts.component';
import { CategoriesComponent } from './categories/categories.component';
import { PostCreationComponent } from './post-creation/post-creation.component';

import { AuthGuardService } from '../services/auth-guard.service';
import { TagsComponent } from './tags/tags.component';
import { PostComponent } from './post/post.component';

const blogRoutes: Routes = [
  {
    path: 'blog',
    canActivate: [AuthGuardService],
    children: [
      //{ path: 'profile/[i:id]', component:  }
      { path: 'post/create', component: PostCreationComponent },
    ]
  },
  {
    path: 'blog',
    children: [
      { path: '', component: BlogComponent },
      { path: 'users', component: UsersComponent },
      { path: 'user/:id', component: UserComponent },
      { path: 'posts', component: PostsComponent },
      { path: 'post/:id', component: PostComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'tags', component: TagsComponent },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(blogRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class BlogRoutingModule { }
