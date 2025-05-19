
import { Component, HostBinding, Signal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-<%= dasherize(name) %>-list',
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
  styleUrls: ['./<%= dasherize(name) %>-list.component.scss'],
  templateUrl: './<%= dasherize(name) %>-list.component.html',
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
export class <%= classify(name) %>ListComponent {
    @HostBinding('@fadeIn') anim = true;
    private facade = inject(<%= classify(name) %>Facade);
    readonly items = this.facade.all;
  columns = ['name'];
  data = signal(items);
  searchTerm = signal('');

  constructor(private router: Router) {}

  ngOnInit() {
    this.facade.loadAll();
  }

  onRowClick(row: any) {
    window.location.href = `/<%= dasherize(name) %>/${row.id}`;
  }
  onSearch(term: string) {
    this.searchTerm.set(term.toLowerCase());
  }

  filteredData(): { name: string }[] {
    return this.data().filter(item => item.name.toLowerCase().includes(this.searchTerm()));
  }

  goToDetail(row: { name: string }) {
    this.router.navigate(['<%= dasherize(name) %>', row.name]);
  }
}
