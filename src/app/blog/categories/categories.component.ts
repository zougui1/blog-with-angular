import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  title = 'categories';
  categories: Array<Object>;

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.categoriesService.categoryList.subscribe(
      categories => {
        this.categories = [];
        categories.map(category => {
          this.categories.push(category.payload.val());
        });
      }
    )
  }

}
