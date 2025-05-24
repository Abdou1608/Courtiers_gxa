import { AfterViewInit, Component, inject, OnDestroy, ViewChild } from '@angular/core';
import {  NavigationEnd, Router, RouterModule, RouterOutlet} from '@angular/router';
import { MatDrawer, MatSidenavContainer, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { slideMobileAnimation } from '../shared/animations/slide-mobile.animation';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subject, Observable, map, filter, takeUntil } from 'rxjs';
import { NgIf, AsyncPipe } from '@angular/common';
import { FooterComponent } from '../shared/footer.component';
import { HeaderComponent } from '../shared/header.component';


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
    MatIconModule,
    NgIf,
    AsyncPipe,
    HeaderComponent,
    FooterComponent
],
templateUrl: "./features-layout.component.html",
styleUrls:['./features-layout.component.scss']
})
export class FeaturesLayoutComponent implements AfterViewInit {
  @ViewChild(MatSidenavContainer) sidenavContainer: MatSidenavContainer | undefined;
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
  ngAfterViewInit(): void {
    this.sidenavContainer?.scrollable.elementScrolled().subscribe()
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  getRouteAnimation(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];
  }
  
}

