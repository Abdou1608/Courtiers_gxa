import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ContFacade } from '../store/cont.Facade';
//import { constructor } from 'assert';
//import { classify } from '../store/__name@dasherize__.state';
import { FieldNamesPipe } from '../../../core/pipes/field-names.pipe';
import { ContTagMap } from '../../../core/Model/cont.model';

@Component({
    selector: 'app-cont-detail',
    standalone: true,
    imports: [
      CommonModule,
      MatCardModule,
      MatInputModule,
      MatButtonModule,
      FieldNamesPipe,
      RouterModule,
    ],
    styleUrls: ['./cont-detail.component.scss'],
    templateUrl: './cont-detail.component.html'
  })
export class ContDetailComponent {
  id:any 
 tagMap=ContTagMap
  constructor(private route: ActivatedRoute) {

   //this.id = this.route.snapshot.paramMap.get('id');
  }

  private facade = inject(ContFacade);
  readonly selected = this.facade.selected;

  ngOnInit() {
   // const id = parseInt(window.location.pathname.split('/').pop() || '0', 10);
  //  if (id) this.facade.getById(id);
  }
}