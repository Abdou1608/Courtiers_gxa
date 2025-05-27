
import { Observable } from 'rxjs';
import { classify } from '@angular-devkit/core/src/utils/strings';
import { Cont } from '../../../core/Model/cont.model';
import { DataAccessService } from '../../../core/Services/data-access.service';


export class ContService {
 
 constructor(private da:DataAccessService){

 
}

  //private http = inject(HttpClient);
  private baseUrl = '/api/cont';

  getAll(): Observable<Cont[]> {
    const entity='cont'
    return this.da.getall(entity);
  }

  getById(numCont: number): Observable<Cont> {
    const entity='cont'
    return this.da.getbyID(entity,numCont)  }

  create(item: Cont): Observable<Cont> {
    const entity='cont'
    return this.da.create(entity,item);
  }

  update(item: Cont, numCont:any): Observable<Cont> {
    return this.da.update("cont", numCont,item)
  }

  delete(numCont: any): Observable<unknown> {
    return this.da.getbyID('',numCont);
  }
}
