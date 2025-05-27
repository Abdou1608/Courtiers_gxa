import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { TierFacade } from '../store/tier.Facade';
//import { constructor } from 'assert';
//import { classify } from '../store/__name@dasherize__.state';

@Component({
    selector: 'app-tier-detail',
    standalone: true,
    imports: [
      CommonModule,
      MatCardModule,
      MatInputModule,
      MatButtonModule
    ],
    styleUrls: ['./tier-detail.component.scss'],
    templateUrl: './tier-detail.component.html'
  })
export class TierDetailComponent {
  public id!: string;
  numtiers: any;
  
  constructor(private route: ActivatedRoute) {
    this.numtiers! = this.route.snapshot.paramMap.get('numtiers')?? "";
  }

  private facade = inject(TierFacade);
  readonly selected = this.facade.selected;

  ngOnInit() {
    const numtiers = parseInt(window.location.pathname.split('/').pop() || '0', 10);
    if (numtiers) this.facade.getById(numtiers);
  }
}