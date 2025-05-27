
import { Component, HostBinding, Signal, signal,inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { ContFacade } from '../store/cont.Facade';
import { FieldNamesPipe } from '../../../core/pipes/field-names.pipe';
import { ContTagMap, Cont } from '../../../core/Model/cont.model';

@Component({
  selector: 'app-cont-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    FieldNamesPipe
  ],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('300ms ease-in', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ],
  styleUrls: ['./cont-list.component.scss'],
  templateUrl: './cont-list.component.html',
  /*
  template: `
    <mat-card>
      <mat-form-field appearance="fill" class="full-width">
        <mat-label>Search</mat-label>
        <input matInput (input)="onSearch($event.target.value)" placeholder="Search...">
      </mat-form-field>

      <table mat-table [dataSource]="filteredData()" class="mat-elevation-z8" @fadeIn>
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef>Name</th>
          <td mat-cell *matCellDef="let row" (dblclick)="goToDetail(row)">{{ row.name }}</td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="columns"></tr>
        <tr mat-row *matRowDef="let row; columns: columns;"></tr>
      </table>
    </mat-card>
  `,
  styles: [
    `
    .full-width { width: 100%; }
    table { width: 100%; margin-top: 20px; }
    `
  ]
    */
})
export class ContListComponent {
    @HostBinding('@fadeIn') anim = true;
    private facade = inject(ContFacade);
    readonly items = this.facade.all;
    readonly tagMap=ContTagMap
  columns = ['name'];
  data = signal(this.items) ?? [] ;
  searchTerm = signal('');
  displayedColumns=signal('');
  readonly filtered = computed(() => {return this.filteredData()});

  constructor(private router: Router) {

  }

  ngOnInit() {
    this.facade.loadAll();
  }
  
  onRowClick(row:Cont) {
    this.facade.select_current(row)
    this.router.navigate(['detail'])
   // window.location.href = `/cont/${row.id}`;
  }
  onSearch(term: string) {
    this.searchTerm.set(term.toLowerCase());
  }
  filteredData<T extends Record<string, any>>(): Cont[] {
   let items = this.items()
  let search=this.searchTerm()
  if(search && search !== "" && items ){
   const lowerSearch = search.toLowerCase();
  
    return items?.filter(item =>
      Object.values(item).some(value =>
        value !== null &&
        value !== undefined &&
        value.toString().toLowerCase().includes(lowerSearch)
      )
    );
  } else { return items ?? []}
  }

  goToDetail(row: { name: string }) {
    this.router.navigate(['cont', row.name]);
  }
}
