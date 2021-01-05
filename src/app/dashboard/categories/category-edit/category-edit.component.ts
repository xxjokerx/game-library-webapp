import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {CategoryService} from '../category.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Category} from '../../../model/category.model';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {
  private subscription: Subscription;
  private editMode: boolean;
  private id: number;
  categoryForm: FormGroup;
  label: string;

  constructor(private service: CategoryService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(
      (params: Params) => {
        const id = 'id';
        this.id = +params[id];
        if (params[id]) {
          this.editMode = true;
        } else {
          this.editMode = false;
        }
        this.initFrom();
      }
    );
  }

  onSubmit(): void {
    const category = this.categoryForm.value;

    if (this.editMode) {
      this.service
        .edit(this.id, category);
    } else {
      this.service
        .add(category);
    }
    this.onCancel();
  }

  onCancel(): void {
    this.router.navigate(['../'], {relativeTo: this.route});
  }


  private initFrom(): void {
    let categoryName = '';


    if (this.editMode) {
      const category: Category = this.service.getCategoryById(this.id);
      categoryName = category.name;
      this.label = 'Édition de la catégorie \"' + categoryName + '\"';
    } else {
      this.label = 'Création d\'une catégorie';
    }
    this.service.setLowerCasedAndTrimmedCategoryNames();
    this.categoryForm = new FormGroup({
        'name': new FormControl(categoryName, [Validators.required, Validators.maxLength(50)]),
      },
      (!this.editMode) ? {validators: this.namesExistValidator.bind(this)} : {validators: this.namesExistEditModeValidator.bind(this)});
  }

  namesExistValidator(control: FormControl): ValidationErrors | null {
    const currentName = control.get('name').value.toLowerCase().trim();
    const names = this.service.getLowerCasedAndTrimmedCategoryNames();

    if (names.indexOf(currentName) !== -1) {
      return {nameAlreadyExists: true};
    }
    return null;
  }

  namesExistEditModeValidator(control: FormControl): ValidationErrors | null {
    const currentName = control.get('name').value.toLowerCase().trim();
    const names = this.service.getLowerCasedAndTrimmedCategoryNames();

    if (names.indexOf(currentName) !== -1 && currentName !== this.service.getCategoryById(this.id).name.toLowerCase().trim()) {
      return {nameAlreadyExists: true};
    }
    return null;
  }
}
