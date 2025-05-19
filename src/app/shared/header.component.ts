import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterModule],
  template: `
    <mat-toolbar color="primary" class="header">
      <div class="logo">
        <mat-icon>business</mat-icon>
        <span>GXA Courtiers</span>
      </div>

      <span class="spacer"></span>

      <button mat-button routerLink="/auth/login">Connexion</button>
      <button mat-raised-button color="accent" routerLink="/auth/register">Créer un compte</button>
    </mat-toolbar>
  `,
  styles: [`
    .header {
      display: flex;
      justify-content: space-between;
      padding: 0 1rem;
    }
    .logo {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: 600;
    }
    .spacer {
      flex: 1 1 auto;
    }
  `]
})
export class HeaderComponent {}
