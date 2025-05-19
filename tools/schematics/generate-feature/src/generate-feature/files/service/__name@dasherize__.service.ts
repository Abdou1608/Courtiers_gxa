
import { Observable } from 'rxjs';
import { DataAccessService } from '../../../../../../../src/app/src/Services/data-access.service';
import { classify } from '@angular-devkit/core/src/utils/strings';
//import { DataAccessService } from '../../../../../../../src/app/Services/auth/auth.service';

%= classify(name) %> } from '../../../Model/<%= dasherize(name) %>.model';

export class <%= classify(name) %>Service {
 constructor(private da:DataAccessService){

 
}

  //private http = inject(HttpClient);
  private baseUrl = '/api/<%= dasherize(name) %>';

  getAll(): Observable<<%= classify(name) %>[]> {
    const entity=<%= classify(name) %>
    return this.da.getall(entity);
  }

  getByID(id: number): Observable<<%= classify(name) %>> {
    const entity=<%= classify(name) %>
    return this.da.getByID(entity,id);  }

  create(item: <%= classify(name) %>): Observable<<%= classify(name) %>> {
    const entity=<%= classify(name) %>
    return this.da.create(entity,item);
  }

  update(item: <%= classify(name) %>, id:sany): Observable<<%= classify(name) %>> {
    return this.da.update(item, id)
  }

  delete(id: any): Observable<unknown> {
    return this.da.getById('',id);
  }
}
