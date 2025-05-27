
import { Observable } from 'rxjs';
import { classify } from '@angular-devkit/core/src/utils/strings';
import { <%= classify(name) %> } from '../../../core/Model/<%= dasherize(name) %>.model';
import { DataAccessService } from '../../../core/Services/data-access.service';


export class <%= classify(name) %>Service {
 constructor(private da:DataAccessService){

 
}

  //private http = inject(HttpClient);
  private baseUrl = '/api/<%= dasherize(name) %>';

  getAll(): Observable<<%= classify(name) %>[]> {
    const entity='<%= dasherize(name) %>'
    return this.da.getall(entity);
  }

  getById>(num<%= classify(name) %>: number): Observable<<%= classify(name) %>> {
    const entity='<%= dasherize(name) %>'
    return this.da.getbyID>(entity,num<%= classify(name) %>);  }

  create(item: <%= classify(name) %>): Observable<<%= classify(name) %>> {
    const entity='<%= dasherize(name) %>'
    return this.da.create(entity,item);
  }

  update(item: <%= classify(name) %>, num<%= classify(name) %>:any): Observable<<%= classify(name) %>> {
    return this.da.update(item, num<%= classify(name) %>)
  }

  delete(num<%= classify(name) %>: any): Observable<unknown> {
    return this.da.getByID>('',num<%= classify(name) %>);
  }
}
