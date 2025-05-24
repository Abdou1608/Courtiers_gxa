import { Component, inject, OnDestroy } from '@angular/core';
import { NgIf, AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet, RouterModule, NavigationEnd, Router } from '@angular/router';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { Subject, Observable, map, filter, takeUntil } from 'rxjs';
import { slideMobileAnimation } from '../shared/animations/slide-mobile.animation';
import { FooterComponent } from '../shared/footer.component';
import { HeaderComponent } from '../shared/header.component';

@Component({
  selector: 'dashboard',
  animations: [slideMobileAnimation],
  imports: [
    RouterModule,
  ],
  template: '<p>Dashboard Marche</p>',
  styles: ''
})
export class DashboardComponent  {
 
}