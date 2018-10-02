import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class DbListsService {

  constructor(private firebase: AngularFireDatabase) { }

  getUsers(withSnapshot = true): any {
    if(withSnapshot)
      return this.firebase.list('/users').snapshotChanges();
    return this.firebase.list('/users');
  }

  getCategories(withSnapshot = true): any {
    if(withSnapshot)
      return this.firebase.list('/categories').snapshotChanges();
    return this.firebase.list('/categories');
  }

  getTags(withSnapshot = true): any {
    if(withSnapshot)
      return this.firebase.list('/tags').snapshotChanges();
    return this.firebase.list('/tags');
  }

  getPosts(withSnapshot = true): any {
    if(withSnapshot)
      return this.firebase.list('/posts').snapshotChanges();
    return this.firebase.list('/posts');
  }

  getComments(withSnapshot = true): any {
    if(withSnapshot)
      return this.firebase.list('/comments').snapshotChanges();
    return this.firebase.list('/comments');
  }

  getRoles(withSnapshot = true): any {
    if(withSnapshot)
      return this.firebase.list('/roles').snapshotChanges();
    return this.firebase.list('/roles');
  }

  getAllStatus(withSnapshot = true): any {
    if(withSnapshot)
      return this.firebase.list('/status').snapshotChanges();
    return this.firebase.list('/status');
  }

  getUser(id) {
    return this.firebase.object(`/users/${id}`).snapshotChanges();
  }

  getCategory(id) {
    return this.firebase.object(`/categories/${id}`).snapshotChanges();
  }

  getTag(id) {
    return this.firebase.object(`/tags/${id}`).snapshotChanges();
  }

  getPost(id) {
    return this.firebase.object(`/posts/${id}`).snapshotChanges();
  }

  getComment(id) {
    return this.firebase.object(`/comments/${id}`).snapshotChanges();
  }

  getRole(id) {
    return this.firebase.object(`/roles/${id}`).snapshotChanges();
  }

  getOneStatus(id) {
    return this.firebase.object(`/status/${id}`).snapshotChanges();
  }

}
