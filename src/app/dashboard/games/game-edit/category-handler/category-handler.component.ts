import {Component, OnInit} from '@angular/core';
import {Category} from '../../../../model/category.model';
import {GameService} from '../../game.service';
import {CategoryService} from '../../../categories/category.service';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-category-handler',
  templateUrl: './category-handler.component.html',
  styleUrls: ['./category-handler.component.css']
})
export class CategoryHandlerComponent implements OnInit {
  allCategories: string[];
  currentCategories: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>(null);

  constructor(private service: GameService,
              private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.categoryService.fetchNames().subscribe(categories => this.allCategories = categories.slice());
    this.service.detailedGameSubject.subscribe(game => this.currentCategories.next(game.categories));
  }

}
