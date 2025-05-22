import { Component, inject, OnDestroy } from '@angular/core';
import {  RouterModule} from '@angular/router';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { slideMobileAnimation } from '../shared/animations/slide-mobile.animation';

@Component({
  selector: 'app-courtiers-layout',
  standalone: true,
  animations: [slideMobileAnimation],
  imports: [
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatIconModule
],
  template: "<div class='layout-container'><router-outlet></router-outlet></div>",
  styles: [`.layout-container {
      height: 100vh;
    display:block;
    justify-content: center;
    align-items: center;
  }`],
})
export class CourtiersLayoutComponent {

}
