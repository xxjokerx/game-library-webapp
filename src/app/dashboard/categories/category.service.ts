import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Category} from '../../model/category.model';
import {environment} from '../../../environments/environment';
import {Observable, of, Subject} from 'rxjs';
import {ConfigurationService} from '../configuration/configuration.service';
import {concatMap, tap} from 'rxjs/operators';
import {PageCustom} from '../../model/page-custom.model';

@Injectable({providedIn: 'root'})
export class CategoryService {
  apiUri: string;
  categories: Category[];
  private filteredCategories: Category[];
  pageChanged: Subject<PageCustom<Category>> = new Subject<PageCustom<Category>>();
  page: PageCustom<Category> = {};

  constructor(private http: HttpClient,
              private config: ConfigurationService) {
    this.apiUri = environment.apiUri;
  }

  /* ============================================== REST API METHODS =================================================================== */
  /** Get all categories */
  fetchAll(): Observable<Category[]> {
    return this.http
      .get<Category[]>(this.apiUri + '/admin/categories', {responseType: 'json'})
      .pipe(
        tap(
          categories => {
            console.log(categories);
            this.categories = categories.slice();
          }
        )
      );
  }

  /** Remove a category by id */
  remove(id: number): any {
    return this.http.delete<Category>(this.apiUri + '/admin/categories/' + id);
  }

  /** Edit an existing category */
  edit(id: number, category: Category): any {
    return this.http.put<Category>(this.apiUri + '/admin/categories/' + id, category, {responseType: 'json'});
  }

  /** Save a new category */
  add(category: Category): any {
    return this.http.post<Category>(this.apiUri + '/admin/categories', category, {responseType: 'json'});
  }

  /* ================================================ OTHER METHODS ==================================================================== */

  /** set the page to the debut value */
  initPage(): void {
    this.page.pageSize = this.config.getNumberOfElements();
    this.page.pageNumber = 0;
    this.updatePage();
  }

  /** filter the categories list with then given string then updated the page */
  filter(str: string): void {
    this.filteredCategories = this.categories.filter(
      category => category.name.toLowerCase().includes(str.toLocaleLowerCase())).slice();
    this.page.content = this.filteredCategories.slice();
    this.pageChanged.next(this.page);
  }

  /** Update the paged object as well as notifier the Subject a change occurred */
  updatePage(): void {
    this.page.content = this.categories.slice();
    console.log(this.page);
    this.pageChanged.next(this.page);
  }

  /** find and return the category with the given id */
  getCategoryById(id: number): Category {
    return this.page.content.find(category => category.id === id);
  }

  /** Use concatMap to successively remove category, fetch all categories then update the page */
  deleteThenFetchAll(id: number): void {
    const myObs = of(id);
    myObs.pipe(
      concatMap(categoryId => {
        return this.remove(categoryId);
      }),
      concatMap(() => {
        return this.fetchAll();
      })
    ).subscribe(() => {
      this.updatePage();
    });
  }

  /** reverse the filtering, set filteredCategories to an empty list */
  removeFilter(): void {
    this.updatePage();
    this.filteredCategories = [];
  }
}

