import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { UtilsService } from './utils.service';
import { DbListsService } from './db-lists.service';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  tagList = this.dbListService.getTags();

  constructor(
    private firebase: AngularFireDatabase,
    private utilsService: UtilsService,
    private dbListService: DbListsService
  ) { }

  /**
   * @var {Object} options - options object
   * @var {string} options.dbList - the link to a list from the database
   * @var {string} options.element - the element's name to save in the database
   * @var {number} options.index - an index used to the id of the element to save in the database
   * @var {function} options.callback - a callback that save the object in the database
   * @var {class} options.firebase - the class of AngularFire 2
   */
  insertTagIfNotExisting(tags) {
    let i = 0;
    tags.forEach(tag => {
      let options = {
        dbList: '/tags',
        element: tag,
        index: i,
        callback: this.insert,
        firebase: this.firebase
      };

      this.utilsService.doesElementExist(options);
      ++i;
    });
  }

  insert(firebase, tag) {
    let tagList = firebase.list('/tags');
    tagList.set(tag.name.toLowerCase(), tag);
  }

}
