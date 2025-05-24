// File: tools/generators/generate-feature/files/__name@dasherize__/base/tier-base.component.ts

import { Component, inject, HostBinding, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';

import { signal } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { TierListComponent } from '../list/tier-list.component';



@Component({
  selector: `app-tier-base`,
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `<router-outlet></router-outlet>`
})
export class TierBaseComponent {}