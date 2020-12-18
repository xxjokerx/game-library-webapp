import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Category} from '../../model/category.model';
import {environment} from '../../../environments/environment';
import {Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class CategoryService {
  apiUri: string;
  categoriesChanged: Subject<Category[]> = new Subject<Category[]>();
  categories: Category[];

  constructor(private http: HttpClient) {
    this.apiUri = environment.apiUri;
  }

  /** Get all categories */
  fetchAll(): any {
    return this.http
      .get<Category>(this.apiUri + '/admin/categories', {responseType: 'json'});
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
}
