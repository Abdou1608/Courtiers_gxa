// File: tools/generators/generate-feature/files/__name@dasherize__/base/<%= dasherize(name) %>-base.component.ts

import { Component, inject, HostBinding, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { <%= classify(name) %>Facade } from './store/<%= dasherize(name) %>.facade';
import { signal } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';



@Component({
  selector: 'app-<%= dasherize(name) %>-base',
  standalone: true,
  imports: [CommonModule, RouterOutlet, <%= classify(name) %>ListComponent],
  template: `<router-outlet></router-outlet>`
})
export class <%= classify(name) %>BaseComponent {}