import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { <%= classify(name) %> } from '../<%= dasherize(name) %>.model';

export class <%= classify(name) %>Service {
  private http = inject(HttpClient);
  private baseUrl = '/api/<%= dasherize(name) %>';

  getAll(): Observable<<%= classify(name) %>[]> {
    return this.http.get<<%= classify(name) %>[]>(this.baseUrl);
  }

  getById(id: number): Observable<<%= classify(name) %>> {
    return this.http.get<<%= classify(name) %>>(`${this.baseUrl}/${id}`);
  }

  create(item: <%= classify(name) %>): Observable<<%= classify(name) %>> {
    return this.http.post<<%= classify(name) %>>(this.baseUrl, item);
  }

  update(item: <%= classify(name) %>): Observable<<%= classify(name) %>> {
    return this.http.put<<%= classify(name) %>>(`${this.baseUrl}/${item.id}`, item);
  }

  delete(id: number): Observable<unknown> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
