import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private firebase: AngularFireDatabase, private usersService: UsersService) { }


  /**
   * @param {Object} options - options object
   * @param {string} options.dbList - the link to a list from the database
   * @param {string} options.element - the element's name to save in the database
   * @param {number} options.index - an index used to the id of the element to save in the database
   * @param {function} options.callback - a callback that save the object in the database
   * @param {class} options.firebase - the class of AngularFire 2
   */
  doesElementExist(options) {
    let dbList = this.firebase.list(options.dbList);
    let list$ = dbList.snapshotChanges().subscribe(
      list => {
        let date = Date.now();
        let elementObject = {
          name: options.element,
          createdBy: this.usersService.loggedUser.userId,
          creatorName: this.usersService.loggedUser.username,
          dateCreated: date,
          numberOfUses: 1,
          id: list.length + options.index + date
        }
        if (!this.inArray(options.element, list) || list.length === 0) {
          options.callback(options.firebase, elementObject);
        };
        list$.unsubscribe();
      }
    );
  }

  inArray(needle, haystack) {
    var length = haystack.length;
    for (var i = 0; i < length; i++) {
      if (haystack[i].payload.val().name.toLowerCase() == needle.toLowerCase()) return true;
    }
    return false;
  }

  valInArray(needle, haystack) {
    var length = haystack.length;
    for (var i = 0; i < length; i++) {
      if (haystack[i] == needle) return {exist: true, index: i}; 
    }
    return {exist: false};
  }
  
}
