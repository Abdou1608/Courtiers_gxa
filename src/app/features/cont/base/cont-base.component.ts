// File: tools/generators/generate-feature/files/__name@dasherize__/base/cont-base.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';



@Component({
  selector: `app-cont-base`,
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `<router-outlet></router-outlet>`
})
export class ContBaseComponent {}