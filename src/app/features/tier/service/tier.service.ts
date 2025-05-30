
import { Observable } from 'rxjs';
import { classify } from '@angular-devkit/core/src/utils/strings';
import { Tier } from '../../../core/Model/tier.model';
import { DataAccessService } from '../../../core/Services/data-access.service';

//import { DataAccessService } from '../../../../../../../src/app/Services/auth/auth.service';
export class TierService {
 constructor(private da:DataAccessService){

 
}

  //private http = inject(HttpClient);
  private baseUrl = '/api/tier';

  getAll(): Observable<any[]> {
    const entity="Tier"
    return this.da.getall(entity);
  }

  getByID(numtiers: number): Observable<Tier> {
    const entity="Tier"
    return this.da.getbyID(entity,numtiers);  }

  create(item: Tier): Observable<Tier> {
    const entity="Tier"
    return this.da.create(entity,item);
  }

  update(item: Tier, numtiers:any): Observable<Tier> {
    const entity="Tier"
    return this.da.update(entity, numtiers,item,)
  }

  delete(numtiers: any): Observable<unknown> {
    return this.da.getbyID('',numtiers);
  }
  Shearch(reference: any, dppname:string): Observable<Tier[]> {
    const entity="Tier"
    return this.da.Shearch_tier(reference,dppname);  }
}
