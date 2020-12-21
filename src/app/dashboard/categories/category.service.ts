import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Category} from '../../model/category.model';
import {environment} from '../../../environments/environment';
import {Observable, Subject} from 'rxjs';
import {ConfigurationService} from '../configuration/configuration.service';
import {tap} from 'rxjs/operators';
import {PageCustom} from '../../model/page-custom.model';

@Injectable({providedIn: 'root'})
export class CategoryService {
  apiUri: string;
  categories: Category[];
  pageChanged: Subject<PageCustom<Category>> = new Subject<PageCustom<Category>>();
  page: PageCustom<Category> = {};

  constructor(private http: HttpClient,
              private config: ConfigurationService) {
    this.apiUri = environment.apiUri;
  }

  /** Get all categories */
  fetchAll(): Observable<Category[]> {
    return this.http
      .get<Category[]>(this.apiUri + '/admin/categories', {responseType: 'json'})
      .pipe(
        tap(
          categories => this.categories = categories.slice()
        )
      );
  }

  /** Search a category */
  search(page?: number, keyword?: string): void {

  }

  /** Remove a category by id */
  remove(id: number): any {
    return this.http.delete(this.apiUri + '/admin/categories/' + id);
  }

  /** Edit an existing category */
  edit(id: number, category: Category): any {
    return this.http.put<Category>(this.apiUri + '/admin/categories/' + id, category, {responseType: 'json'});
  }

  /** Save a new category */
  add(category: Category): any {
    return this.http.post<Category>(this.apiUri + '/admin/categories', category, {responseType: 'json'});
  }

  /** set the page to the current value */
  setPage(page?: number): void {
    this.page.totalElements = this.categories.length;
    this.page.pageSize = this.config.getNumberOfElements();
    this.page.pageNumber = page ? page : 0;
    this.updateCategories();
  }

  updateCategories(): void {
    this.page.content = this.categories.slice();

    this.pageChanged.next(this.page);
  }

}
