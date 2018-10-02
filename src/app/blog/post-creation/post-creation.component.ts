import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatChipInputEvent } from '@angular/material';
import { ErrorStateMatcher } from '@angular/material/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CategoriesService } from '../services/categories.service';
import { UsersService } from '../services/users.service';
import { PostsService } from '../services/posts.service';
import { TagService } from '../services/tag.service';
import { JoinsService } from '../services/joins.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-post-creation',
  templateUrl: './post-creation.component.html',
  styleUrls: ['./post-creation.component.scss']
})
export class PostCreationComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  filteredCategories: Observable<string[]>;
  categories: string[] = [];
  allCategories: string[] = [];

  filteredTags: Observable<string[]>;
  tags: string[] = [];
  allTags: string[] = [];

  title = new FormControl('', [
    Validators.required
  ]);

  resume = new FormControl('', [
    Validators.required
  ]);

  content = new FormControl('', [
    Validators.required
  ]);

  categoryCtrl = new FormControl();

  tagCtrl = new FormControl();

  @ViewChild('categoryInput') categoryInput: ElementRef<HTMLInputElement>;
  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;

  constructor(
    private categoriesService: CategoriesService,
    private tagsService: TagService,
    private usersService: UsersService,
    private postsService: PostsService,
    private tagService: TagService,
    private joinsService: JoinsService
  ) { }

  ngOnInit() {
   this.categoriesService.categoryList.subscribe(
      categories => {
        this.allCategories = [];
        categories.map(category => {
          let categoryName = this.joinsService.retrievePropertyToJoin(category.payload.val(), 'name');
          this.allCategories.push(categoryName);
        });
      }
    )
    this.tagService.tagList.subscribe(
      tags => {
        this.allTags = [];
        tags.map(tag => {
          let tagName = this.joinsService.retrievePropertyToJoin(tag.payload.val(), 'name');
          this.allTags.push(tagName);
        });
      }
    )

    this.filteredCategories = this.categoryCtrl.valueChanges.pipe(
      startWith(null),
      map((category: string | null) => category ? this._filter(category, 'category') : this.allCategories.slice())
    )
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => tag ? this._filter(tag, 'tag') : this.allTags.slice())
    )
  }

  matcher = new MyErrorStateMatcher();
  
  onSubmit() {
    let title = this.title;
    let resume = this.resume;
    let content = this.content;
    let categories = this.categories;
    let tags = this.tags;

    if(title.valid && resume.valid && content.valid && this.categoryCtrl.valid && this.tagCtrl.valid) {
      let date = Date.now();

      let formData = {
        title: title.value.trim(),
        resume: resume.value,
        content: content.value,
        categories: categories,
        tags: tags,
        userId: this.usersService.loggedUser.userId
      }
      this.categoriesService.insertCategoryIfNotExisting(categories);
      this.tagsService.insertTagIfNotExisting(tags);
      //this.postsService.insertPost(formData);
    }
  }

  add(event: MatChipInputEvent, type): void {
    const input = event.input;
    const value = event.value;

    if (type === 'category') {
      if ((value || '').trim()) {
        this.categories.push(value.trim());
      }

      if (input) {
        input.value = '';
      }

      this.categoryCtrl.setValue(null);
    } else if (type === 'tag') {
      if ((value || '').trim()) {
        this.tags.push(value.trim());
      }

      if (input) {
        input.value = '';
      }

      this.tagCtrl.setValue(null);
    }
  }

  remove(value: string, type): void {
    if (type === 'category') {
      const index = this.categories.indexOf(value);

      if (index >= 0) {
        this.categories.splice(index, 1);
      }
    } else if (type === 'tag') {
      const index = this.tags.indexOf(value);

      if (index >= 0) {
        this.tags.splice(index, 1);
      }
    }
  }

  selected(event: MatAutocompleteSelectedEvent, type): void {
    if (type === 'category') {
      this.categories.push(event.option.viewValue);
      this.categoryInput.nativeElement.value = '';
      this.categoryCtrl.setValue(null);
    } else if (type === 'tag') {
      this.tags.push(event.option.viewValue);
      this.tagInput.nativeElement.value = '';
      this.tagCtrl.setValue(null);
    }
  }

  private _filter(value: string, type): string[] {
    const filterValue = value.toLowerCase();
    if(type === 'category')
      return this.allCategories.filter(category => category.toLowerCase().indexOf(filterValue) === 0);
    else if(type === 'tag')
      return this.allTags.filter(tag => tag.toLowerCase().indexOf(filterValue) === 0);
  }

}
