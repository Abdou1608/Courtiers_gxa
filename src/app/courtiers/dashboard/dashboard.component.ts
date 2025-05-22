import { Component, inject, OnDestroy } from '@angular/core';
import { NgIf, AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet, RouterModule, NavigationEnd, Router } from '@angular/router';
import { slideMobileAnimation } from '../../shared/animations/slide-mobile.animation';
import { FooterComponent } from '../../shared/footer.component';
import { HeaderComponent } from '../../shared/header.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { Subject, Observable, map, filter, takeUntil } from 'rxjs';

@Component({
  selector: 'dashboard',
  animations: [slideMobileAnimation],
  imports: [
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    NgIf,
    AsyncPipe,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  private breakpointObserver = inject(BreakpointObserver);
  private router = inject(Router);

  isDesktop$: Observable<boolean> = this.breakpointObserver
    .observe([Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge])
    .pipe(map(result => result?.matches));

  constructor() {
    // Ferme le drawer automatiquement en navigation (mode mobile uniquement)
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      const isDesktop = window.innerWidth >= 768;
      if (!isDesktop) {
        const drawer = document.querySelector('mat-sidenav') as any;
        if (drawer && drawer.close) drawer.close();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  getRouteAnimation(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];
  }
  
}