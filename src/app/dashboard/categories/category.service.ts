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
  private existingNames: string[] = [];

  constructor(private http: HttpClient,
              private config: ConfigurationService) {
    this.apiUri = environment.apiUri;
  }

  /* ============================================== REST API METHODS =================================================================== */
  /** Gets all categories */
  fetchAll(): Observable<Category[]> {
    return this.http
      .get<Category[]>(this.apiUri + '/admin/categories', {responseType: 'json'})
      .pipe(
        tap(
          categories => {
            this.categories = categories.slice();
          }
        )
      );
  }

  /** Get categories as a string list, use in game's category submodule */
  fetchNames(): Observable<string[]> {
    return this.http
      .get<string[]>(this.apiUri + '/admin/categories/names', {responseType: 'json'});
  }

  /** Removes a category by id */
  remove(id: number): any {
    return this.http.delete<Category>(this.apiUri + '/admin/categories/' + id);
  }

  /** Edits an existing category */
  edit(id: number, category: Category): any {
    return this.http.put<Category>(this.apiUri + '/admin/categories/' + id, category, {responseType: 'json'})
      .subscribe(returnedCategory => {
        const index = this.categories.indexOf(this.getCategoryById(category.id));
        this.categories.splice(index, 1);
        this.categories.push(returnedCategory);
        this.updatePage();
      });
  }

  /** Saves a new category */
  add(category: Category): any {
    return this.http.post<Category>(this.apiUri + '/admin/categories', category, {responseType: 'json'})
      .subscribe(returnedCategory => {
        this.categories.push(returnedCategory);
        this.updatePage();
      });
  }

  /* ================================================ OTHER METHODS ==================================================================== */

  /** sets the page to the debut value */
  initPage(): void {
    this.page.pageSize = this.config.getNumberOfElements();
    this.page.pageNumber = 0;
    this.updatePage();
  }

  /** filters the categories list with the given string then updated the page */
  filter(str: string): void {
    this.filteredCategories = this.categories.filter(
      category => category.name.toLowerCase().includes(str.toLocaleLowerCase())).slice();
    this.page.content = this.filteredCategories.slice();
    this.pageChanged.next(this.page);
  }

  /** Updates the paged object as well as notifier the Subject a change occurred */
  updatePage(): void {
    this.page.content = this.categories.slice();
    this.pageChanged.next(this.page);
  }

  /** finds and return the category with the given id */
  getCategoryById(id: number): Category {
    return this.page.content.find(category => category.id === id);
  }

  /** Uses concatMap to successively remove category, fetch all categories then update the page */
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

  /** reverses the filtering, set filteredCategories to an empty list */
  removeFilter(): void {
    this.updatePage();
    this.filteredCategories = [];
  }

  /** returns a list of existingNames (lower case and trim) */
  getLowerCasedAndTrimmedCategoryNames(): string[] {
    return this.existingNames;
  }

  /** lower case and trim all categories' name, then store them into a private array */
  setLowerCasedAndTrimmedCategoryNames(): void {
    const categories = this.page.content.slice();
    this.existingNames = [];
    categories.forEach(category => this.existingNames.push(category.name.toLowerCase().trim()));
  }
}

