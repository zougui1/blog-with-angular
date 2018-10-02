import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { UtilsService } from './utils.service';
import { DbListsService } from './db-lists.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  categoryList = this.dbListService.getCategories();

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
  insertCategoryIfNotExisting(categories) {
    let i = 0;
    categories.forEach(category => {
      let options = {
        dbList: '/categories',
        element: category,
        index: i,
        callback: this.insert,
        firebase: this.firebase
      };
      
      this.utilsService.doesElementExist(options);
      ++i;
    });
  }

  insert(firebase, category) {
    let categoryList = firebase.list('/categories');
    categoryList.set(category.name.toLowerCase(), category);
  }

}
