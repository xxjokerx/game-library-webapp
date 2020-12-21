import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Category} from '../../model/category.model';
import {environment} from '../../../environments/environment';
import {Observable, Subject} from 'rxjs';
import {Page} from '../../model/page.model';
import {ConfigurationService} from '../configuration/configuration.service';

@Injectable({providedIn: 'root'})
export class CategoryService {
  apiUri: string;
  categoriesChanged: Subject<Category[]> = new Subject<Category[]>();
  categories: Category[];
  page: Page<Category>;

  constructor(private http: HttpClient,
              private config: ConfigurationService) {
    this.apiUri = environment.apiUri;
  }

  /** Get all categories */
  private fetchAll(): Observable<Category[]> {
    return this.http
      .get<Category[]>(this.apiUri + '/admin/categories', {responseType: 'json'});
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

  /** Call fetchAll then return a Page<Category> */
  getPage(page?: number): Page<Category> {
    this.fetchAll().subscribe(categories => this.categories = categories.slice());
    this.page.totalElements = this.categories.length;
    this.page.pageable.pageSize = this.config.getNumberOfElements();
    this.page.pageable.pageNumber = page ? page : 0;
    return this.page;
  }
}
