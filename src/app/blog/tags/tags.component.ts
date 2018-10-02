import { Component, OnInit } from '@angular/core';
import { TagService } from '../services/tag.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {

  tags: Array<Object>;

  constructor(private tagsService: TagService) { }

  ngOnInit() {
    this.tagsService.tagList.subscribe(
      tags => {
        this.tags = [];
        tags.map(tag => {
          this.tags.push(tag.payload.val());
        });
      }
    )
  }

}
