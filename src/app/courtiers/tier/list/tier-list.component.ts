
import { Component, computed, HostBinding, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { TierFacade } from '../store/tier.Facade';

@Component({
  selector: 'app-tier-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule
  ],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('300ms ease-in', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ],
  styleUrls: ['./tier-list.component.scss'],
  templateUrl: './tier-list.component.html',
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
export class TierListComponent {
displayedColumns() {
throw new Error('Method not implemented.');
}
    @HostBinding('@fadeIn') anim = true;
    private facade = inject(TierFacade);
   // readonly items = this.facade.all;
   private dat =this.facade.all
   readonly items = this.dat ; // Signal<Tier[]>
  columns = ['name'];
  data = signal(this.items());
 // searchTerm = signal('');

  readonly searchTerm = signal('');

  readonly filtered = computed(() => {
    const list = this.items() ;
    const term = this.searchTerm().toLowerCase();
    return term ? list?.filter(t => t.rsociale?.toLowerCase().includes(term)) ?? [] : this.items() ? this.items():[];
  });
  constructor(private router: Router) {}

  ngOnInit() {
    this.facade.loadAll();
  }

  onRowClick(row: any) {
    window.location.href = `/tier/${row.id}`;
  }
  onSearch(term: string) {
    this.searchTerm.set(term.toLowerCase());
  }



  goToDetail(row: { name: string }) {
    this.router.navigate(['tier', row.name]);
  }
}
