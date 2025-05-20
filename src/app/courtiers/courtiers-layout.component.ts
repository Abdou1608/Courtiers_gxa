import { Component, inject, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, RouterModule, RouterOutlet } from '@angular/router';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgIf, AsyncPipe } from '@angular/common';
import { FooterComponent } from '../shared/footer.component';
import { HeaderComponent } from '../shared/header.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, Observable, Subject, takeUntil, filter } from 'rxjs';
import { slideMobileAnimation } from '../shared/animations/slide-mobile.animation';

@Component({
  selector: 'app-courtiers-layout',
  standalone: true,
  animations: [slideMobileAnimation],
  imports: [
    RouterOutlet,
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
  template: `
    <mat-sidenav-container class="layout-container">
      <mat-sidenav
        #drawer
        class="sidebar"
        [mode]="(isDesktop$ | async) ? 'side' : 'over'"
        [opened]="(isDesktop$ | async) ? true : false"
      >
        <mat-toolbar color="primary" class="logo-bar">
          GXA Courtiers
        </mat-toolbar>
        <mat-nav-list>
          <a
            mat-list-item
            routerLink="dashboard"
            routerLinkActive="active-link"
            (click)="drawer.close()"
          >
            <mat-icon>dashboard</mat-icon>
            Tableau de bord
          </a>
          <a
            mat-list-item
            routerLink="tiers"
            routerLinkActive="active-link"
            (click)="drawer.close()"
          >
            <mat-icon>attach_folder</mat-icon>
            Gestion des Tiers
          </a>
            <a
            mat-list-item
            routerLink="projets"
            routerLinkActive="active-link"
            (click)="drawer.close()"
          >
            <mat-icon>attach_folder</mat-icon>
            Gestion des projets
          </a>
              <a
            mat-list-item
            routerLink="contrats"
            routerLinkActive="active-link"
            (click)="drawer.close()"
          >
            <mat-icon>attach_folder</mat-icon>
            Gestion des Contrats
          </a>
          <a
            mat-list-item
            routerLink="produits"
            routerLinkActive="active-link"
            (click)="drawer.close()"
          >
            <mat-icon>inventory</mat-icon>
            Produits
          </a>
          <a
            mat-list-item
            routerLink="commissions"
            routerLinkActive="active-link"
            (click)="drawer.close()"
          >
            <mat-icon>attach_money</mat-icon>
            Commissions
          </a>
          <a
            mat-list-item
            routerLink="profile"
            routerLinkActive="active-link"
            (click)="drawer.close()"
          >
            <mat-icon>person</mat-icon>
            Profil
          </a>
        </mat-nav-list>
      </mat-sidenav>

      <mat-sidenav-content>
        <!-- Toolbar mobile -->
        <mat-toolbar color="primary" class="mobile-toolbar" *ngIf="!(isDesktop$ | async)">
          <button mat-icon-button (click)="drawer.toggle()">
            <mat-icon>menu</mat-icon>
          </button>
          <span>GXA Courtiers</span>
        </mat-toolbar>

        <!-- Header desktop -->
        <div class="desktop-header" *ngIf="isDesktop$ | async">
          <app-header></app-header>
        </div>

        <div class="content">
        <div [@routeAnimations]="getRouteAnimation(routerOutlet)" class="content">
           <router-outlet #routerOutlet="outlet"></router-outlet>
        </div>

        </div>

        <app-footer></app-footer>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .layout-container {
      height: 100vh;
    }

    .sidebar {
      width: 240px;
      background: #003c6c;
      color: white;
    }

    .logo-bar {
      font-weight: bold;
      color: white;
    }

    .content {
      padding: 1rem;
      background: #f5f5f5;
      min-height: calc(100vh - 64px - 40px);
    }

    .mobile-toolbar {
      display: flex;
      align-items: center;
    }

    .active-link {
      background-color: rgba(255, 255, 255, 0.1);
      font-weight: bold;
    }

    .desktop-header {
      display: block;
    }

    @media (max-width: 767px) {
      .desktop-header {
        display: none;
      }
    }
  `]
})
export class CourtiersLayoutComponent implements OnDestroy {
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
