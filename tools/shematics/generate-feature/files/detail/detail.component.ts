import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { classify } from '../store/<%= dasherize(name) %>.state';

@Component({
    selector: 'app-<%= dasherize(name) %>-detail',
    standalone: true,
    imports: [
      CommonModule,
      MatCardModule,
      MatInputModule,
      MatButtonModule
    ],
    styleUrls: ['./<%= dasherize(name) %>-detail.component.scss'],
    templateUrl: './<%= dasherize(name) %>-detail.component.html'
  })
export class <%= classify(name) %>DetailComponent {
  id = this.route.snapshot.paramMap.get('id');
  constructor(private route: ActivatedRoute) {}

  private facade = inject(<%= classify(name) %>Facade);
  readonly selected = this.facade.selected;

  ngOnInit() {
    const id = parseInt(window.location.pathname.split('/').pop() || '0', 10);
    if (id) this.facade.getById(id);
  }
}