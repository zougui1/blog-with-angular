import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule,
         MatMenuModule,
         MatInputModule,
         MatFormFieldModule,
         MatCardModule,
         MatListModule,
         MatRippleModule,
         MatChipsModule,
         MatAutocompleteModule,
         MatIconModule,
         MatTooltipModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BlogComponent } from './blog/blog.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UsersComponent } from './users/users.component';

import { BlogRoutingModule } from './blog-routing.module';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { SignupComponent } from './signup/signup.component';
import { PostsComponent } from './posts/posts.component';
import { CategoriesComponent } from './categories/categories.component';
import { StatusPipe } from './pipes/status.pipe';
import { UserComponent } from './user/user.component';
import { PostCreationComponent } from './post-creation/post-creation.component';
import { TagsComponent } from './tags/tags.component';
import { PostComponent } from './post/post.component';
import { CommentComponentForm } from './comment-form/comment-form.component';
import { CommentsComponent } from './comments/comments.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatListModule,
    MatRippleModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatIconModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    BlogRoutingModule,
  ],
  declarations: [
    BlogComponent,
    StatusPipe,
    NavbarComponent,
    UsersComponent,
    SignupFormComponent,
    SignupComponent,
    PostsComponent,
    CategoriesComponent,
    UserComponent,
    PostCreationComponent,
    TagsComponent,
    PostComponent,
    CommentComponentForm,
    CommentsComponent,
  ],
  exports: [
    NavbarComponent,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatIconModule,
    MatTooltipModule,
  ]
})
export class BlogModule { }
